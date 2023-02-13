import React, { FC, useMemo } from 'react';

import {
  GroupPolicyDetails,
  VoterDetail,
} from '@/lib/services/goblinDao/types';
import { VotesProgressBar } from '@/components/Votes/VoteProgressBar';
import Icon from '@/components/common/Icon';
import Tooltip from '@/components/common/Tooltip';

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
      tw="flex items-start cursor-pointer rounded-[8px] justify-between p-1.5 w-full"
      tabIndex={-1}
      role="button"
      onClick={() => setToggle(!state)}
      onKeyPress={() => undefined}
    >
      <div tw="flex items-center justify-between w-full max-w-[225px]">
        <div tw="items-center rounded-full inline-flex font-semibold justify-center">
          {groupName}
        </div>
        <div tw="bg-neutral-300 h-[24px] w-[1px] block mx-3" />
        <div tw="text-xs w-full text-center">
          {voiceCounter}/{votes.length} voices
        </div>
        <div tw="bg-neutral-300 h-[24px] w-[1px] block mx-3" />
        {threshold && (
          <>
            <div tw="w-full text-sm font-semibold" id="vote_policy">
              {threshold.value} %
            </div>
            <Tooltip anchorId="vote_policy" place="top">
              <div tw="text-sm">
                <span>
                  <b>Voting policy:</b> {threshold.tooltip}
                </span>
                <span>{threshold.value}</span>
                <span>{threshold.suffix}</span>
              </div>
            </Tooltip>
          </>
        )}
      </div>

      <div tw="flex items-center w-full mt-[12px] max-w-[500px] gap-3">
        <VotesProgressBar votes={votes} />
        <Icon.ChevronDown tw="w-5 h-5" />
      </div>
    </div>
  );
};
