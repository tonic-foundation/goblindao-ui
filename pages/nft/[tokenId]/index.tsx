import React from 'react';

import Content from './content';
import AppLayout from '@/layouts';
import { GetStaticPaths, GetStaticProps } from 'next';

const mock_nfts = Array(2000)
  .fill({ tokenId: '' })
  .map((g, index) => ({ tokenId: `${index + 1}` }));

// TODO types
const Page: React.FC<{ tokenId: string }> = ({ tokenId }) => {
  return (
    <AppLayout>
      <Content tokenId={tokenId} />
    </AppLayout>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: mock_nfts.map((p) => ({ params: { tokenId: p.tokenId } })),
    fallback: false, // can also be true or 'blocking'
  };
};

export const getStaticProps: GetStaticProps = (context) => {
  const tokenId = context.params!.tokenId;

  // Async fetcher goes here...

  const token = mock_nfts.find((p) => p.tokenId === tokenId);
  return {
    props: {
      tokenId: token?.tokenId,
    },
  };
};

export default Page;
