import React from 'react';

import Content from './content';
import AppLayout from '@/layouts';
import { GetStaticPaths, GetStaticProps } from 'next';
import { mock_proposals } from '@/components/Proposals/mock_data';
import { ProposalProps } from '@/components/Proposals/Proposal';

const Page: React.FC<{ proposal?: ProposalProps }> = ({ proposal }) => {
  return (
    <AppLayout>
      <Content proposal={proposal} />
    </AppLayout>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: mock_proposals.map((p) => ({ params: { voteId: p.id } })),
    fallback: false, // can also be true or 'blocking'
  };
};

export const getStaticProps: GetStaticProps = (context) => {
  const voteId = context.params!.voteId;

  // Async fetcher goes here...

  const proposal = mock_proposals.find((p) => p.id === voteId);
  return {
    props: {
      proposal:
        { ...proposal, eta: Math.floor(+(proposal?.eta || 1) / 1000) } || null,
    },
  };
};

export default Page;
