import { getNearConfig } from '@/config';
import { Transaction as WalletTransaction } from '@near-wallet-selector/core';
import * as nearApi from 'near-api-js';
import { Account } from 'near-api-js';

// Next no-SSR hack
let _near: nearApi.Near | undefined;
export function getNear() {
  if (!_near) {
    _near = new nearApi.Near(getNearConfig());
  }
  return _near;
}

let _nobody: Account | undefined;
export function getNearNobody() {
  if (!_nobody) {
    _nobody = new Account(getNear().connection, 'nobody');
  }
  return _nobody;
}

export type ImplicitSignerTransaction = Omit<WalletTransaction, 'signerId'>;
