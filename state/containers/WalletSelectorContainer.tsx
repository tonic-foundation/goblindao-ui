import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Account } from 'near-api-js';
import { map, distinctUntilChanged } from 'rxjs';
import { setupWalletSelector } from '@near-wallet-selector/core';
import type { WalletSelector, AccountState } from '@near-wallet-selector/core';
import { setupNearWallet } from '@near-wallet-selector/near-wallet';
import { setupSender } from '@near-wallet-selector/sender';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import { setupHereWallet } from '@near-wallet-selector/here-wallet';
import { setupMeteorWallet } from '@near-wallet-selector/meteor-wallet';

import { IS_DEV, NEAR_ENV } from '@/config';
import { getNear } from '@/lib/services/near';
import Loading from '@/components/common/Loading';
import { useTheme } from 'next-themes';

declare global {
  interface Window {
    selector: WalletSelector;
  }
}

interface WalletSelectorContextValue {
  selector: WalletSelector;
  accounts: Array<AccountState>;
  accountId: string | null;
  activeAccount: Account | null;
  isSignedIn: boolean;
}

const WalletSelectorContext =
  React.createContext<WalletSelectorContextValue | null>(null);

export const WalletSelectorContextProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [selector, setSelector] = useState<WalletSelector | null>(null);
  const [accounts, setAccounts] = useState<Array<AccountState>>([]);
  const [activeAccount, setActiveAccount] = useState<Account | null>(null);

  const { theme: nextTheme } = useTheme();

  const init = useCallback(async () => {
    const _selector = await setupWalletSelector({
      network: NEAR_ENV,
      debug: IS_DEV,
      modules: [
        setupNearWallet(),
        setupMyNearWallet(),
        setupSender(),
        setupHereWallet(),
        setupMeteorWallet(),
      ],
    });

    const state = _selector.store.getState();

    setAccounts(state.accounts);

    window.selector = _selector;

    setSelector(_selector);
  }, []);

  useEffect(() => {
    init().catch((e) => {
      console.error(e);
      alert('Failed to initialise wallet selector');
    });
  }, [init]);

  useEffect(() => {
    if (!selector) {
      return;
    }

    const subscription = selector.store.observable
      .pipe(
        map((state) => state.accounts),
        distinctUntilChanged()
      )
      .subscribe(setAccounts);

    return () => subscription.unsubscribe();
  }, [selector]);

  useEffect(() => {
    const activeAccountId = accounts.find(
      (account) => account.active
    )?.accountId;
    if (activeAccountId?.length) {
      setActiveAccount(new Account(getNear().connection, activeAccountId));
    } else {
      setActiveAccount(null);
    }
  }, [accounts]);

  if (!selector) {
    return (
      <div tw="h-screen w-screen fixed inset-0 flex items-center justify-center">
        <div tw="space-y-3">
          <Loading.Spinner nextTheme={nextTheme} tw="mx-auto" />
          {/* actually, we're just waiting for the wallet selector to load */}
          <p tw="font-brand text-lg font-semibold">Connecting...</p>
        </div>
      </div>
    );
  }

  const accountId =
    accounts.find((account) => account.active)?.accountId || null;

  return (
    <WalletSelectorContext.Provider
      value={{
        selector,
        accounts,
        accountId,
        activeAccount,
        isSignedIn: !!activeAccount,
      }}
    >
      {children}
    </WalletSelectorContext.Provider>
  );
};

export function useWalletSelector() {
  const context = useContext(WalletSelectorContext);

  if (!context) {
    throw new Error(
      'useWalletSelector must be used within a WalletSelectorContextProvider'
    );
  }

  return context;
}
