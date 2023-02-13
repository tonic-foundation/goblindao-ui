import {
  DAO,
  GroupPolicyDetails,
  Member,
  ProposalFeedItem,
  VoterDetail,
} from '@/lib/services/goblinDao/types';
import {
  calculateVoicesThreshold,
  formatPolicyRatio,
  getVoteDetails,
  getVotingGoal,
} from '@/lib/services/goblinDao/helpers';
import { useVotingPolicyDetails } from '@/hooks/useVotingPolicyDetails';

export function useProposalVotingDetails(
  proposal: ProposalFeedItem | undefined,
  dao: DAO | undefined,
  members: Member[]
): {
  votesDetails: VoterDetail[];
  votingPolicyByGroup: Record<string, GroupPolicyDetails>;
} {
  const { threshold: votingThreshold, quorum } = useVotingPolicyDetails(dao);

  const tokensVotingGoal = getVotingGoal(
    Number(votingThreshold),
    // TODO get total Supply
    Number(0),
    Number(quorum ?? 0)
  );

  if (!dao) {
    return {
      votesDetails: [],
      votingPolicyByGroup: {
        TokenHolders: {
          value: tokensVotingGoal,
          suffix: '',
          tooltip: `${tokensVotingGoal} to pass`,
        },
      },
    };
  }

  const votesDetails = () => {
    if (!proposal) {
      return [];
    }

    const { votersList } = getVoteDetails(
      proposal.dao.numberOfMembers,
      proposal.dao.policy.defaultVotePolicy,
      proposal
    );

    const voteActions = proposal?.actions
      .filter(
        (item) =>
          item.action === 'VoteApprove' ||
          item.action === 'VoteReject' ||
          item.action === 'VoteRemove'
      )
      .reduce((res, item) => {
        res[item.accountId] = item.transactionHash;

        return res;
      }, {} as Record<string, string>);

    const notVotedList = members.reduce((res, item) => {
      const voted = votersList.find((voter) => voter.name === item.name);

      if (!voted) {
        res.push({
          id: item.id,
          name: item.name,
          groups: item.groups,
          vote: null,
        });
      }

      return res;
    }, [] as VoterDetail[]);

    return [
      ...votersList.map((item) => {
        const member = members.find((m) => m.name === item.name);

        return {
          ...item,
          groups: member?.groups ?? [],
          transactionHash: voteActions[item.name],
        };
      }),
      ...notVotedList,
    ];
  };

  const votingPolicyByGroup = () => {
    const result: Record<string, GroupPolicyDetails> = {
      TokenHolders: {
        value: tokensVotingGoal,
        suffix: '',
        tooltip: `${tokensVotingGoal} to pass`,
      },
    };

    dao.policy.roles.forEach((role) => {
      if (role.kind === 'Group') {
        const val = role.votePolicy.policy
          ? formatPolicyRatio(role.votePolicy.policy)
          : formatPolicyRatio(dao.policy.defaultVotePolicy);

        const totalGroupMembers = role.accountIds?.length ?? 0;
        const votesToPass = calculateVoicesThreshold(val, totalGroupMembers);

        result[role.name] = {
          value: val,
          suffix: '%',
          tooltip: `${val}%  - ${votesToPass} vote${
            votesToPass > 1 ? 's' : ''
          } from ${totalGroupMembers} group member${
            totalGroupMembers > 1 ? 's' : ''
          } to pass.`,
        };
      }
    });

    return result;
  };

  return {
    votesDetails: votesDetails(),
    votingPolicyByGroup: votingPolicyByGroup(),
  };
}
