import React from 'react';

import Content from './content';
import usePageTitle from '@/hooks/usePageTitle';
import AppLayout from '@/layouts';
import { css } from 'twin.macro';

const Page: React.FC = () => {
  usePageTitle('Explore');

  return (
    <AppLayout
      css={css`
        & {
          max-width: 100%;
          display: flex;
        }
      `}
    >
      <Content />
    </AppLayout>
  );
};

export default Page;
