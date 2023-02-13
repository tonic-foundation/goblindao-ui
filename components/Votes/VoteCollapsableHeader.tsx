import React, { FC, useMemo } from 'react';

import {
  GroupPolicyDetails,
  VoterDetail,
} from '@/lib/services/goblinDao/types';
import { VotesProgressBar } from '@/components/Votes/VoteProgressBar';
import IconButton from '@/components/common/IconButton';
import Icon from '@/components/common/Icon';

interface VoteCollapsableHeaderProps {
  setToggle: (newState?: boolean) => void;
  state: boolean;
  votes: VoterDetail[];
  groupName: string;
  threshold?: GroupPolicyDetails;
}

export const VoteCollapsableHeader: FC<VoteCollapsableHeaderProps> = ({
  setToggle,
  state,
  votes,
  groupName,
  threshold,
}) => {
  const voiceCounter = useMemo(
    () => votes.filter((vote) => Boolean(vote.vote)).length,
    [votes]
  );

  return (
    <div
      tabIndex={-1}
      role="button"
      onClick={() => setToggle(!state)}
      onKeyPress={() => undefined}
    >
      <div>
        <div>{groupName}</div>
        <div />
        <div>
          {voiceCounter}/{votes.length} voices
        </div>
        <div />
        {threshold && (
          <>
            <span>
              <b>Voting policy:</b> {threshold.tooltip}
            </span>
            <span>{threshold.value}</span>
            <span>{threshold.suffix}</span>
          </>
        )}
      </div>

      <div>
        <VotesProgressBar votes={votes} />
        <IconButton
          tw="border w-9 h-9 text-neutral-600 dark:text-neutral-300"
          icon={<Icon.ChevronDown tw="w-5 h-5" />}
        />
      </div>
    </div>
  );
};
