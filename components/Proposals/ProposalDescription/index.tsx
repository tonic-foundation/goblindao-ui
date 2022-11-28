import React, { FC } from 'react';
import Typography from '@/components/Typography';
import Markdown from '@/components/common/Markdown';
import { ProposalProps } from '@/components/Proposals/Proposal';

const ProposalDescription: FC<{ proposal: ProposalProps }> = ({ proposal }) => {
  return (
    <div>
      <Typography.Heading tw="mb-5">Description</Typography.Heading>
      <Markdown children={proposal.description} />
    </div>
  );
};

export default ProposalDescription;
