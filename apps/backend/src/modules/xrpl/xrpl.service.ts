import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ConfigEnvironmentType as ENV } from '@stack/server';
import { Client } from 'xrpl';


@Injectable()
export class XrplService {
  client: Client;
  constructor(
    readonly queryBus: QueryBus,
    readonly commandBus: CommandBus,
    readonly config: ConfigService<ENV>
  ) {
    this.client = new Client("wss://xrplcluster.com/")
  }

  /**
   * Verify is 2FA code matched
   */
  paymentsScan = async (address: string) => {
    try {
      await this.client.connect();

      const response = await this.client.request({
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
      this.client.disconnect();
    }
  }

  ammDepositScan = async (address: string) => {
    try {
      await this.client.connect();

      const response = await this.client.request({
        command: 'account_tx',
        account: address,
        ledger_index_min: -1,
        ledger_index_max: -1,
      });


      const ammDeposits = response.result.transactions?.filter(tx => tx.tx.TransactionType === 'AMMDeposit') || [];
      const totalAmmDeposits = ammDeposits.length;
      let totalAmount = 0;

      ammDeposits.forEach(deposit => {
        // @ts-ignore
        const amount = Number(deposit.tx.Amount.value);
        if(!Number.isNaN(amount)) {
          totalAmount += amount;
        }
      });

      return {
        totalAmmDeposits,
        totalAmount,
      };
    } catch (error) {
      console.error('Error scanning amm deposits:', error);
      throw error;
    } finally {
      this.client.disconnect();
    }
  }

  ammWithdrawScan = async (address: string) => {

    try {
      await this.client.connect();

      const response = await this.client.request({
        command: 'account_tx',
        account: address,
        ledger_index_min: -1,
        ledger_index_max: -1,
      });


      const ammWithdraws = response.result.transactions?.filter(tx => tx.tx.TransactionType === 'AMMWithdraw') || [];
      const totalAmmWithdraws = ammWithdraws.length;
      let totalAmount = 0;

      ammWithdraws.forEach(deposit => {
        // @ts-ignore
        const amount = Number(deposit.tx.Amount.value);
        if(!Number.isNaN(amount)) {
          totalAmount += amount;
        }
      });

      return {
        totalAmmWithdraws,
        totalAmount,
      };
    } catch (error) {
      console.error('Error scanning amm withdraws:', error);
      throw error;
    } finally {
      this.client.disconnect();
    }
  }

  nfTokenMintScan = async (address: string) => {

    try {
      await this.client.connect();

      const response = await this.client.request({
        command: 'account_tx',
        account: address,
        ledger_index_min: -1,
        ledger_index_max: -1,
      });


      const nfTokenMints = response.result.transactions?.filter(tx => tx.tx.TransactionType === 'NFTokenMint') || [];
      const totalnfTokenMint = nfTokenMints.length;

      return {
        totalnfTokenMint
      };
    } catch (error) {
      console.error('Error scanning nft token mints:', error);
      throw error;
    } finally {
      this.client.disconnect();
    }
  }
}
