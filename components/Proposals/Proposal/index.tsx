import React, { FC } from 'react';
import Tag from '@/components/common/Tag';
import Card from '@/components/common/Card';
import Typography from '@/components/Typography';
import Icon from '@/components/common/Icon';
import { ProposalsStatus } from '@/components/Proposals';
import { Proposal as ProposalProps } from '@/lib/services/goblinDao';
import { differenceInDays } from 'date-fns';

export interface ProposalVoteProps {
  supportedTypes: 0 | 1 | 2;
  voter: { id: string };
}

const Proposal: FC<{
  onClick: () => void;
  proposal: ProposalProps;
  index: number;
}> = ({ onClick, proposal, index }) => {
  return (
    <Card hover="ring" onClick={onClick} tw="flex justify-between">
      <div tw="flex gap-4 items-center">
        <Typography.Heading tw="text-neutral-500">{index}</Typography.Heading>
        <Typography.Heading>{proposal.proposer}</Typography.Heading>
        {/*<Typography.Heading tw="opacity-50">{proposal.type}</Typography.Heading>*/}
      </div>
      <div tw="flex items-center gap-3">
        {+proposal.votePeriodEnd / 1000000 > new Date().getTime() && (
          <Tag>
            <Icon.Clock />
            Expires in{' '}
            {differenceInDays(
              +proposal.votePeriodEnd / 1000000,
              new Date().getTime()
            )}{' '}
            days
          </Tag>
        )}
        <ProposalsStatus status={proposal.status} />
      </div>
    </Card>
  );
};

export default Proposal;
