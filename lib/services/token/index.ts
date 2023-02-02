import BN from 'bn.js';
import { FungibleTokenMetadata } from '@tonic-foundation/token/lib/types';
import { ftBalanceOf, ftOrNativeNearMetadata } from '@tonic-foundation/token';
import { Account } from 'near-api-js';
import { getNearNobody } from '../near';
import { ZERO } from '@tonic-foundation/utils';

export async function getTokenMetadata(
  tokenId: string
): Promise<FungibleTokenMetadata> {
  return await ftOrNativeNearMetadata(getNearNobody(), tokenId);
}

export async function getTokenBalance(
  account: Account,
  tokenId: string
): Promise<BN> {
  return ftBalanceOf(account, tokenId, account.accountId).catch(() => ZERO);
}

export async function getTokenOrNearBalance(account: Account, tokenId: string) {
  if (tokenId.toLowerCase() === 'near') {
    const balance = await account.getAccountBalance();
    return new BN(balance.available);
  } else {
    return ftBalanceOf(account, tokenId, account.accountId);
  }
}
