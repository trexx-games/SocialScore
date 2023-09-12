import { UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'nestjs-dev-utilities';

import { AirstackService } from '../airstack/airstack.service';
import { AccessTokenInfo } from '../auth/auth.interface';
import { AuthJwtGuard } from '../auth/guards/auth-jwt.guard';
import { BlockchainVerifySignerMessageQuery } from '../blockchain/cqrs';

import { WalletDto, WalletProfileDto } from './dto/wallet.dto';
import { WalletLinkInput, WalletRetrieveInput } from './dto/wallet.input';
import { FindManyWalletQuery, FindOneWalletQuery } from './cqrs';
import { WalletService } from './wallet.service';

@Resolver(WalletDto)
export class WalletResolver {
  constructor(
    readonly service: WalletService,
    readonly airstack: AirstackService,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  /**
   * List linked wallet from master wallet
   */
  @UseGuards(AuthJwtGuard)
  @Query(() => [WalletDto], {
    description: 'This API used to list linked wallets from smart wallet',
  })
  async listLinkedWallet(@CurrentUser() currentUser: AccessTokenInfo) {
    const user = currentUser.user;

    const { data } = await this.queryBus.execute(
      new FindManyWalletQuery({
        query: {
          filter: { parentId: { eq: user.id } },
        },
        options: { nullable: true },
      })
    );
    return data;
  }

  /**
   * Link wallet to user
   */
  @UseGuards(AuthJwtGuard)
  @Mutation(() => WalletDto, {
    description: 'This API used to link input wallet to smart wallet',
  })
  async linkWallet(
    @CurrentUser() currentUser: AccessTokenInfo,
    @Args('input', { type: () => WalletLinkInput }) input: WalletLinkInput
  ) {
    const user = currentUser.user;

    // verify the signer message
    const { data: signer } = await this.queryBus.execute(
      new BlockchainVerifySignerMessageQuery({
        query: { signature: input.signature, message: input.message },
      })
    );

    if (signer !== input.address) {
      throw new Error("Signer couldn't verified!");
    }

    // if everything good, then link the wallet to smart wallet
    const data = await this.service.addNewWallet({
      address: signer,
      parentId: user.id,
    });

    return data;
  }

  /**
   * retrieve wallet
   */
  @Query(() => WalletProfileDto, {
    description: 'This API used to retrieve wallet',
  })
  async retrieveWallet(
    @Args('input', { type: () => WalletRetrieveInput })
    input: WalletRetrieveInput
  ): Promise<WalletProfileDto> {
    const { data: found } = await this.queryBus.execute(
      new FindOneWalletQuery({
        query: { filter: { address: { eq: input.address } } },
        options: { nullable: true },
      })
    );

    const tokenBalances = await this.airstack.tokenBalancesScan(input.address);
    const tokenTransfers = await this.airstack.tokenTransfersScan(
      input.address
    );

    if (found) {
      // trigger sync wallet again
      this.service.performScanWallet(input.address, 'sync');
      return { address: found.address, tokenBalances, tokenTransfers };
    }

    // if address not found, then we create a wallet without link to smart wallet
    const data = await this.service.addNewWallet({ address: input.address });

    return { address: data.address, tokenBalances, tokenTransfers };
  }
}
