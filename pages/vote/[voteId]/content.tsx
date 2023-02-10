import React, { FC } from 'react';
import { useRouter } from 'next/router';
import Loading from '@/components/common/Loading';
// import { ProposalVoteProps } from '@/components/Proposals/Proposal';
import { ProposalDescription, ProposalHeading } from '@/components/Proposals';
// import VoteCard, { VoteCardVariant } from '@/components/VoteCard';
// import { truncateToLocaleString } from '@/lib/util';
// import VoteCardInfo from '@/components/VoteCard/VoteCardInfo';
import { useGoblinDaoProposal } from '@/hooks/useGoblinDao';
import { Proposal } from '@/lib/services/goblinDao/types';

const Content: FC<{ proposal?: Proposal }> = () => {
  const router = useRouter();
  const voiId = router.query.voteId as string;

  const { data: proposal } = useGoblinDaoProposal(voiId);

  // console.log(proposal);

  if (!proposal) {
    return (
      <div tw="w-full flex justify-center items-center">
        <Loading.Pulse tw="h-20 w-20 rounded-full" />
      </div>
    );
  }

  // TODO create new Votes Component
  // // Get total votes and format percentages for UI
  // const totalVotes = proposal
  //   ? proposal.forCount + proposal.againstCount + proposal.abstainCount
  //   : undefined;
  // const forPercentage =
  //   proposal && totalVotes ? (proposal.forCount * 100) / totalVotes : 0;
  // const againstPercentage =
  //   proposal && totalVotes ? (proposal.againstCount * 100) / totalVotes : 0;
  // const abstainPercentage =
  //   proposal && totalVotes ? (proposal.abstainCount * 100) / totalVotes : 0;
  //
  // const getVoterIds = (votes: ProposalVoteProps) => votes.voter.id;
  //
  // const forVoterIds = mock_proposals_votes
  //   .filter((f) => f.supportedTypes === 1)
  //   .map(getVoterIds);
  // const againstVoterIds = mock_proposals_votes
  //   .filter((f) => f.supportedTypes === 0)
  //   .map(getVoterIds);
  // const abstainVoterIds = mock_proposals_votes
  //   .filter((f) => f.supportedTypes === 2)
  //   .map(getVoterIds);

  return (
    <div>
      <ProposalHeading proposal={proposal} />
      <div tw="grid grid-cols-3 gap-5 mb-4">
        {/*<VoteCard*/}
        {/*  percentage={forPercentage}*/}
        {/*  variant={VoteCardVariant.FOR}*/}
        {/*  proposal={currentProposal}*/}
        {/*  voterIds={forVoterIds}*/}
        {/*/>*/}
        {/*<VoteCard*/}
        {/*  percentage={againstPercentage}*/}
        {/*  variant={VoteCardVariant.AGAINST}*/}
        {/*  proposal={currentProposal}*/}
        {/*  voterIds={againstVoterIds}*/}
        {/*/>*/}
        {/*<VoteCard*/}
        {/*  percentage={abstainPercentage}*/}
        {/*  variant={VoteCardVariant.ABSTAIN}*/}
        {/*  proposal={currentProposal}*/}
        {/*  voterIds={abstainVoterIds}*/}
        {/*/>*/}
      </div>
      <div tw="grid grid-cols-3 gap-5 mb-20">
        {/*<VoteCardInfo*/}
        {/*  info={`${totalVotes} votes`}*/}
        {/*  infoTitle="Threshold"*/}
        {/*  infoSubtitle="Quorum"*/}
        {/*/>*/}
        {/*<VoteCardInfo*/}
        {/*  info="October 16, 2022"*/}
        {/*  infoTitle="Ended"*/}
        {/*  infoSubtitle="11:14 AM GMT+4"*/}
        {/*/>*/}
        {/*<VoteCardInfo*/}
        {/*  info={truncateToLocaleString(15724579, 0)}*/}
        {/*  infoTitle="Snapshot"*/}
        {/*  infoSubtitle="Taken at block"*/}
        {/*/>*/}
      </div>
      <ProposalDescription proposal={proposal} />
    </div>
  );
};

export default Content;
