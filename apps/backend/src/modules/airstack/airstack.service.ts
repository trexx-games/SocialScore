import { toDataURL } from 'qrcode';
import { authenticator } from 'otplib';
import { ConfigService } from '@nestjs/config';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CqrsCommandFunc, CqrsQueryFunc } from 'nestjs-typed-cqrs';
import {
  JSON_RPC_URL,
  MUMBAI_NETWORK_ID,
  SOCIAL_SCORE_ADDRESS,
  TWO_FACTOR_APP_NAME,
} from '@apps/config/constant';
import { ConfigEnvironmentType as ENV } from '@stack/server';
import { fetchQuery, init } from '@airstack/node';
import { ethers } from 'ethers';
import { SocialScoreABI } from '../blockchain-scan/abi/social-score';

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
  tokenTransfersScan = async (address: string, blockchain = 'ethereum') => {
    const query = `
  query WalletTokenTransfers($address: Identity!, $blockchain: TokenBlockchain!) {
    Wallet(input: {identity: $address, blockchain: $blockchain}) {
      tokenTransfers {
        amount
        tokenAddress
        formattedAmount
        tokenType
      }
    }
  }
  `;

    const variables = {
      address: address,
      blockchain: blockchain,
    };
    const airStackPrivateKey = this.config.get('airStackPrivateKey');
    await init(airStackPrivateKey);
    const { data, error } = await fetchQuery(query, variables);

    const tokenTransfers = data.Wallet.tokenTransfers;

    const totalTransfers = tokenTransfers.length;
    const erc1155Count =
      tokenTransfers.filter((transfer) => transfer.tokenType === 'ERC1155')
        .length || 0;
    const erc721Count =
      tokenTransfers.filter((transfer) => transfer.tokenType === 'ERC721')
        .length || 0;
    const erc20Count =
      tokenTransfers.filter((transfer) => transfer.tokenType === 'ERC20')
        .length || 0;

    const transfers = [
      { type: 'ERC1155', transfersCount: erc1155Count },
      { type: 'ERC721', transfersCount: erc721Count },
      { type: 'ERC20', transfersCount: erc20Count },
    ];

    const jsonRpcProvider = new ethers.providers.JsonRpcProvider(
      JSON_RPC_URL,
      MUMBAI_NETWORK_ID
    );
    const adminkey = this.config.get('adminPrivateKey');
    const wallet = new ethers.Wallet(adminkey);
    const signer = wallet.connect(jsonRpcProvider);
    const socialScoreContract = new ethers.Contract(
      SOCIAL_SCORE_ADDRESS,
      SocialScoreABI,
      signer
    );
    await socialScoreContract.updateTokenActions(
      address,
      tokenTransfers,
      0,
      0,
      0
    );

    return {
      totalTransfers,
      transfers,
    };
  };

  tokenBalancesScan = async (address: string, blockchain = 'ethereum') => {
    const query = `
    query WalletTokenBalances($address: Identity!, $blockchain: TokenBlockchain!) {
      Wallet(input: {identity: $address, blockchain: $blockchain}) {
        tokenBalances {
          amount
          tokenAddress
          tokenType
        }
      }
    }
  `;

    const variables = {
      address: address,
      blockchain: blockchain,
    };
    const airStackPrivateKey = this.config.get('airStackPrivateKey');
    await init(airStackPrivateKey);
    const { data, error } = await fetchQuery(query, variables);

    const tokenBalances = data.Wallet.tokenBalances;

    const totalBalances = tokenBalances.length;
    const erc1155Count =
      tokenBalances.filter((balance) => balance.tokenType === 'ERC1155')
        ?.length || 0;
    const erc721Count =
      tokenBalances.filter((balance) => balance.tokenType === 'ERC721')
        ?.length || 0;
    const erc20Count =
      tokenBalances.filter((balance) => balance.tokenType === 'ERC20')
        ?.length || 0;

    const balances = [
      { type: 'ERC1155', transfersCount: erc1155Count },
      { type: 'ERC721', transfersCount: erc721Count },
      { type: 'ERC20', transfersCount: erc20Count },
    ];

    const jsonRpcProvider = new ethers.providers.JsonRpcProvider(
      JSON_RPC_URL,
      MUMBAI_NETWORK_ID
    );
    const adminkey = this.config.get('adminPrivateKey');
    const wallet = new ethers.Wallet(adminkey);
    const signer = wallet.connect(jsonRpcProvider);
    const socialScoreContract = new ethers.Contract(
      SOCIAL_SCORE_ADDRESS,
      SocialScoreABI,
      signer
    );
    await socialScoreContract.updateTokenActions(
      address,
      0,
      0,
      0,
      tokenBalances
    );

    return {
      totalBalances,
      balances,
    };
  };
}
