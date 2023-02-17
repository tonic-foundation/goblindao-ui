import React from 'react';
import Tag from '@/components/common/Tag';
import { ProposalStatus } from '@/lib/services/goblinDao/types/proposal';

export const statusVariant = (status: ProposalStatus | undefined) => {
  switch (status) {
    case 'InProgress':
      return 'info';
    case 'Approved':
    case 'Moved':
      return 'success';
    case 'Removed':
      return 'warning';
    case 'Rejected':
    case 'Failed':
      return 'danger';
    case 'Expired':
    default:
      return 'gray';
  }
};

export type ProposalStatusProps = {
  status?: ProposalStatus;
};
const ProposalsStatus: React.FC<ProposalStatusProps> = ({
  status,
  ...props
}) => {
  return (
    <Tag {...props} variant={statusVariant(status)}>
      {status || 'Undetermined'}
    </Tag>
  );
};

export default ProposalsStatus;
