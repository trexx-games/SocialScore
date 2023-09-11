import { BlockchainSourceStatus } from '@apps/modules/blockchain-source/blockchain-source.interface';
import { BlockchainSourceDto } from '@apps/modules/blockchain-source/dto/blockchain-source.dto';
import { OmitType } from '@nestjs/graphql';

class BlockchainSourceDataDto extends OmitType(BlockchainSourceDto, [
  'id',
  'createdAt',
  'updatedAt',
] as const) {}

export const BlockchainSourceDataSeedData: BlockchainSourceDataDto[] = [
  {
    name: 'Uniswap',
    address: '0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852',
    status: BlockchainSourceStatus.ACTIVATED,
  },
  {
    name: 'NounsDAO',
    address: '0x6f3E6272A167e8AcCb32072d08E0957F9c79223d',
    status: BlockchainSourceStatus.ACTIVATED,
  },
  {
    name: 'Aave Defi Protocol',
    address: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
    status: BlockchainSourceStatus.ACTIVATED,
  },
];
