import React from 'react';
import Tag from '@/components/common/Tag';
import { ProposalStatus } from '@/lib/services/goblinDao';

export const statusVariant = (status: ProposalStatus | undefined) => {
  switch (status) {
    case ProposalStatus.InProgress:
      return 'info';
    case ProposalStatus.Approved:
    case ProposalStatus.Moved:
      return 'success';
    case ProposalStatus.Removed:
      return 'warning';
    case ProposalStatus.Rejected:
    case ProposalStatus.Failed:
      return 'danger';
    case ProposalStatus.Expired:
    default:
      return 'gray';
  }
};

export type ProposalStatusProps = {
  status?: ProposalStatus;
};
const ProposalsStatus: React.FC<ProposalStatusProps> = (props) => {
  const { status } = props;
  return <Tag variant={statusVariant(status)}>{status || 'Undetermined'}</Tag>;
};

export default ProposalsStatus;
