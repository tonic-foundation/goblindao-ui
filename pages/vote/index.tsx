import React from 'react';

import Content from './content';
import usePageTitle from '@/hooks/usePageTitle';
import AppLayout from '@/layouts';

const Page: React.FC = () => {
  usePageTitle('Governance');

  return (
    <AppLayout>
      <Content />
    </AppLayout>
  );
};

export default Page;
