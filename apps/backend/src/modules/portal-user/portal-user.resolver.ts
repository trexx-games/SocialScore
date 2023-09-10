import {
  Args,
  Int,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CurrentUser, IpAddress } from 'nestjs-dev-utilities';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { AccessTokenPortalUser } from '@apps/modules/portal-auth/portal-auth.interface';
import { PortalAuthJwtGuard } from '@apps/modules/portal-auth/guards/portal-auth-jwt.guard';
import { PortalUserService } from './portal-user.service';
import { PortalUserEntity } from './portal-user.entity';
import { PortalUserDto } from './dto/portal-user.dto';
import {
  CreatePortalUserInput,
  UpdatePortalUserInput,
} from './dto/portal-user.input';
import { UsePortalAuthRoles } from '../portal-auth/portal-auth.decorator';

@Resolver(() => PortalUserDto)
export class PortalUserResolver {
  constructor(
    readonly service: PortalUserService,
    readonly queryBus: QueryBus,
    readonly commandBus: CommandBus
  ) {}

  @UsePortalAuthRoles(['DIRECTOR', 'MANAGER'])
  @Mutation(() => PortalUserDto, {
    description: 'This API used to create portal user',
  })
  async createPortalUser(
    @CurrentUser() currentUser: AccessTokenPortalUser,
    @IpAddress() ipAddress: string,
    @Args({ name: 'input', type: () => CreatePortalUserInput })
    input: CreatePortalUserInput
  ) {
    // const user = currentUser.user;
    const { data } = await this.service.createOne({
      input,
    });
    // this.commandBus.execute(
    //   new CreateOnePortalUserActivityCommand({
    //     input: {
    //       action: 'CREATE',
    //       title: `Create portal user`,
    //       description: `Create portal user ${data.username}`,
    //       table: 'PortalUser',
    //       recordId: data.reference,
    //       meta: pick(data, ['type', 'username', 'reference', 'status']),
    //       userId: user.id,
    //       ipAddress,
    //     },
    //   })
    // );
    return data;
  }

  @UsePortalAuthRoles(['DIRECTOR', 'MANAGER'])
  @Mutation(() => PortalUserDto, {
    description: 'This API used to update portal user',
  })
  async updatePortalUser(
    @CurrentUser() currentUser: AccessTokenPortalUser,
    // @IpAddress() ipAddress: string,
    @Args({ name: 'id', type: () => Int })
    id: number,
    @Args({ name: 'update', type: () => UpdatePortalUserInput })
    update: UpdatePortalUserInput
  ) {
    const user = currentUser.user;
    if (user.id === id) {
      throw new BadRequestException('Cannot update yourself with this API!');
    }
    const {
      data: { updated, before },
    } = await this.service.updateOne({
      query: { filter: { id: { eq: id } } },
      input: update,
    });

    // const hasUpdatePassword = update.password;
    // const hasUsernameChange = updated.username !== before.username;
    // this.commandBus.execute(
    //   new CreateOnePortalUserActivityCommand({
    //     input: {
    //       action: 'UPDATE',
    //       title: `Update portal user`,
    //       description: `Update portal user ${
    //         hasUsernameChange
    //           ? `from ${before.username} to ${updated.username}`
    //           : updated.username
    //       } ${!hasUpdatePassword ? '' : '& password'}`,
    //       table: 'PortalUser',
    //       recordId: updated.reference,
    //       meta: pick(updated, ['type', 'username', 'reference', 'status']),
    //       userId: user.id,
    //       ipAddress,
    //     },
    //   })
    // );
    return updated;
  }

  @UseGuards(PortalAuthJwtGuard)
  @Mutation(() => PortalUserDto, {
    description: 'This API used to delete portal user',
  })
  async deletePortalUser(
    @CurrentUser() currentUser: AccessTokenPortalUser,
    // @IpAddress() ipAddress: string,
    @Args({ name: 'id', type: () => Int })
    id: number
  ) {
    const user = currentUser.user;
    if (user.id === id) {
      throw new BadRequestException('Cannot remove yourself!');
    }
    const { data } = await this.service.deleteOne({
      input: id,
    });
    // this.commandBus.execute(
    //   new CreateOnePortalUserActivityCommand({
    //     input: {
    //       action: 'DELETE',
    //       title: `Deleted portal user`,
    //       description: `Deleted portal user ${data.username}`,
    //       table: 'PortalUser',
    //       recordId: data.reference,
    //       meta: pick(data, ['type', 'username', 'reference', 'status']),
    //       userId: user.id,
    //       ipAddress,
    //     },
    //   })
    // );
    return data;
  }

  @ResolveField(() => Boolean)
  async twoFactorEnabled(@Parent() entity: PortalUserEntity): Promise<boolean> {
    return !!entity.twoFactorSecret;
  }
}
