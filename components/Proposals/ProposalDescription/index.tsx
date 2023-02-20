import React, { FC } from 'react';
import Typography from '@/components/Typography';
import Markdown from '@/components/common/Markdown';
import { ProposalFeedItem } from '@/lib/services/goblinDao/types/proposal';

const ProposalDescription: FC<{ proposal: ProposalFeedItem }> = ({
  proposal,
  ...props
}) => {
  return (
    <div {...props}>
      <Typography.Heading tw="font-semibold">Description</Typography.Heading>
      <Markdown>{proposal.description}</Markdown>
    </div>
  );
};

export default ProposalDescription;
