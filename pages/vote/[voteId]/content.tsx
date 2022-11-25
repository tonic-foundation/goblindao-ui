import React, { FC, useState } from 'react';
// import { useRouter } from 'next/router';
import Loading from '@/components/common/Loading';
import { ProposalProps } from '@/components/Proposals/Proposal';
import { ProposalDescription, ProposalHeading } from '@/components/Proposals';
import VoteCard, { VoteCardVariant } from '@/components/VoteCard';
import { truncateToLocaleString } from '@/lib/util';
import VoteCardInfo from '@/components/VoteCard/VoteCardInfo';

const Content: FC<{ proposal?: ProposalProps }> = ({ proposal }) => {
  // const router = useRouter();
  // const voiId = (router.query.voteId as string[]) || [];

  const [currentProposal] = useState(proposal);

  if (!currentProposal) {
    return (
      <div tw="w-full flex justify-center items-center">
        <Loading.Pulse tw="h-20 w-20 rounded-[50rem]" />
      </div>
    );
  }

  // Get total votes and format percentages for UI
  const totalVotes = proposal
    ? proposal.forCount + proposal.againstCount + proposal.abstainCount
    : undefined;
  const forPercentage =
    proposal && totalVotes ? (proposal.forCount * 100) / totalVotes : 0;
  const againstPercentage =
    proposal && totalVotes ? (proposal.againstCount * 100) / totalVotes : 0;
  const abstainPercentage =
    proposal && totalVotes ? (proposal.abstainCount * 100) / totalVotes : 0;

  return (
    <div>
      <ProposalHeading proposal={currentProposal} />
      <div tw="grid grid-cols-3 gap-5 mb-4">
        <VoteCard
          percentage={forPercentage}
          variant={VoteCardVariant.FOR}
          proposal={currentProposal}
        />
        <VoteCard
          percentage={againstPercentage}
          variant={VoteCardVariant.AGAINST}
          proposal={currentProposal}
        />
        <VoteCard
          percentage={abstainPercentage}
          variant={VoteCardVariant.ABSTAIN}
          proposal={currentProposal}
        />
      </div>
      <div tw="grid grid-cols-3 gap-5 mb-20">
        <VoteCardInfo
          info={`${totalVotes} votes`}
          infoTitle="Threshold"
          infoSubtitle="Quorum"
        />
        <VoteCardInfo
          info="October 16, 2022"
          infoTitle="Ended"
          infoSubtitle="11:14 AM GMT+4"
        />
        <VoteCardInfo
          info={truncateToLocaleString(15724579, 0)}
          infoTitle="Snapshot"
          infoSubtitle="Taken at block"
        />
      </div>
      <ProposalDescription proposal={currentProposal} />
    </div>
  );
};

export default Content;
