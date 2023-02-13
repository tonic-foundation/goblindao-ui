export type Vote = 'Yes' | 'No' | 'Dismiss';

export type VoterDetail = {
  id: string;
  name: string;
  vote: Vote | null;
  groups?: string[];
  timestamp?: string | null;
  transactionHash?: string | undefined;
};

export type VoteDetail = {
  limit: string;
  label: string;
  data?: VoteValue[];
};

export type VoteValue = {
  vote: Vote | null;
  percent: number;
};
