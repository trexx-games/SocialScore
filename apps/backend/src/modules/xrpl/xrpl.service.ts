import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ConfigEnvironmentType as ENV } from '@stack/server';
import { Client } from 'xrpl';


@Injectable()
export class XrplService {
  constructor(
    readonly queryBus: QueryBus,
    readonly commandBus: CommandBus,
    readonly config: ConfigService<ENV>
  ) {}

  /**
   * Verify is 2FA code matched
   */
  paymentsScan = async (address: string) => {
    const client = new Client("wss://xrplcluster.com/");

    try {
      await client.connect();

      const response = await client.request({
        command: 'account_tx',
        account: address,
        ledger_index_min: -1,
        ledger_index_max: -1,
      });


      const payments = response.result.transactions?.filter(tx => tx.tx.TransactionType === 'Payment') || [];
      const totalPayments = payments.length;
      let totalAmount = 0;

      payments.forEach(payment => {
        // @ts-ignore
        const amount = Number(payment.tx.Amount);
        if(!Number.isNaN(amount)) {
          totalAmount += amount;
        }
      });

      return {
        totalPayments,
        totalAmount,
      };
    } catch (error) {
      console.error('Error scanning payments:', error);
      throw error;
    } finally {
      client.disconnect();
    }
  }
}
