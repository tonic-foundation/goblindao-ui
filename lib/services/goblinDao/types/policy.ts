import { DaoRole, DefaultVotePolicy } from './role';

export type PolicyType = Record<string, unknown> & {
  roles: DaoRole[];
  bountyBond: string;
  proposalBond: string;
  proposalPeriod: string;
  defaultVotePolicy: DefaultVotePolicy;
  bountyForgivenessPeriod: string;
};

export type DaoVotePolicy = {
  weightKind: string;
  quorum: string;
  kind: string;
  ratio: number[];
  threshold?: number[];
  weight?: string;
};

export type DaoPolicy = {
  createdAt: string;
  daoId: string;
  proposalBond: string;
  bountyBond: string;
  proposalPeriod: string;
  bountyForgivenessPeriod: string;
  defaultVotePolicy: DaoVotePolicy;
  roles: DaoRole[];
};

export type GroupPolicyDetails = {
  value: string | number;
  suffix: string;
  tooltip: string;
};
