import React, { FC } from 'react';
import Tag from '@/components/common/Tag';
import Card from '@/components/common/Card';
import Typography from '@/components/Typography';
import Icon from '@/components/common/Icon';
import { ProposalState } from '@/components/Proposals/ProposalsStatus';
import { ProposalsStatus } from '@/components/Proposals';

export interface ProposalVoteProps {
  supportedTypes: 0 | 1 | 2;
  voter: { id: string };
}

export interface ProposalProps {
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
  votes?: ProposalVoteProps[];
}

const Proposal: FC<{ onClick: () => void; proposal: ProposalProps }> = ({
  onClick,
  proposal,
}) => {
  return (
    <Card hover="ring" onClick={onClick} tw="flex justify-between">
      <div tw="flex gap-4 items-center">
        <Typography.Heading tw="text-neutral-500">
          {proposal.id}
        </Typography.Heading>
        <Typography.Heading>{proposal.title}</Typography.Heading>
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
