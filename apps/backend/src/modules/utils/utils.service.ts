import dayjs from 'dayjs';
import { customAlphabet } from 'nanoid';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SupportedAlphabet, UsernameAlphabet } from '@apps/config/constant';
import { FindOneUserQuery } from '../user/cqrs/user.cqrs.input';

@Injectable()
export class UtilsService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  /**
   *  ---------------------------
   * generate random string
   *  ---------------------------
   */
  generateRandomStr = async (max = 8): Promise<string> => {
    const generate = customAlphabet(SupportedAlphabet, max);
    const random = generate();
    return random;
  };

  /**
   *  ---------------------------
   * generate unique referral code
   *  ---------------------------
   */
  generateUsername = async (input?: string): Promise<string> => {
    const generate = customAlphabet(UsernameAlphabet, 10);
    const referral = generate();
    // check whether referral has been taken
    const { data } = await this.queryBus.execute(
      new FindOneUserQuery({
        query: { filter: { username: { eq: input ?? referral } } },
        options: { nullable: true, silence: true },
      })
    );
    if (!!input && !!data) {
      throw new Error('Input username already exists!');
    }
    if (!data) return referral;
    return this.generateUsername();
  };

  /**
   * generate days in array
   */
  generatePastNDays = (days: number, reverse = false) => {
    const dates = []; // Initialize an empty array to store the dates

    if (reverse) {
      for (let i = days - 1; i >= 0; i--) {
        const date = dayjs().subtract(i, 'day').startOf('day').toDate();
        dates.push(date);
      }
    } else {
      for (let i = 0; i < days; i++) {
        const date = dayjs().subtract(i, 'day').startOf('day').toDate();
        dates.push(date);
      }
    }
    return dates;
  };
}
