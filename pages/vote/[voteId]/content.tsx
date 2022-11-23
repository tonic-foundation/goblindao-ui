import React, { FC } from 'react';
import { mock_proposals } from '@/components/Proposal/mock_data';
import { ProposalProps } from '@/components/Proposal/types';

const Content: FC<{ proposal?: ProposalProps }> = ({ proposal }) => {
  return <React.Fragment>Proposal</React.Fragment>;
};

// TODO fix types
export const getStaticProps: any = async ({ params }: any) => {
  const { voteId } = params;

  try {
    // Async fetcher goes here... in order to have a server side rendering

    const proposal = mock_proposals.find((p) => p.id === voteId);
    console.log(proposal);
    return {
      props: { proposal },
    };
  } catch (err) {
    console.log(err);
  }
};

export default Content;
