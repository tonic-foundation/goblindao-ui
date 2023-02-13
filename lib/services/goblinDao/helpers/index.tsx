import { nanoid } from 'nanoid';
import {
  DAO,
  DaoDTO,
  DaoMetadata,
  Member,
  MemberStats,
} from '@/lib/services/goblinDao/types/dao';
import get from 'lodash/get';
import {
  DaoRole,
  DefaultVotePolicy,
  Proposal,
  ProposalDTO,
  ProposalFeedItem,
  ProposalFeedItemResponse,
  ProposalVariant,
  Vote,
  VoteDetail,
  VoterDetail,
} from '@/lib/services/goblinDao/types';
import { fromBase64ToObj, toMillis } from '@/lib/util';
import { DATA_SEPARATOR } from '@/config';
import { Vote as VoteState } from '@/lib/services/goblinDao/types';
import min from 'lodash/min';
import max from 'lodash/max';

export const extractMembersFromDao = (
  dao: DAO,
  membersStats: MemberStats[]
): Member[] => {
  const votesPerProposer = membersStats.reduce<Record<string, number>>(
    (res, item) => {
      res[item.accountId] = item.voteCount;

      return res;
    },
    {}
  );

  const members = {} as Record<string, Member>;

  dao.groups.forEach((grp) => {
    const users = grp.members;

    users.forEach((user) => {
      if (!members[user]) {
        members[user] = {
          id: nanoid(),
          name: user,
          groups: [grp.name],
          votes: votesPerProposer[user] ?? null,
        };
      } else {
        members[user] = {
          ...members[user],
          groups: [...members[user].groups, grp.name],
        };
      }
    });
  });

  return Object.values(members).map((item) => {
    return {
      ...item,
      groups: Array.from(new Set(item.groups)),
    };
  });
};

export function getVotesStatistic(proposal: Pick<ProposalDTO, 'votes'>): {
  voteYes: number;
  voteNo: number;
  voteRemove: number;
  votes: Record<string, VoteState>;
} {
  const result = {
    voteYes: 0,
    voteNo: 0,
    voteRemove: 0,
    votes: {} as Record<string, VoteState>,
  };

  Object.keys(proposal.votes).forEach((key) => {
    let value: VoteState;

    if (proposal.votes[key] === 'Approve') {
      result.voteYes += 1;
      value = 'Yes';
    } else if (proposal.votes[key] === 'Reject') {
      result.voteNo += 1;
      value = 'No';
    } else {
      result.voteRemove += 1;
      value = 'Dismiss';
    }

    result.votes[key] = value;
  });

  return result;
}

export const mapProposalDTOToProposal = (
  proposalDTO: ProposalDTO
): Proposal => {
  const [description, link, proposalVariant = ProposalVariant.ProposeDefault] =
    proposalDTO.description.split(DATA_SEPARATOR);

  const config = get(proposalDTO.dao, 'config');
  const meta = config?.metadata ? fromBase64ToMetadata(config.metadata) : null;

  const votePeriodEnd = new Date(
    toMillis(proposalDTO.votePeriodEnd)
  ).toISOString();

  return {
    ...getVotesStatistic(proposalDTO),
    id: proposalDTO.id,
    proposalId: proposalDTO.proposalId ?? 0,
    daoId: proposalDTO.daoId,
    proposer: proposalDTO.proposer,
    commentsCount: proposalDTO.commentsCount ?? 0,
    description,
    link: link ?? '',
    status: proposalDTO.status,
    kind: proposalDTO.kind,
    votePeriodEnd,
    votePeriodEndDate: votePeriodEnd,
    voteStatus: proposalDTO.voteStatus,
    isFinalized: proposalDTO.status === 'Expired',
    txHash: proposalDTO.transactionHash ?? '',
    createdAt: proposalDTO.createdAt,
    dao: mapDaoDTOtoDao(proposalDTO.dao),
    daoDetails: {
      name: proposalDTO.dao.config.name,
      displayName: meta?.displayName || '',
      logo: '/flags/defaultDaoFlag.png',
    },
    proposalVariant: proposalVariant as ProposalVariant,
    updatedAt: proposalDTO.updateTimestamp
      ? new Date(Number(proposalDTO.updateTimestamp) / 1000000).toISOString()
      : null,
    actions: proposalDTO.actions,
  };
};

export const mapProposalFeedItemResponseToProposalFeedItem = (
  proposalDTO: ProposalFeedItemResponse
): ProposalFeedItem => {
  const [description, link, proposalVariant = ProposalVariant.ProposeDefault] =
    proposalDTO.description.split(DATA_SEPARATOR);

  const config = get(proposalDTO.dao, 'config');
  const meta = config?.metadata ? fromBase64ToMetadata(config.metadata) : null;

  const votePeriodEnd = new Date(
    toMillis(proposalDTO.votePeriodEnd)
  ).toISOString();

  return {
    ...getVotesStatistic(proposalDTO),
    id: proposalDTO.id,
    proposalId: proposalDTO.proposalId ?? 0,
    daoId: proposalDTO.daoId,
    proposer: proposalDTO.proposer,
    commentsCount: proposalDTO.commentsCount ?? 0,
    description,
    link: link ?? '',
    status: proposalDTO.status,
    kind: proposalDTO.kind,
    votePeriodEnd,
    votePeriodEndDate: votePeriodEnd,
    voteStatus: proposalDTO.voteStatus,
    isFinalized: proposalDTO.status === 'Expired',
    txHash: proposalDTO.transactionHash ?? '',
    createdAt: proposalDTO.createdAt,
    dao: {
      id: proposalDTO.dao?.id,
      name: proposalDTO.dao?.config.name ?? '',
      logo: '/flags/defaultDaoFlag.png',
      flagCover: '',
      flagLogo: '',
      legal: meta?.legal || {},
      numberOfMembers: proposalDTO.dao?.numberOfMembers,
      policy: proposalDTO.dao?.policy,
    },
    daoDetails: {
      name: proposalDTO.dao?.config.name ?? '',
      displayName: meta?.displayName || '',
      logo: '/flags/defaultDaoFlag.png',
    },
    proposalVariant: proposalVariant as ProposalVariant,
    updatedAt: proposalDTO.updatedAt,
    actions: proposalDTO.actions,
    permissions: proposalDTO.permissions ?? {
      canApprove: false,
      canReject: false,
      canDelete: false,
      isCouncil: false,
    },
  };
};

export const fromBase64ToMetadata = (metaAsBase64: string): DaoMetadata => {
  return fromBase64ToObj(metaAsBase64);
};

export const mapDaoDTOtoDao = (daoDTO: DaoDTO): DAO | null => {
  if (!daoDTO.id) {
    return null;
  }

  const roles = get(daoDTO, 'policy.roles', []);
  const numberOfProposals = get(daoDTO, 'totalProposalCount', 0);

  // Get DAO groups
  const daoGroups = roles
    .filter((item: DaoRole) => item.kind === 'Group')
    .map((item: DaoRole) => {
      return {
        members: item.accountIds ?? [],
        name: item.name,
        permissions: item.permissions,
        votePolicy: item.votePolicy,
        slug: item.name,
      };
    });

  const config = get(daoDTO, 'config');

  const meta = config?.metadata ? fromBase64ToMetadata(config.metadata) : null;

  const daoMembersList = daoGroups
    .map(({ members }: { members: string[] }) => members)
    .flat()
    .reduce((acc: string[], member: string) => {
      if (!acc.includes(member)) {
        acc.push(member);
      }

      return acc;
    }, []);
  const numberOfMembers = daoMembersList.length;

  return {
    id: daoDTO.id,
    txHash: daoDTO.transactionHash ?? '',
    daoVersionHash: daoDTO.daoVersionHash,
    daoVersion: daoDTO.daoVersion,
    name: config?.name ?? '',
    description: config?.purpose ?? '',
    members: numberOfMembers,
    daoMembersList,
    activeProposalsCount: daoDTO.activeProposalCount ?? 0,
    totalProposalsCount: daoDTO.totalProposalCount ?? 0,
    totalProposals: numberOfProposals,
    funds: (daoDTO.totalDaoFunds ?? 0).toFixed(2),
    totalDaoFunds: daoDTO.totalDaoFunds ?? 0,
    createdAt: daoDTO.createdAt,
    groups: daoGroups,
    policy: daoDTO.policy,
    links: meta?.links || [],
    displayName: meta?.displayName || '',
    lastProposalId: daoDTO.lastProposalId,
    legal: meta?.legal || {},
    stakingContract: daoDTO.stakingContract,
  };
};

export function formatPolicyRatio(defaultPolicy: DefaultVotePolicy): number {
  if (!(defaultPolicy?.ratio && defaultPolicy.ratio.length)) {
    return 0;
  }

  const ratio = (defaultPolicy.ratio[0] / defaultPolicy.ratio[1]) * 100;

  return Number(ratio.toFixed(2));
}

export function getVotingGoal(
  votingThreshold: number,
  totalSupply: number,
  quorum: number
): number {
  const target = min([votingThreshold, totalSupply]);

  const goal = max([target, quorum]);

  return goal ?? 0;
}

export function getVoteDetails(
  numberOfMembers: number,
  defaultVotePolicy: {
    weightKind: string;
    kind: string;
    ratio: number[];
    quorum: string;
  },
  proposal?: Pick<
    Proposal,
    'voteYes' | 'voteNo' | 'voteRemove' | 'votes' | 'actions'
  > | null
): { details: VoteDetail; votersList: VoterDetail[] } {
  if (!defaultVotePolicy) {
    return {
      details: {
        limit: '',
        label: '',
      },
      votersList: [],
    };
  }

  const votesData = !proposal
    ? []
    : [
        {
          vote: 'Yes' as Vote,
          percent: (proposal.voteYes * 100) / numberOfMembers,
        },
        {
          vote: 'No' as Vote,
          percent: (proposal.voteNo * 100) / numberOfMembers,
        },
        {
          vote: 'Dismiss' as Vote,
          percent: (proposal.voteRemove * 100) / numberOfMembers,
        },
      ];

  const amount =
    (defaultVotePolicy.ratio[0] / defaultVotePolicy.ratio[1]) * 100;

  const details = {
    label: '',
    limit: `${amount}%`,
    data: votesData,
  };

  const list =
    proposal?.actions?.reduce<Record<string, VoterDetail>>((res, item) => {
      const vote = proposal.votes[item.accountId];

      if (res[item.accountId] && vote) {
        res[item.accountId] = {
          name: item.accountId,
          vote,
          timestamp: item.timestamp,
          id: item.id,
        };
      } else if (vote) {
        res[item.accountId] = {
          name: item.accountId,
          vote,
          timestamp: item.timestamp,
          id: item.id,
        };
      } else {
        res[item.accountId] = {
          name: item.accountId,
          vote: null,
          timestamp: null,
          id: item.id,
        };
      }

      return res;
    }, {}) ?? {};

  return { details, votersList: Object.values(list) };
}

export function calculateVoicesThreshold(
  votingThreshold: number,
  totalMembers: number
): number {
  if (!totalMembers) {
    return 0;
  }

  const oneMemberVotesPercent = 100 / totalMembers; // 25
  const votesNeeded = votingThreshold / oneMemberVotesPercent; // 74 - 2,96   75 - 3

  if (votesNeeded % 1 !== 0) {
    return Math.ceil(votesNeeded);
  }

  return votesNeeded + 1 > totalMembers ? votesNeeded : votesNeeded + 1;
}
