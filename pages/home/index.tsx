import React from 'react';
import DefaultLayout from '@/layouts';

import Content from './content';
import usePageTitle from '@/hooks/usePageTitle';

const Page: React.FC = () => {
  usePageTitle('Home');

  return (
    <DefaultLayout>
      <Content />
    </DefaultLayout>
  );
};

export default Page;
