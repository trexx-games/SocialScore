import { toDataURL } from 'qrcode';
import { authenticator } from 'otplib';
import { ConfigService } from '@nestjs/config';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CqrsCommandFunc, CqrsQueryFunc } from 'nestjs-typed-cqrs';
import { TWO_FACTOR_APP_NAME } from '@apps/config/constant';
import { ConfigEnvironmentType as ENV } from '@stack/server';
import { fetchQuery, init } from '@airstack/node';

@Injectable()
export class AirstackService {
  constructor(
    readonly queryBus: QueryBus,
    readonly commandBus: CommandBus,
    readonly config: ConfigService<ENV>
  ) {}

  /**
   * Verify is 2FA code matched
   */
  walletTokenTransfers = async (address: string, blockchain = 'ethereum') => {
    const query = `
  query WalletTokenTransfers($address: Identity!, $blockchain: TokenBlockchain!) {
    Wallet(input: {identity: $address, blockchain: $blockchain}) {
      tokenBalances {
        amount
        blockchain
        tokenAddress
        tokenType
        formattedAmount
        lastUpdatedTimestamp
        token {
          address
          name
          symbol
        }
      }
      tokenTransfers {
        amount
        blockchain
        tokenAddress
        tokenId
        transactionHash
        tokenNft {
          address
          token {
            address
            name
            symbol
            type
          }
        }
        formattedAmount
      }
    }
  }
  `;

    const variables = {
      address: address,
      blockchain: blockchain,
    };
    await init('cb274597090b4041bf03d14c33410b74');
    const { data, error } = await fetchQuery(query, variables);
    console.log(data, error);

    return data;
  };
}
