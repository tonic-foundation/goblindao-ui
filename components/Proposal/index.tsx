import React, { FC } from 'react';
import Tag from '@/components/common/Tag';
import Card from '@/components/common/Card';
import Typography from '@/components/Typography';
import Icon from '@/components/common/Icon';
import {
  ProposalProps,
  ProposalState,
  ProposalStatusProps,
} from '@/components/Proposal/types';

const ProposalStatus: React.FC<ProposalStatusProps> = (props) => {
  const statusVariant = (status: ProposalState | undefined) => {
    switch (status) {
      case ProposalState.PENDING:
      case ProposalState.ACTIVE:
        return 'info';
      case ProposalState.SUCCEEDED:
      case ProposalState.EXECUTED:
        return 'success';
      case ProposalState.QUEUED:
        return 'warning';
      case ProposalState.DEFEATED:
      case ProposalState.VETOED:
        return 'danger';
      case ProposalState.CANCELLED:
      case ProposalState.EXPIRED:
      default:
        return 'gray';
    }
  };

  const statusText = (status: ProposalState | undefined) => {
    switch (status) {
      case ProposalState.PENDING:
        return 'Pending';
      case ProposalState.ACTIVE:
        return 'Active';
      case ProposalState.SUCCEEDED:
        return 'Succeeded';
      case ProposalState.EXECUTED:
        return 'Executed';
      case ProposalState.DEFEATED:
        return 'Defeated';
      case ProposalState.QUEUED:
        return 'Queued';
      case ProposalState.CANCELLED:
        return 'Canceled';
      case ProposalState.VETOED:
        return 'Vetoed';
      case ProposalState.EXPIRED:
        return 'Expired';
      default:
        return 'Undetermined';
    }
  };

  const { status } = props;
  return <Tag variant={statusVariant(status)}>{statusText(status)}</Tag>;
};

const Proposal: FC<{ onClick: () => unknown; proposal: ProposalProps }> = ({
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
        {proposal.expire && (
          <Tag>
            <Icon.Clock />
            Expires in 14 days
          </Tag>
        )}
        <ProposalStatus status={proposal.status} />
      </div>
    </Card>
  );
};

export default Proposal;
