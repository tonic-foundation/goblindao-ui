import React, { FC } from 'react';
import {
  GroupPolicyDetails,
  ProposalFeedItem,
  VoterDetail,
} from '@/lib/services/goblinDao/types';
import Typography from '@/components/Typography';
import VoteTimeline from '@/components/Votes/VoteTimeline';
import VoteCollapsableList from '@/components/Votes/VoteCollapsableList';
import { VoteActionItem } from '@/hooks/useTimelineData';

const Votes: FC<{
  proposal: ProposalFeedItem;
  votesDetails: VoterDetail[];
  votingPolicyByGroup: Record<string, GroupPolicyDetails>;
  lastVote?: VoteActionItem;
}> = ({ proposal, votesDetails, lastVote, votingPolicyByGroup }) => {
  return (
    <div>
      <Typography.Title>Votes</Typography.Title>
      <VoteTimeline proposal={proposal} />
      <VoteCollapsableList
        data={votesDetails}
        votingPolicyByGroup={votingPolicyByGroup}
        lastVoteId={
          proposal.status !== 'InProgress' ? lastVote?.action?.id : undefined
        }
      />
    </div>
  );
};

export default Votes;
