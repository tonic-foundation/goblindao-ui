import { StandardNearFunctionCall } from '@tonic-foundation/transaction/lib/shim';

export function getFtBalanceOf(contractId: string, accountId: string) {
  return new StandardNearFunctionCall({
    contractId,
    methodName: 'ft_balance_of',
    args: {
      account_id: accountId,
    },
  });
}
