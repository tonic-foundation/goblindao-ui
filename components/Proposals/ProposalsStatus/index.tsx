import React from 'react';
import Tag from '@/components/common/Tag';

export enum ProposalState {
  UNDETERMINED = -1,
  PENDING,
  ACTIVE,
  CANCELLED,
  DEFEATED,
  SUCCEEDED,
  QUEUED,
  EXPIRED,
  EXECUTED,
  VETOED,
}

export const statusText = (status: ProposalState | undefined) => {
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

export const statusVariant = (status: ProposalState | undefined) => {
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

export type ProposalStatusProps = {
  status?: ProposalState;
};
const ProposalsStatus: React.FC<ProposalStatusProps> = (props) => {
  const { status } = props;
  return <Tag variant={statusVariant(status)}>{statusText(status)}</Tag>;
};

export default ProposalsStatus;
