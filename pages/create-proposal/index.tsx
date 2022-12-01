import React from 'react';

import Content from './content';
import AppLayout from '@/layouts';
import NoContent from '@/pages/create-proposal/no-content';
import { useWalletSelector } from '@/state/containers/WalletSelectorContainer';

const Page: React.FC = () => {
  const { accountId } = useWalletSelector();
  const votePermission = false;

  return (
    <AppLayout>
      {!accountId && !votePermission ? <Content /> : <NoContent />}
    </AppLayout>
  );
};

export default Page;
