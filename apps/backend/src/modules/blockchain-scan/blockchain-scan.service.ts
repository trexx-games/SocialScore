import {
  JSON_RPC_URL,
  MUMBAI_NETWORK_ID,
  SOCIAL_SCORE_ADDRESS,
  WS_PROVIDER,
} from '@apps/config/constant';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ConfigEnvironmentType as ENV } from '@stack/server';
import { ethers } from 'ethers';
import { CqrsCommandFunc } from 'nestjs-typed-cqrs';
import { Readable, Transform } from 'stream';

import { nounsAbi } from './abi/nouns-abi';
import { SocialScoreABI } from './abi/social-score';
import { UniswapABI } from './abi/uniswap-abi';
import { PerformBlockScanCommand } from './cqrs';

@Injectable()
export class BlockchainScanService {
  constructor(
    readonly queryBus: QueryBus,
    readonly commandBus: CommandBus,
    readonly config: ConfigService<ENV>
  ) {}

  /**
   * ------------------------------------------------------
   * Basic Functions
   * ------------------------------------------------------
   */
  /**
   * Update one record
   */
  performBlockchainSourceScan: CqrsCommandFunc<
    PerformBlockScanCommand,
    PerformBlockScanCommand['args']
  > = async ({ input, options }) => {
    const silence = options?.silence ?? false;

    try {
      const { source, walletAddress } = input;
      if (source.name === 'Uniswap') {
        await this.dexSwapScanning({
          walletAddress,
          sourceAddress: source.address,
        });
      }
      if (source.name === 'NounsDAO') {
        await Promise.all([
          this.nounsDaoVoteScanning({
            walletAddress,
            sourceAddress: source.address,
          }),
          this.nounsDaoProposalScanning({
            walletAddress,
            sourceAddress: source.address,
          }),
        ]);
      }
    } catch (e) {
      if (!silence) throw new BadRequestException(e);
      return { success: false, message: e.message };
    }
  };

  /**
   * ------------------------------------------------------
   * Helper Functions
   * ------------------------------------------------------
   */
  /**
   * =================
   * UNISWAP
   * =================
   */
  dexSwapScanning = async (input: {
    walletAddress: string;
    sourceAddress: string;
    totalQueryBlock?: number;
  }) => {
    const wsProvider = new ethers.providers.WebSocketProvider(WS_PROVIDER);
    const uniswapContract = new ethers.Contract(
      input.sourceAddress,
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

    const BLOCKS_PER_QUERY = input.totalQueryBlock ?? 5000;
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
        if (event.args.sender === input.walletAddress) {
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
      input.walletAddress,
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

  /**
   * =================
   * NOUNS DAO
   * =================
   */
  nounsDaoVoteScanning = async (input: {
    walletAddress: string;
    sourceAddress: string;
    totalQueryBlock?: number;
  }) => {
    const wsProvider = new ethers.providers.WebSocketProvider(WS_PROVIDER);
    const nounsDaoContract = new ethers.Contract(
      input.sourceAddress,
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

    const BLOCKS_PER_QUERY = input.totalQueryBlock ?? 5000;
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
        if (event.args.voter === input.walletAddress) {
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
      input.walletAddress,
      0,
      0,
      totalEventsFound
    );
    return {
      transactionsData,
      totalEventsFound,
    };
  };

  /**
   * =================
   * NOUNS DAO PROPOSAL
   * =================
   */
  nounsDaoProposalScanning = async (input: {
    walletAddress: string;
    sourceAddress: string;
    totalQueryBlock?: number;
  }) => {
    const wsProvider = new ethers.providers.WebSocketProvider(WS_PROVIDER);
    const nounsDaoContract = new ethers.Contract(
      input.sourceAddress,
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

    const BLOCKS_PER_QUERY = input.totalQueryBlock ?? 5000;
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
        if (event.args.proposer === input.walletAddress) {
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
      input.walletAddress,
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
