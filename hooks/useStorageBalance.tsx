import { useEffect, useState } from 'react';
import { STORAGE_EXEMPT_TOKENS } from '@/config';
import { useWalletSelector } from '@/state/containers/WalletSelectorContainer';
import { getNearNobody } from '@/lib/services/near';
import { StorageBalance, storageBalanceOf } from '@tonic-foundation/storage';
import BN from 'bn.js';
import { ZERO } from '@tonic-foundation/utils';

function defaultStorageBalance(): StorageBalance<BN> {
  return {
    available: ZERO,
    total: ZERO,
  };
}

/**
 * Get the logged-in account's storage balance with the given contract.
 *
 * Storage balance is `null` if the account does not have a storage balance with
 * the contract, `undefined` while loading or if there's an error fetching.
 */
export default function useStorageBalance(address: string) {
  const { accountId } = useWalletSelector();
  const [storageBalance, setStorageBalance] =
    useState<StorageBalance<BN> | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function check() {
      if (STORAGE_EXEMPT_TOKENS.includes(address.toLowerCase())) {
        setStorageBalance(defaultStorageBalance());
        return;
      }

      try {
        const storageBalance = await storageBalanceOf(
          getNearNobody(),
          address,
          accountId || undefined
        );
        setStorageBalance(storageBalance || null);
      } catch (e) {
        console.warn(`Error getting storage balance, ${e}`);
        setStorageBalance(undefined);
      }
    }

    if (accountId?.length) {
      setLoading(true);
      check().finally(() => setLoading(false));
    }
  }, [accountId, address, setStorageBalance, setLoading]);

  return [storageBalance, loading] as const;
}
