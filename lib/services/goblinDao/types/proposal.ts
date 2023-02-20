import { DAO, DaoConfig, DaoDetails, DaoDTO } from './dao';
import { ProposalAction } from './role';
import BN from 'bn.js';
import { DaoPolicy } from '@/lib/services/goblinDao/types/policy';

export type ProposalDTO = {
  createTimestamp: string;
  createdAt: string;
  daoId: string;
  commentsCount: number;
  description: string;
  id: string;
  isArchived: boolean;
  kind: ProposalKind;
  proposalId: number;
  proposer: string;
  status: ProposalStatus;
  voteStatus: string;
  submissionTime: string;
  transactionHash: string;
  updateTimestamp: string;
  updateTransactionHash: string;
  updatedAt: string;
  voteCounts: Record<string, number[]>;
  votes: Record<string, 'Approve' | 'Reject' | 'Remove'>;
  dao: DaoDTO;
  votePeriodEnd: string;
  actions: ProposalActionData[];
};

export type FunctionCallAction = {
  method_name: string;
  args: string;
  deposit: string;
  gas: string;
};

export interface ProposalVotingPermissions {
  canApprove: boolean;
  canReject: boolean;
  canDelete: boolean;
}

export enum ProposalType {
  AddMemberToRole = 'AddMemberToRole',
  RemoveMemberFromRole = 'RemoveMemberFromRole',
  FunctionCall = 'FunctionCall',
  Transfer = 'Transfer',
  SetStakingContract = 'SetStakingContract',
  ChangePolicy = 'ChangePolicy',
  ChangeConfig = 'ChangeConfig',
  UpgradeSelf = 'UpgradeSelf',
  UpgradeRemote = 'UpgradeRemote',
  AddBounty = 'AddBounty',
  BountyDone = 'BountyDone',
  Vote = 'Vote',
}

export enum ProposalActions {
  /// Action to add proposal. Used internally.
  AddProposal = 'AddProposal',
  /// Action to remove given proposal. Used for immediate deletion in special cases.
  RemoveProposal = 'RemoveProposal',
  /// Vote to approve given proposal or bounty.
  VoteApprove = 'VoteApprove',
  /// Vote to reject given proposal or bounty.
  VoteReject = 'VoteReject',
  /// Vote to remove given proposal or bounty (because it's spam).
  VoteRemove = 'VoteRemove',
  /// Finalize proposal, called when it's expired to return the funds
  /// (or in the future can be used for early proposal closure).
  Finalize = 'Finalize',
  /// Move a proposal to the hub to shift into another DAO.
  MoveToHub = 'MoveToHub',
}

export enum ProposalVariant {
  ProposeTransfer = 'ProposeTransfer',
  ProposeCustomFunctionCall = 'ProposeCustomFunctionCall',
  ProposeTransferFunds = 'ProposeTransferFunds',
  ProposeDefault = 'ProposeDefault',
}

export type FunctionCallProposalType = {
  type: ProposalType.FunctionCall;
  receiverId: string;
  actions: FunctionCallAction[];
};

export type ProposalKind =
  | FunctionCallProposalType
  | {
      type: ProposalType.Transfer;
      tokenId: string;
      receiverId: string;
      amount: string;
      msg: string | null;
    };

export type ProposalStatus =
  | 'Approved'
  | 'InProgress'
  | 'Rejected'
  | 'Removed'
  | 'Expired'
  | 'Moved'
  | 'Failed';

export type ProposalProperties = {
  id: string;
  proposalId: number;
  daoId: string;
  proposer: string;
  commentsCount: number;
  description: string;
  status: ProposalStatus;
  kind: ProposalKind;
  votePeriodEnd: string;
  votePeriodEndDate: string;
  updatedAt: string | null;
  voteYes: number;
  voteNo: number;
  voteRemove: number;
  voteStatus: string;
  isFinalized: boolean;
  txHash: string;
  votes: {
    [key: string]: 'Yes' | 'No' | 'Dismiss';
  };
  createdAt: string;
  daoDetails: DaoDetails;
  link: string;
  proposalVariant: ProposalVariant;
  actions: ProposalActionData[];
  permissions?: {
    canApprove: boolean;
    canReject: boolean;
    canDelete: boolean;
    isCouncil: boolean;
  } | null;
};

export type Proposal = {
  dao: DAO | null;
} & ProposalProperties;

export interface CreateProposalParams {
  daoId: string;
  description: string;
  kind: 'Transfer' | 'FunctionCall';
  data?: Transfer | FunctionCall;
  bond: string;
  gas?: number;
  variant?: ProposalVariant;
}

export interface FunctionCall {
  receiver_id: string;
  actions: FunctionCallAction[];
}

export interface CreateProposalFunctionCall {
  description: string;
  method_name: string;
  deposit: BN;
  args: string;
  gas?: BN;
  receiver_id?: string;
}

export interface Transfer {
  token_id: string;
  // valid account id
  receiver_id: string;
  amount: string;
}
export interface CreateProposalTransfer {
  description: string;
  amount: BN;
  receiver_id: string;
  token_id?: string;
}
export enum ProposalStatuses {
  All = 'all',
  Active = 'active',
  Approved = 'approved',
  Failed = 'failed',
}

export enum ProposalCategories {
  All = 'All',
  Governance = 'Governance',
  Financial = 'Transfers',
  Bounties = 'Bounties',
  Members = 'Groups',
  Polls = 'Polls',
  FunctionCalls = 'FunctionCalls',
}

export interface ProposalActionData {
  id: string;
  proposalId: string;
  accountId: string;
  action: ProposalAction;
  transactionHash: string;
  timestamp: string;
}
export interface ProposalDetails {
  id: string;
  daoId: string;
  description: string;
  proposalVariant: ProposalVariant;
  type: ProposalType;
  status: ProposalStatus;
  kind: {
    type: ProposalType;
  };
  flag: string;
}

export interface ProposalsResponse {
  offset: number;
  limit: number;
  total: number;
  data: Proposal[];
}

export type ProposalFeedItemResponse = {
  createdAt: string;
  updatedAt: string;
  id: string;
  proposalId: number;
  updateTimestamp: number;
  transactionHash: string;
  daoId: string;
  proposer: string;
  description: string;
  status: 'Approved' | 'InProgress' | 'Rejected' | 'Expired';
  voteStatus: 'Active';
  kind: ProposalKind;
  type: string;
  votes: Record<string, 'Approve' | 'Reject' | 'Remove'>;
  votePeriodEnd: string;
  dao: {
    id: string;
    config: DaoConfig;
    numberOfMembers: number;
    policy: DaoPolicy;
  };
  actions: ProposalActionData[];
  commentsCount: number;
  permissions: {
    canApprove: boolean;
    canReject: boolean;
    canDelete: boolean;
    isCouncil: boolean;
  };
};

export type ProposalFeedItem = {
  dao: {
    id: string;
    name: string;
    logo: string;
    flagCover: string;
    flagLogo: string;
    legal: {
      legalStatus?: string;
      legalLink?: string;
    };
    numberOfMembers: number;
    policy: DaoPolicy;
  };
  permissions: {
    canApprove: boolean;
    canReject: boolean;
    canDelete: boolean;
    isCouncil: boolean;
  } | null;
} & ProposalProperties;

export type ProposalPermissions = {
  [ProposalType.ChangeConfig]: boolean;
  [ProposalType.ChangePolicy]: boolean;
  [ProposalType.AddBounty]: boolean;
  [ProposalType.BountyDone]: boolean;
  [ProposalType.Transfer]: boolean;
  [ProposalType.Vote]: boolean;
  [ProposalType.RemoveMemberFromRole]: boolean;
  [ProposalType.AddMemberToRole]: boolean;
  [ProposalType.AddMemberToRole]: boolean;
  [ProposalType.SetStakingContract]: boolean;
  [ProposalType.UpgradeSelf]: boolean;
  [ProposalType.UpgradeRemote]: boolean;
  [ProposalType.FunctionCall]: boolean;
};
