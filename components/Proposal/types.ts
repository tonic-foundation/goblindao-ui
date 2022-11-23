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

export type ProposalProps = {
  id: string;
  title: string;
  status: ProposalState;
  expire?: boolean;
};

export type ProposalStatusProps = {
  status?: ProposalState;
};
