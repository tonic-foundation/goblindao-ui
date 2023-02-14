import React, { FC } from 'react';
import { Vote } from '@/lib/services/goblinDao/types';
import Icon from '@/components/common/Icon';
import { formatTimestampAsDate } from '@/lib/util';

interface VoterDetailsCardProps {
  vote: Vote | null;
  name: string;
  groups?: string[];
  transactionHash: string | undefined;
  timestamp: string | null | undefined;
  isLastVote: boolean;
}

export const VoterDetailsCard: FC<VoterDetailsCardProps> = ({
  vote,
  name,
  transactionHash,
  timestamp,
  isLastVote,
}) => {
  let icon;

  const renderIcon = (vote: Vote | null, isLastVote: boolean) => {
    // const CheckedIcon = () => (
    //   <Icon.Checked tw="w-4 h-5 bg-white rounded-full absolute right-1 top-1.5 text-success-500" />
    // );
    switch (vote) {
      case 'Yes': {
        return (
          <div tw="relative p-3 bg-success-500 bg-opacity-10">
            <Icon.Like tw="w-6 h-6 text-success-500" />
            {/*{isLastVote && <CheckedIcon />}*/}
          </div>
        );
      }
      case 'No': {
        return (
          <div tw="relative p-3 bg-danger-500 bg-opacity-10">
            <Icon.Dislike tw="w-6 h-6 text-danger-500" />
            {/*{isLastVote && <CheckedIcon />}*/}
          </div>
        );
      }
      case 'Dismiss': {
        return (
          <div tw="relative p-3 bg-danger-500 bg-opacity-10">
            <Icon.Trash tw="w-6 h-6 text-danger-500" />
            {/*{isLastVote && <CheckedIcon />}*/}
          </div>
        );
      }
      default: {
        return (
          <div tw="relative p-3 bg-brand-600 bg-opacity-5">
            <Icon.Vote tw="w-6 h-6 text-brand-600" />
            {/*{isLastVote && <CheckedIcon />}*/}
          </div>
        );
      }
    }
  };

  return (
    <div tw="flex justify-between items-center bg-neutral-50 overflow-hidden rounded-md mt-5">
      <div tw="flex items-center gap-4">
        {renderIcon(vote, isLastVote)}
        <div tw="font-semibold text-sm">{name}</div>
      </div>
      <div tw="opacity-40 text-xs pr-5">
        &nbsp;
        {timestamp ? formatTimestampAsDate(timestamp) : null}
      </div>
    </div>
  );
};
