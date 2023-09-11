import { toNumber } from 'lodash';
import { BigNumber } from 'ethers';
import { formatUnits, parseUnits } from 'ethers/lib/utils.js';

export const toNumberValue = (input: BigNumber) => {
  return toNumber(formatUnits(input.toString(), 18));
};

export const toBigNumber = (input: number | string) => {
  if (typeof input === 'string') {
    return parseUnits(input, 18);
  }
  return parseUnits(input.toString(), 18);
};
