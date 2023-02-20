import useNearViewFunction from '@/hooks/useNearViewFunction';
import { GOBLIN_TESTNET_CONTRACT_ID } from '@/config';

type TokenInfo = {
  approved_account_ids: object;
  metadata: unknown | object;
  owner_id: string;
  token_id: string;
};

export function useMyNFT(accountId: string) {
  const { data: myNFT } = useNearViewFunction<TokenInfo[]>({
    contractId: GOBLIN_TESTNET_CONTRACT_ID || '',
    methodName: 'nft_tokens_for_owner',
    args: {
      account_id: accountId,
    },
  });

  return myNFT?.length ? myNFT[0].token_id : '';
}
