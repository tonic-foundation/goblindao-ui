import React, { FC } from 'react';
import Tag from '@/components/common/Tag';
import Card from '@/components/common/Card';
import Typography from '@/components/Typography';
import Icon from '@/components/common/Icon';
import { ProposalState } from '@/components/Proposals/ProposalsStatus';
import { ProposalsStatus } from '@/components/Proposals';

export type ProposalProps = {
  id: string;
  title: string;
  status: ProposalState;
  description: string;
  forCount: number;
  againstCount: number;
  abstainCount: number;
  eta?: Date | undefined;
  transactionHash: string;
  proposer: string | undefined;
  createdBlock?: number;
  startBlock?: number;
  endBlock?: number;
  proposalThreshold?: number;
  quorumVotes?: number;
};

const Proposal: FC<{ onClick: () => void; proposal: ProposalProps }> = ({
  onClick,
  proposal,
}) => {
  return (
    <Card onClick={onClick} tw="flex justify-between">
      <div tw="flex gap-4 items-center">
        <Typography.Subheading tw="text-neutral-500">
          {proposal.id}
        </Typography.Subheading>
        <Typography.Subheading>{proposal.title}</Typography.Subheading>
      </div>
      <div tw="flex items-center gap-3">
        {proposal.eta && (
          <Tag>
            <Icon.Clock />
            Expires in 14 days
          </Tag>
        )}
        <ProposalsStatus status={proposal.status} />
      </div>
    </Card>
  );
};

export default Proposal;
