import React, { FC } from 'react';

import { VoterDetail } from '@/lib/services/goblinDao/types';
import NoVotesResults from '@/components/Votes/NoVotesResults';
import { VoterDetailsCard } from '@/components/Votes/VoterDetailsCard';

interface VotersListProps {
  data: VoterDetail[];
  lastVoteId?: string;
}

export const VotersList: FC<VotersListProps> = ({ data, lastVoteId }) => {
  if (!data?.length) {
    return <NoVotesResults title="No votes here" />;
  }

  return (
    <ul>
      {data
        .sort((a, b) => {
          if (!a.timestamp || !b.timestamp) {
            return 0;
          }

          if (a.timestamp > b.timestamp) {
            return -1;
          }

          if (a.timestamp < b.timestamp) {
            return 1;
          }

          return 0;
        })
        .map((item) => (
          <li key={item.name}>
            <VoterDetailsCard
              timestamp={item.timestamp}
              transactionHash={item.transactionHash}
              vote={item.vote}
              name={item.name}
              groups={item.groups}
              isLastVote={lastVoteId ? lastVoteId === item.id : false}
            />
          </li>
        ))}
    </ul>
  );
};
