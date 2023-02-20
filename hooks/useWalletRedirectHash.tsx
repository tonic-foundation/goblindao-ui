import { getExplorerUrl } from '@/config';
import { getNear } from '@/lib/services/near';
import { didTxSucceed } from '@tonic-foundation/transaction/lib/status';
import { useWalletSelector } from '@/state/containers/WalletSelectorContainer';
import React, { useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useSearchParam } from 'react-use';

export default function useWalletRedirectHash() {
  const txIds = useSearchParam('transactionHashes');
  const finalTxId = useMemo(() => {
    const all = txIds ? decodeURI(txIds).split(',') : undefined;
    if (all?.length) {
      const [last] = all.slice(-1);
      return last;
    }
  }, [txIds]);

  return { finalTxId };
}

async function checkAndToastTx(accountId: string, id: string) {
  try {
    const success = await didTxSucceed(getNear(), accountId, id);
    const text = success ? 'Transaction success' : 'Transaction failure';
    toast[`${success ? 'success' : 'error'}`](
      <a
        target="_blank"
        rel="noreferrer"
        href={getExplorerUrl('transaction', id)}
        className="group"
      >
        <p>{text}</p>
        <div tw="mt-2 text-sm">
          <p tw="group-hover:underline">Click to view transaction</p>
        </div>
      </a>,
      { duration: 5_000 }
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    console.info('error checking transaction', e);
  }
}

/**
 * This is only necessary for the NEAR web wallet. The other wallets return the
 * transaction outcome without requiring a page nav.
 */
export const TxToastProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { finalTxId } = useWalletRedirectHash();
  const { accountId } = useWalletSelector();

  useEffect(() => {
    if (accountId && finalTxId) {
      checkAndToastTx(accountId, finalTxId);
    }
  }, [accountId, finalTxId]);

  return <React.Fragment>{children}</React.Fragment>;
};
