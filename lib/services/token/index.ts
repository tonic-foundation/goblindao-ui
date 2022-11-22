import BN from 'bn.js';
import { ftBalanceOf } from '@tonic-foundation/token';
import { Account } from 'near-api-js';

export async function getTokenOrNearBalance(account: Account, tokenId: string) {
  if (tokenId.toLowerCase() === 'near') {
    const balance = await account.getAccountBalance();
    return new BN(balance.available);
  } else {
    return ftBalanceOf(account, tokenId, account.accountId);
  }
}
