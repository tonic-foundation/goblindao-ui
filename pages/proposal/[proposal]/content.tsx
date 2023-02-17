import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import Loading from '@/components/common/Loading';
import { ProposalDescription, ProposalHeading } from '@/components/Proposals';
import { useGoblinDaoData, useGoblinDaoProposal } from '@/hooks/useGoblinDao';
import { extractMembersFromDao } from '@/lib/services/goblinDao/helpers';
import { useProposalVotingDetails } from '@/hooks/useProposalVotingDetails';
import VoteActions from '@/components/Votes/VoteActions';
import { useWalletSelector } from '@/state/containers/WalletSelectorContainer';
import Card from '@/components/common/Card';
import LineItem from '@/components/common/LineItem';
import { format } from 'date-fns';
import groupBy from 'lodash/groupBy';
import VoteResults from '@/components/Votes/VoteResults';
import { VoteGroups } from '@/lib/services/goblinDao/types';
import { VotersList } from '@/components/Votes/VotersList';

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

  const votesGroups = useMemo(
    () =>
      votesDetails.reduce<VoteGroups>((res, item) => {
        const { groups } = item;

        groups?.forEach((group) => {
          if (res[group]) {
            res[group].push(item);
          } else {
            res[group] = [item];
          }
        });

        return res;
      }, {}),
    [votesDetails]
  );

  if (!proposal) {
    return (
      <div tw="w-full flex justify-center items-center">
        <Loading.Pulse tw="h-20 w-20 rounded-full" />
      </div>
    );
  }

  return (
    <div tw="lg:flex w-full max-w-[1012px] mx-auto gap-6">
      <div tw="w-full lg:w-8/12">
        <ProposalHeading proposal={proposal} />
        <ProposalDescription tw="mb-5" proposal={proposal} />
        <div tw="flex flex-col gap-6 mb-4">
          <VoteActions proposal={proposal} />
          {!votesDetails ? (
            <Loading.Pulse tw="h-[200px]" />
          ) : (
            <VotersList data={votesDetails} />
          )}
        </div>
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
        {Object.keys(votesGroups).map((votesGroupsKey) => {
          const list = votesGroups[votesGroupsKey];

          if (!list.length) {
            return null;
          }

          const groupedVotes = () => groupBy(list, 'vote');
          const yesWidth = () =>
            calculateWidth(votesDetails.length, groupedVotes()?.Yes?.length);
          const noWidth = () =>
            calculateWidth(votesDetails.length, groupedVotes()?.No?.length);

          return (
            <VoteResults
              groupName={votesGroupsKey}
              key={votesGroupsKey}
              noWidth={noWidth()}
              yesWidth={yesWidth()}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Content;
