import axios from 'axios';

const sputnik = axios.create({
  baseURL: 'https://api.app.astrodao.com/api/v1',
});

/**
 * DAO Funds
 * @name getDaoFunds
 * @desc Get goblin dao funds
 * @method GET
 * @param daoId
 * @return number
 */
export interface DaoFundsResponse {
  timestamp: number;
  value: number;
}
export async function getDaoFunds(daoId: string) {
  const url = `/stats/dao/${daoId}/funds`;
  const response = await sputnik.get<DaoFundsResponse[]>(url);

  return response.data?.length
    ? response.data[response.data.length - 1].value
    : 0;
}

/**
 * DAO Proposals
 * @name getDaoProposals
 * @desc get goblin dao proposals list
 * @method GET
 * @return ProposalsResponse
 */
export enum ProposalStatus {
  InProgress = 'In Progress',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Removed = 'Removed',
  Expired = 'Expired',
  Moved = 'Moved',
  Failed = 'Failed',
}
enum ProposalVotedStatus {
  Active,
  Expired,
}
enum ProposalTypes {
  ChangeConfig,
  ChangePolicy,
  AddMemberToRole,
  RemoveMemberFromRole,
  FunctionCall,
  UpgradeSelf,
  UpgradeRemote,
  Transfer,
  SetStakingContract,
  AddBounty,
  BountyDone,
  Vote,
}
interface ProposalPermissions {
  canApprove: boolean;
  canReject: boolean;
  canDelete: boolean;
  isCouncil: boolean;
  canAdd: boolean;
}
interface ProposalAction {
  id: string;
  proposalId: string;
  accountId: string;
  action: unknown;
  transactionHash: string;
  timestamp: string;
}
interface ProposalKindPolicyRole {
  id: string;
  name: string;
  balance: number;
  accountIds: string[];
  permissions: string[];
  votePolicy: unknown;
  kind: { group: string[] };
}
interface ProposalKindPolicy {
  proposalBond: string;
  bountyBond: string;
  proposalPeriod: string;
  bountyForgivenessPeriod: string;
  defaultVotePolicy: DaoVotePolicy;
  roles: ProposalKindPolicyRole;
}
interface ProposalKindAction {
  methodName: number;
  args: string;
  deposit: string;
  gas: string;
}
interface ProposalKindBountyClaim {
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  transactionHash: string;
  updateTransactionHash: string;
  createTimestamp: string;
  updateTimestamp: string;
  id: string;
  accountId: string;
  startTime: string;
  deadline: string;
  completed: boolean;
  endTime: string;
}
interface ProposalKindBountyContext {
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
  daoId: string;
  proposal: unknown;
  bounty: unknown;
  commentsCount: number;
}
interface ProposalKindBounty {
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  transactionHash: string;
  updateTransactionHash: string;
  createTimestamp: string;
  updateTimestamp: string;
  id: string;
  bountyId: number;
  proposalId: string;
  daoId: string;
  dao: Dao;
  bountyDoneProposals: unknown[];
  bountyContext: ProposalKindBountyContext;
  bountyClaims: ProposalKindBountyClaim[];
  description: string;
  token: string;
  amount: string;
  times: number;
  maxDeadline: string;
  numberOfClaims: number;
}
interface ProposalKind {
  type: ProposalTypes;
  config: DaoConfig;
  policy: ProposalKindPolicy;
  proposalVariant: string;
  memberId: string; // For type: AddMemberToRole or RemoveMemberFromRole
  role: string; // For type: AddMemberToRole or RemoveMemberFromRole
  receiverId: string; // For type: FunctionCall or UpgradeRemote or Transferor BountyDone
  actions: ProposalKindAction[]; // For type: FunctionCall
  hash: string; // For type: UpgradeSelfor UpgradeRemote
  methodName: string; // For type: UpgradeRemote
  tokenId: string; // For type: Transfer
  msg: string; // For type: Transfer
  stakingId: string; // For type: SetStakingContract
  bounty: ProposalKindBounty;
  bountyId: number; // For type: BountyDone
  amount: string; // For type: Transfer
}
interface Dao {
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  transactionHash: string;
  updateTransactionHash: string;
  createTimestamp: string;
  updateTimestamp: string;
  id: string;
  config: DaoConfig;
  metadata: unknown;
  amount: string;
  totalSupply: string;
  lastBountyId: number;
  lastProposalId: number;
  stakingContract: string;
  numberOfAssociates: number; // How many accounts in total have interacted with the DAO (made proposals, voted, etc).
  numberOfMembers: number; //How many accounts are members of the DAO
  numberOfGroups: number; // How many groups exist in the DAO
  council: string[]; // List of accounts that can vote for various activity
  accountIds: string[]; // List of all account ids that joined the DAO
  councilSeats: number; // Council accounts count
  policy: DaoPolicy;
  createdBy: string;
  daoVersionHash: string;
  daoVersion: DaoVersion;
  status: unknown;
  activeProposalCount: number;
  totalProposalCount: number;
  totalDaoFunds: number;
  bountyCount: number;
  nftCount: number;
}
interface DaoConfig {
  name: string;
  purpose: string;
  metadata: string;
}
interface DaoVotePolicy {
  weightKind: 'TokenWeight' | 'RoleWeight';
  quorum: string;
  kind: 'Weight' | 'Ratio';
  weight: string;
  ratio: string[];
}
interface DaoRole {
  isArchived: boolean;
  createdAt: string;
  id: string;
  name: string;
  kind: string;
  balance: number;
  accountIds: string[];
  permissions: string[];
  votePolicy: DaoVotePolicy;
}
interface DaoPolicy {
  isArchived: boolean;
  updatedAt: string;
  daoId: string;
  proposalBond: string;
  bountyBond: string;
  proposalPeriod: string;
  bountyForgivenessPeriod: string;
  defaultVotePolicy: DaoVotePolicy;
  roles: DaoRole[];
}
interface DaoVersion {
  isArchived: boolean;
  createdAt: string;
  hash: string;
  version: string[];
  commitId: string;
  changelogUrl: string;
}
export interface Proposal {
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  transactionHash: string;
  updateTransactionHash: string;
  createTimestamp: string;
  updateTimestamp: string;
  id: string;
  proposalId: number;
  daoId: string;
  dao: Dao;
  proposer: string;
  description: string;
  status: ProposalStatus;
  voteStatus: ProposalVotedStatus;
  kind: ProposalKind;
  type: ProposalTypes;
  submissionTime: string;
  voteCounts: unknown;
  votes: unknown;
  failure: unknown;
  actions: ProposalAction[];
  votePeriodEnd: string;
  bountyDoneId: string;
  bountyClaimId: string;
  commentsCount: number;
  permissions: ProposalPermissions;
}
export interface ProposalsResponse {
  offset: number;
  limit: number;
  total: number;
  data: Proposal[];
}
export async function getDaoProposals(url: string) {
  const response = await sputnik.get<ProposalsResponse>(url);

  // If needed get offset, limit here
  return response.data?.data.sort((a, b) =>
    a.createdAt > b.createdAt ? -11 : a.createdAt === b.createdAt ? 0 : 1
  );
}
