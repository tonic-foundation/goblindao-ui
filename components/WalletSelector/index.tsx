import React, { useCallback } from 'react';
import tw from 'twin.macro';
import { ModalOptions } from '@near-wallet-selector/modal-ui';
import { ModalHeader } from '@/components/common/Modal';
import Home from './pages/Home';
import WalletConnect from './pages/WalletConnect';
import WalletInstall from './pages/WalletInstall';
import IconButton from '@/components/common/IconButton';
import { useWalletPickerPage } from './state';
import WalletSelect from './pages/WalletSelect';
import { useWalletSelector } from '@/state/containers/WalletSelectorContainer';
import { ModuleState, Wallet } from '@near-wallet-selector/core';
import toast from 'react-hot-toast';

const Wrapper = tw.div`
  overflow-hidden h-full flex flex-col items-stretch
  w-screen sm:(h-[70vh] max-h-[600px] max-w-[360px])
  dark:bg-neutral-900
`;

const Content: React.FC<{
  options: ModalOptions;
  onConnected: () => unknown;
}> = ({ options, onConnected }) => {
  const { selector } = useWalletSelector();

  const [page, setPage] = useWalletPickerPage();

  const handleWalletConnecting = (wallet: Wallet) => {
    setPage({ route: 'wallet-connect', wallet });
  };

  const handleWalletNotInstalled = (state: ModuleState<Wallet>) => {
    setPage({ route: 'wallet-install', state });
  };

  const handleError = (e: Error) => {
    toast.custom(
      <div>
        <p>Error connecting wallet</p>
        <p tw="mt-3 text-sm opacity-80">{e.message}</p>
      </div>
    );
    setPage({ route: 'wallet-select' });
  };

  switch (page.route) {
    case 'home': {
      return <Home />;
    }
    case 'wallet-select': {
      return (
        <WalletSelect
          selector={selector}
          onConnected={onConnected}
          onConnecting={handleWalletConnecting}
          onError={handleError}
          onWalletNotInstalled={handleWalletNotInstalled}
          options={options}
        />
      );
    }
    case 'wallet-connect': {
      return <WalletConnect />;
    }
    case 'wallet-install': {
      return <WalletInstall />;
    }
  }
};

export const WalletSelector: React.FC<{
  options: ModalOptions;
  onClose: () => unknown;
}> = ({ options, onClose, ...props }) => {
  const [page, setPage] = useWalletPickerPage();

  // const showBack = page.route !== 'home';
  const showBack = page.route !== 'wallet-select';
  const handleClickBack = useCallback(() => {
    switch (page.route) {
      // case 'home': {
      case 'wallet-select': {
        return;
      }
      case 'wallet-install': {
        setPage({ route: 'wallet-select' });
        return;
      }
      case 'wallet-connect': {
        setPage({ route: 'wallet-select' });
        return;
      }
      default: {
        // setPage({ route: 'home' });
        setPage({ route: 'wallet-select' });
      }
    }
  }, [setPage, page]);

  return (
    <Wrapper {...props}>
      <ModalHeader tw="justify-between">
        {showBack ? <IconButton.Back onClick={handleClickBack} /> : <span />}
        <IconButton.Close onClick={onClose} />
      </ModalHeader>
      <div tw="flex-grow flex flex-col items-stretch overflow-auto">
        <Content options={options} onConnected={onClose} />
      </div>
    </Wrapper>
  );
};
