import useSWR from 'swr';
import { Account } from 'near-api-js';
import { useWalletSelector } from '@/state/containers/WalletSelectorContainer';
import { getTokenOrNearBalance } from '@/lib/services/token';
import { bnToApproximateDecimal } from '@tonic-foundation/utils';
import tokenService from '@/lib/services/near/tokenlist';

export default function useWalletBalance(tokenId: string) {
  const { activeAccount } = useWalletSelector();

  async function fetcher(tokenId: string, account: Account | null) {
    if (!account) {
      return undefined;
    }
    const token = tokenService.getToken(tokenId);
    const raw = await getTokenOrNearBalance(account, tokenId);
    return bnToApproximateDecimal(raw, token.decimals);
  }

  return useSWR(
    // XXX: this is pretty hokey
    activeAccount
      ? {
          __hack: 'ft_balance_of',
          tokenId,
        }
      : null,
    ({ tokenId }) => fetcher(tokenId, activeAccount)
  );
}
