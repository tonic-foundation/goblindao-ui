import Loading from '@/components/common/Loading';
import Typography from '../components/Typography';
import { useWalletPickerPage } from '../state';
import React from 'react';

const WalletConnect: React.FC = () => {
  const [page] = useWalletPickerPage();

  if (page.route !== 'wallet-connect') {
    throw new Error('page can only be rendered on wallet-connect stage');
  }

  return (
    <div tw="p-6 flex-grow flex flex-col items-stretch">
      <Typography.Title>Wallet connecting</Typography.Title>

      <div tw="flex-grow flex items-center justify-center">
        <Loading.Spinner />
      </div>
    </div>
  );
};

export default WalletConnect;
