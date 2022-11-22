import { TONIC_CONTRACT_ID } from '@/config';
import { Account } from 'near-api-js';
import {
  getFtBalanceOf,
} from './transactions';

export function isNear(tokenId: string) {
  return tokenId.toUpperCase() === 'NEAR';
}

export class TonicV2 {
  constructor(
    readonly account: Account,
    readonly contractId: string = TONIC_CONTRACT_ID
  ) {}

  async ftBalanceOf() {
    return await this.account.viewFunctionV2(
      getFtBalanceOf(
        this.contractId,
        this.account.accountId
      ).toAccountFunctionCallParams()
    );
  }
}
