import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { WalletDto } from './dto/wallet.dto';
import { WalletService } from './wallet.service';
import { UseGuards } from '@nestjs/common';
import { AuthJwtGuard } from '../auth/guards/auth-jwt.guard';
import { CurrentUser } from 'nestjs-dev-utilities';
import { AccessTokenInfo } from '../auth/auth.interface';
import { WalletLinkInput } from './dto/wallet.input';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { BlockchainVerifySignerMessageQuery } from '../blockchain/cqrs';

@Resolver(WalletDto)
export class WalletResolver {
  constructor(
    readonly service: WalletService,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

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
