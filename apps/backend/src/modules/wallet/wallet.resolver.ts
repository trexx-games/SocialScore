import { UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'nestjs-dev-utilities';

import { AccessTokenInfo } from '../auth/auth.interface';
import { AuthJwtGuard } from '../auth/guards/auth-jwt.guard';
import { BlockchainVerifySignerMessageQuery } from '../blockchain/cqrs';

import { WalletDto } from './dto/wallet.dto';
import { WalletLinkInput } from './dto/wallet.input';
import { FindManyWalletQuery } from './cqrs';
import { WalletService } from './wallet.service';

@Resolver(WalletDto)
export class WalletResolver {
  constructor(
    readonly service: WalletService,
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
    const data = await this.service.createOne({
      input: {
        address: input.address,
        parentId: user.id,
      },
    });
    return data;
  }
}
