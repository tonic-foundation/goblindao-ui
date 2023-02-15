import React, { FC } from 'react';
import Tag from '@/components/common/Tag';
import Card from '@/components/common/Card';
import Typography from '@/components/Typography';
import Icon from '@/components/common/Icon';
import { ProposalsStatus } from '@/components/Proposals';
import { Proposal as ProposalProps } from '@/lib/services/goblinDao/types/proposal';
import { differenceInDays, differenceInHours } from 'date-fns';

const Proposal: FC<{
  onClick: () => void;
  proposal: ProposalProps;
  index: number;
}> = ({ onClick, proposal, index }) => {
  const diffDays = differenceInDays(
    +proposal.votePeriodEnd / 1000000,
    new Date().getTime()
  );
  const diffHours = differenceInHours(
    +proposal.votePeriodEnd / 1000000,
    new Date().getTime()
  );

  return (
    <Card hover="ring" onClick={onClick} tw="flex justify-between">
      <div tw="flex gap-4 items-center">
        <Typography.Heading tw="text-neutral-500">{index}</Typography.Heading>
        <Typography.Heading>{proposal.id}</Typography.Heading>
        <Typography.Heading tw="opacity-50">
          {proposal.kind.type}
        </Typography.Heading>
      </div>
      <div tw="flex items-center gap-3">
        {+proposal.votePeriodEnd / 1000000 > new Date().getTime() &&
          proposal.status === 'InProgress' && (
            <Tag>
              <Icon.Clock />
              Expires in {diffDays ? `${diffDays} days` : `${diffHours} hours`}
            </Tag>
          )}
        <ProposalsStatus status={proposal.status} />
      </div>
    </Card>
  );
};

export default Proposal;
