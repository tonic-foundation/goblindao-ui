import React, { FC, useMemo } from 'react';
import groupBy from 'lodash/groupBy';
import { VoterDetail } from '@/lib/services/goblinDao/types';

interface VotesProgressBarProps {
  votes: VoterDetail[];
}

const calculateWidth = (allVoices: number, countVoices: number) => {
  if (!countVoices) {
    return 0;
  }

  return (countVoices / allVoices) * 100;
};

export const VotesProgressBar: FC<VotesProgressBarProps> = ({ votes }) => {
  const groupedVotes = useMemo(() => groupBy(votes, 'vote'), [votes]);

  const yesWidth = useMemo(
    () => calculateWidth(votes.length, groupedVotes?.Yes?.length),
    [groupedVotes?.Yes?.length, votes.length]
  );
  const noWidth = useMemo(
    () => calculateWidth(votes.length, groupedVotes?.No?.length),
    [groupedVotes?.No?.length, votes.length]
  );

  return (
    <div>
      <div style={{ width: `${noWidth}%` }} />
      <div style={{ width: `${yesWidth}%` }} />
    </div>
  );
};
