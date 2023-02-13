import { DaoPolicy, DaoVotePolicy, PolicyType } from './policy';

export type DaoDetails = {
  name: string;
  displayName: string | undefined;
  logo: string;
};

export type TGroup = {
  members: string[];
  name: string;
  permissions: string[];
  votePolicy: Record<string, DaoVotePolicy>;
  slug: string;
};

export type Member = {
  id: string;
  name: string;
  groups: string[];
  votes: number;
} & { [key: string]: string | string[] | number };

export type MemberStats = {
  accountId: string;
  voteCount: number;
};

export type DaoVersion = {
  createdAt: string;
  hash: string;
  version: number[];
  commitId: string;
  changelogUrl: string;
};

type DaoProperties = {
  id: string;
  name: string;
  description: string;
  flagCover?: string;
  flagLogo?: string;
  links: string[];
  displayName: string;
  legal?: {
    legalStatus?: string;
    legalLink?: string;
  };
};

export type DaoConfig = {
  name: string;
  purpose: string;
  metadata: string;
};

export type DaoDTO = {
  createdAt: string;
  daoVersionHash: string;
  daoVersion: {
    createdAt: string;
    hash: string;
    version: number[];
    commitId: string;
    changelogUrl: string;
  };
  transactionHash: string;
  updateTimestamp: string;
  id: string;
  config: DaoConfig;
  lastProposalId: number;
  policy: DaoPolicy;
  activeProposalCount: number;
  totalProposalCount: number;
  totalDaoFunds: number;
  stakingContract: string;
};

export type DAO = {
  txHash: string;
  members: number;
  daoVersionHash: string;
  daoVersion: DaoVersion;
  daoMembersList: string[];
  funds: string;
  totalProposals: number;
  activeProposalsCount: number;
  totalProposalsCount: number;
  totalDaoFunds: number;
  createdAt: string;
  groups: TGroup[];
  policy: PolicyType;
  votes?: number;
  logo?: string;
  lastProposalId: number;
  stakingContract?: string;
  delegations?: DaoDelegation[];
  followers?: string[];
} & DaoProperties;

export type DAOPreview = {
  funds: string;
} & DaoProperties;

export type VotePolicyRequest = {
  weight_kind: string;
  quorum: string;
  threshold: number[] | string;
};

export type RolesRequest = {
  name: string;
  kind: string | { Group: string[] };
  permissions: string[];
  // eslint-disable-next-line camelcase
  vote_policy: Record<string, VotePolicyRequest>;
};

export type PolicyTypeRequest = {
  roles: RolesRequest[];
  defaultVotePolicy: VotePolicyRequest;
  proposalBond: string;
  proposalPeriod: string;
  bountyBond: string;
  bountyForgivenessPeriod: string;
};

export type DaoDelegation = {
  id: string;
  daoId: string;
  balance: string;
  accountId: string;
  delegators: Record<string, string>;
};

export interface DaoFundsResponse {
  timestamp: number;
  value: number;
}

export type DaoMetadata = {
  links: string[];
  flagCover?: string;
  flagLogo?: string;
  flag?: string;
  displayName: string;
  legal?: {
    legalStatus?: string;
    legalLink?: string;
  };
};
