import React, { FC } from 'react';
import Typography from '@/components/Typography';
import Markdown from '@/components/common/Markdown';
import { Proposal } from '@/lib/services/goblinDao/types';

const ProposalDescription: FC<{ proposal: Proposal }> = ({ proposal }) => {
  return (
    <div>
      <Typography.Heading tw="mb-5">Description</Typography.Heading>
      <Markdown>{proposal.description}</Markdown>
    </div>
  );
};

export default ProposalDescription;
