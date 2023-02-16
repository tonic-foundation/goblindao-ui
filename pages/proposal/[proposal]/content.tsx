import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import Loading from '@/components/common/Loading';
import { ProposalDescription, ProposalHeading } from '@/components/Proposals';
import { useGoblinDaoData, useGoblinDaoProposal } from '@/hooks/useGoblinDao';
import { extractMembersFromDao } from '@/lib/services/goblinDao/helpers';
import { useProposalVotingDetails } from '@/hooks/useProposalVotingDetails';
import Vote from '@/components/Votes/Vote';
import { useWalletSelector } from '@/state/containers/WalletSelectorContainer';
import Card from '@/components/common/Card';
import LineItem from '@/components/common/LineItem';
import { format } from 'date-fns';
import { VotesProgressBar } from '@/components/Votes/VoteProgressBar';
import groupBy from 'lodash/groupBy';
import Typography from '@/components/Typography';

const calculateWidth = (allVoices: number, countVoices: number) => {
  if (!countVoices) {
    return 0;
  }

  return (countVoices / allVoices) * 100;
};

const Content = () => {
  const router = useRouter();
  const { accountId } = useWalletSelector();
  const proposalId = router.query.proposal as string;
  const { data: proposal } = useGoblinDaoProposal(proposalId, accountId || '');
  const { dao, membersStats } = useGoblinDaoData(proposal?.daoId || '');

  const members =
    dao && membersStats ? extractMembersFromDao(dao, membersStats) : [];

  const { votesDetails } = useProposalVotingDetails(
    proposal || undefined,
    dao || undefined,
    members
  );

  const groupedVotes = useMemo(
    () => groupBy(votesDetails, 'vote'),
    [votesDetails]
  );

  const yesWidth = useMemo(
    () => calculateWidth(votesDetails.length, groupedVotes?.Yes?.length),
    [groupedVotes?.Yes?.length, votesDetails.length]
  );
  const noWidth = useMemo(
    () => calculateWidth(votesDetails.length, groupedVotes?.No?.length),
    [groupedVotes?.No?.length, votesDetails.length]
  );

  if (!proposal) {
    return (
      <div tw="w-full flex justify-center items-center">
        <Loading.Pulse tw="h-20 w-20 rounded-full" />
      </div>
    );
  }

  return (
    <div tw="lg:flex w-full max-w-[1012px] mx-auto gap-5">
      <div tw="w-full lg:w-8/12 lg:pr-5">
        <ProposalHeading proposal={proposal} />
        <ProposalDescription tw="mb-5" proposal={proposal} />
        <div tw="flex flex-col gap-5 mb-4">
          <Vote proposal={proposal} />
          {/*<Votes*/}
          {/*  votesDetails={votesDetails}*/}
          {/*  votingPolicyByGroup={votingPolicyByGroup}*/}
          {/*  lastVote={lastVote}*/}
          {/*  proposal={proposal}*/}
          {/*/>*/}
        </div>
        {/*<div tw="grid grid-cols-3 gap-5 mb-20"></div>*/}
      </div>
      <div tw="w-full lg:w-4/12 lg:min-w-[321px] flex flex-col gap-6">
        <Card hasBody>
          <Card.Header tw="border-b-[1px] dark:border-neutral-700 border-neutral-200">
            Information
          </Card.Header>
          <div tw="p-5 flex flex-col gap-2">
            <LineItem
              label="Start Date"
              content={format(
                new Date(proposal.createdAt),
                'dd LLL, yyyy, HH:mm:ss'
              )}
            />
            <LineItem
              label="End Date"
              content={format(
                new Date(proposal.votePeriodEndDate),
                'dd LLL, yyyy, HH:mm:ss'
              )}
            />
          </div>
        </Card>
        <Card hasBody>
          <Card.Header tw="border-b-[1px] dark:border-neutral-700 border-neutral-200">
            Results
          </Card.Header>
          <div tw="p-5 flex flex-col gap-4">
            <div tw="flex flex-col gap-2">
              <div tw="flex justify-between">
                <span>Yes</span>
                <Typography.Currency
                  value={yesWidth}
                  precision={2}
                  percentage
                />
              </div>
              <VotesProgressBar yes width={yesWidth} votes={votesDetails} />
            </div>
            <div tw="flex flex-col gap-2">
              <div tw="flex justify-between">
                <span>No</span>
                <Typography.Currency value={noWidth} precision={2} percentage />
              </div>
              <VotesProgressBar width={noWidth} votes={votesDetails} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Content;
