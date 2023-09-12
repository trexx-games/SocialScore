import {
  JSON_RPC_URL,
  MUMBAI_NETWORK_ID,
  NOUNS_ADDRESS,
  SOCIAL_SCORE_ADDRESS,
  UNISWAP_ADDRESS,
  WS_PROVIDER,
} from '@apps/config/constant';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ConfigEnvironmentType as ENV } from '@stack/server';
import { ethers } from 'ethers';
import { CqrsCommandFunc, CqrsQueryFunc } from 'nestjs-typed-cqrs';
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';
import { Readable, Transform } from 'stream';

import { nounsAbi } from './abi/nouns-abi';
import { SocialScoreABI } from './abi/social-score';
import { UniswapABI } from './abi/uniswap-abi';

@Injectable()
export class BlockchainScanService {
  constructor(
    readonly queryBus: QueryBus,
    readonly commandBus: CommandBus,
    readonly config: ConfigService<ENV>
  ) {}

  /**
   * Verify is 2FA code matched
   */

  dexSwapScanning = async (walletAddress: string) => {
    const wsProvider = new ethers.providers.WebSocketProvider(WS_PROVIDER);
    const uniswapContract = new ethers.Contract(
      UNISWAP_ADDRESS,
      UniswapABI,
      wsProvider
    );
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
    const transactionsData = [];

    const BLOCKS_PER_QUERY = 5000;
    let startBlock = 13139295;
    let endBlock = startBlock + BLOCKS_PER_QUERY;
    let totalEventsFound = 0;

    const eventStream = new Readable({
      objectMode: true,
      read() {
        // some callback
      },
    });

    const transformStream = new Transform({
      objectMode: true,
      transform(event, _, callback) {
        if (event.args.sender === walletAddress) {
          totalEventsFound += 1;
          const txData = {
            txHash: event.transactionHash,
            amount0In: Number(event.args.amount0In._hex),
            amount0Out: Number(event.args.amount0Out),
            amount1In: Number(event.args.amount1In),
            amount1Out: Number(event.args.amount1Out),
          };
          console.log(txData);
          transactionsData.push(txData);
        }
        callback();
      },
    });

    eventStream.pipe(transformStream);

    while (startBlock < 13200000) {
      const pastEvents = await uniswapContract.queryFilter(
        'Swap',
        startBlock,
        endBlock
      );
      console.log(
        `Total events retrieved from block ${startBlock} to ${endBlock}: ${pastEvents.length}`
      );
      for (const event of pastEvents) {
        eventStream.push(event);
      }

      startBlock = endBlock + 1;
      endBlock = startBlock + BLOCKS_PER_QUERY;
    }
    eventStream.push(null);
    await socialScoreContract.updateDefiActions(
      walletAddress,
      0,
      0,
      totalEventsFound,
      0
    );
    return {
      transactionsData,
      totalEventsFound,
    };
  };

  nounsDaoVoteScanning = async (walletAddress: string) => {
    const wsProvider = new ethers.providers.WebSocketProvider(WS_PROVIDER);
    const nounsDaoContract = new ethers.Contract(
      NOUNS_ADDRESS,
      nounsAbi,
      wsProvider
    );
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
    const transactionsData = [];

    const BLOCKS_PER_QUERY = 5000;
    let startBlock = 13139295;
    let endBlock = startBlock + BLOCKS_PER_QUERY;
    let totalEventsFound = 0;

    const eventStream = new Readable({
      objectMode: true,
      read() {
        // some callback
      },
    });

    const transformStream = new Transform({
      objectMode: true,
      transform(event, _, callback) {
        if (event.args.voter === walletAddress) {
          totalEventsFound += 1;
          const txData = {
            txHash: event.transactionHash,
            proposalId: Number(event.args.proposalId),
          };
          transactionsData.push(txData);
        }
        callback();
      },
    });

    eventStream.pipe(transformStream);

    while (startBlock < 13200000) {
      const pastEvents = await nounsDaoContract.queryFilter(
        'VoteCast',
        startBlock,
        endBlock
      );
      console.log(
        `Total events retrieved from block ${startBlock} to ${endBlock}: ${pastEvents.length}`
      );
      for (const event of pastEvents) {
        eventStream.push(event);
      }

      startBlock = endBlock + 1;
      endBlock = startBlock + BLOCKS_PER_QUERY;
    }
    eventStream.push(null);
    await socialScoreContract.updateDaoActions(
      walletAddress,
      0,
      0,
      totalEventsFound
    );
    return {
      transactionsData,
      totalEventsFound,
    };
  };

  nounsDaoProposalScanning = async (walletAddress: string) => {
    const wsProvider = new ethers.providers.WebSocketProvider(WS_PROVIDER);
    const nounsDaoContract = new ethers.Contract(
      NOUNS_ADDRESS,
      nounsAbi,
      wsProvider
    );
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
    const transactionsData = [];

    const BLOCKS_PER_QUERY = 5000;
    let startBlock = 13139295;
    let endBlock = startBlock + BLOCKS_PER_QUERY;
    let totalEventsFound = 0;

    const eventStream = new Readable({
      objectMode: true,
      read() {
        // some callback
      },
    });

    const transformStream = new Transform({
      objectMode: true,
      transform(event, _, callback) {
        if (event.args.proposer === walletAddress) {
          totalEventsFound += 1;
          const txData = {
            txHash: event.transactionHash,
          };
          transactionsData.push(txData);
        }
        callback();
      },
    });

    eventStream.pipe(transformStream);

    while (startBlock < 13200000) {
      const pastEvents = await nounsDaoContract.queryFilter(
        'ProposalCreated',
        startBlock,
        endBlock
      );
      console.log(
        `Total events retrieved from block ${startBlock} to ${endBlock}: ${pastEvents.length}`
      );
      for (const event of pastEvents) {
        eventStream.push(event);
      }

      startBlock = endBlock + 1;
      endBlock = startBlock + BLOCKS_PER_QUERY;
    }
    eventStream.push(null);
    await socialScoreContract.updateDaoActions(
      walletAddress,
      0,
      totalEventsFound,
      0
    );
    return {
      transactionsData,
      totalEventsFound,
    };
  };
}
