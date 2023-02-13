import React from 'react';
import { useRouter } from 'next/router';
import Loading from '@/components/common/Loading';
import { ProposalDescription, ProposalHeading } from '@/components/Proposals';
import { useGoblinDaoData, useGoblinDaoProposal } from '@/hooks/useGoblinDao';
import { extractMembersFromDao } from '@/lib/services/goblinDao/helpers';
import { useProposalVotingDetails } from '@/hooks/useProposalVotingDetails';
import { useTimelineData } from '@/hooks/useTimelineData';
import Votes from '@/components/Votes';

const Content = () => {
  const router = useRouter();
  const proposalId = router.query.proposal as string;
  const { data: proposal } = useGoblinDaoProposal(proposalId);
  const { dao, membersStats } = useGoblinDaoData(proposal?.daoId || '');

  const members =
    dao && membersStats ? extractMembersFromDao(dao, membersStats) : [];

  const { votesDetails, votingPolicyByGroup } = useProposalVotingDetails(
    proposal || undefined,
    dao || undefined,
    members
  );

  const { lastVote } = useTimelineData(proposal, proposal?.actions.length ?? 0);

  if (!proposal) {
    return (
      <div tw="w-full flex justify-center items-center">
        <Loading.Pulse tw="h-20 w-20 rounded-full" />
      </div>
    );
  }

  return (
    <div>
      <ProposalHeading proposal={proposal} />
      <div tw="flex flex-col gap-5 mb-4">
        <Votes
          votesDetails={votesDetails}
          votingPolicyByGroup={votingPolicyByGroup}
          lastVote={lastVote}
          proposal={proposal}
        />
      </div>
      <div tw="grid grid-cols-3 gap-5 mb-20"></div>
      <ProposalDescription proposal={proposal} />
    </div>
  );
};

export default Content;
