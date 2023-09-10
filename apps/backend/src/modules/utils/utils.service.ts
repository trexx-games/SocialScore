import dayjs from 'dayjs';
import { customAlphabet } from 'nanoid';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ReferenceAlphabet,
  ReferralAlphabet,
} from '@apps/config/setting.config';
import { FindOneUserQuery } from '../user/cqrs/user.cqrs.input';
import { FindOnePortalUserQuery } from '../portal-user/cqrs/portal-user.cqrs.input';

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
    const generate = customAlphabet(ReferralAlphabet, max);
    const random = generate();
    return random;
  };

  /**
   *  ---------------------------
   * generate unique referral code
   *  ---------------------------
   */
  generateReferralCode = async (): Promise<string> => {
    const generate = customAlphabet(ReferralAlphabet, 10);
    const referral = generate();
    // check whether referral has been taken
    const { data } = await this.queryBus.execute(
      new FindOneUserQuery({
        query: { filter: { referralCode: { eq: referral } } },
        options: { nullable: true, silence: true },
      })
    );
    if (!data) return referral;
    return this.generateReferralCode();
  };

  /**
   *  ---------------------------
   * generate unique reference code for portal user
   *  ---------------------------
   */
  generateReferenceCode = async (): Promise<string> => {
    const generate = customAlphabet(ReferenceAlphabet, 10);
    const reference = generate();
    // check whether referral has been taken
    const { data } = await this.queryBus.execute(
      new FindOnePortalUserQuery({
        query: { filter: { reference: { eq: reference } } },
        options: { nullable: true, silence: true },
      })
    );
    if (!data) return reference;
    return this.generateReferenceCode();
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
