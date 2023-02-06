import { getExplorerUrl } from '@/config';
import { useWalletSelector } from '@/state/containers/WalletSelectorContainer';
import { Wallet } from '@near-wallet-selector/core';
import { Account } from 'near-api-js';
import {
  ExecutionOutcomeWithId,
  FinalExecutionOutcome,
} from 'near-api-js/lib/providers';
import React, { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { sleep } from '@/lib/util';

export function useSignTransaction(
  cb: (
    wallet: Wallet,
    activeAccount: Account | null
  ) => Promise<FinalExecutionOutcome | FinalExecutionOutcome[] | void>,
  deps: React.DependencyList
) {
  const { selector, activeAccount } = useWalletSelector();
  const [loading, setLoading] = useState(false);

  const customToast = (() => ({
    loading: () => toast.loading('Confirming transaction...'),
    success: (outcome: ExecutionOutcomeWithId) =>
      toast.success(
        <div>
          <p tw="text-sm font-medium">Transaction confirmed</p>
          <a
            tw="mt-2 text-sm"
            target="_blank"
            rel="noreferrer"
            // if we get here, outcome is never undefined.
            // the wallet selector could use better types...
            href={getExplorerUrl('transaction', outcome ? outcome.id : '')}
          >
            <span tw="underline">View in the explorer</span> &rarr;
          </a>
        </div>
      ),
    error: (message: string) => toast.error(message),
    dismiss: (id: string) => toast.dismiss(id),
  }))();

  const wrapped = useCallback(async () => {
    setLoading(true);
    const loadingToast = customToast.loading();
    try {
      const wallet = await selector.wallet();
      const res = await cb(wallet, activeAccount);
      await sleep(1000); // not preferable

      if (res) {
        if ('length' in res) {
          if (res.length) {
            const [lastOutcome] = res.slice(-1);
            customToast.success(lastOutcome.transaction_outcome);
          }
        } else {
          customToast.success(res.transaction_outcome);
        }
      }
    } catch (e: any) {
      customToast.error(e.message);
    } finally {
      setLoading(false);
      customToast.dismiss(loadingToast);
    }
  }, [activeAccount, cb, selector, ...deps]);

  return [loading, wrapped] as const;
}
