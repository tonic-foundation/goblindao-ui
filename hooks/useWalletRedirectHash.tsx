import { getExplorerUrl } from '@/config';
import { getNearNobody } from '@/lib/services/near';
import { useWalletSelector } from '@/state/containers/WalletSelectorContainer';
import { JsonRpcProvider } from 'near-api-js/lib/providers';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSearchParam } from 'react-use';

export enum TRANSACTION_WALLET_TYPE {
  NEAR_WALLET = 'transactionHashes',
}

/**
 * Get information from the URL hashes due to wallet callback redirect
 */
export default function useWalletRedirectHash() {
  const txId = useSearchParam(TRANSACTION_WALLET_TYPE.NEAR_WALLET);

  return { txId };
}

/**
 *
 * @param accountId
 * @param txId
 * @returns true if success, false otherwise
 */
async function didTxSucceed(
  accountId: string,
  txId: string
): Promise<{ SuccessValue?: string; Failure?: unknown }> {
  const ret = await (
    getNearNobody().connection.provider as JsonRpcProvider
  ).sendJsonRpc('EXPERIMENTAL_tx_status', [txId, accountId]);
  return (ret as any).status;
}

async function checkAndToastTx(accountId: string, id: string) {
  try {
    const status = await didTxSucceed(accountId, id);
    const success = status.Failure === undefined && status.SuccessValue;
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
  const { txId } = useWalletRedirectHash();
  const { accountId } = useWalletSelector();

  useEffect(() => {
    if (accountId && txId?.length) {
      checkAndToastTx(accountId, txId);
    }
  }, [txId]);

  return <React.Fragment>{children}</React.Fragment>;
};
