import React, { FC } from 'react';
import { Vote } from '@/lib/services/goblinDao/types';
import Icon from '@/components/common/Icon';
import { abbreviateCryptoString, formatTimestampAsDate } from '@/lib/util';
import Card from '../common/Card';
import { getExplorerUrl } from '@/config';

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
  const renderIcon = (vote: Vote | null, isLastVote: boolean) => {
    // const CheckedIcon = () => (
    //   <Icon.Checked tw="w-4 h-5 bg-white rounded-full absolute right-1 top-1.5 text-success-500" />
    // );
    switch (vote) {
      case 'Yes': {
        return (
          <div tw="relative p-3 bg-success-500 bg-opacity-10 rounded-lg">
            <Icon.Like tw="w-6 h-6 text-success-500" />
            {/*{isLastVote && <CheckedIcon />}*/}
          </div>
        );
      }
      case 'No': {
        return (
          <div tw="relative p-3 bg-danger-500 bg-opacity-10 rounded-lg">
            <Icon.Dislike tw="w-6 h-6 text-danger-500" />
            {/*{isLastVote && <CheckedIcon />}*/}
          </div>
        );
      }
      case 'Dismiss': {
        return (
          <div tw="relative p-3 bg-danger-500 bg-opacity-10 rounded-lg">
            <Icon.Trash tw="w-6 h-6 text-danger-500" />
            {/*{isLastVote && <CheckedIcon />}*/}
          </div>
        );
      }
      default: {
        return (
          <div tw="relative p-3 bg-brand-600 bg-opacity-5 rounded-lg">
            <Icon.Vote tw="w-6 h-6 text-brand-600" />
            {/*{isLastVote && <CheckedIcon />}*/}
          </div>
        );
      }
    }
  };

  return (
    <Card tw="flex items-center justify-between mb-2">
      <div tw="flex items-center gap-4">
        {renderIcon(vote, isLastVote)}
        <div tw="font-semibold text-sm">{abbreviateCryptoString(name, 22)}</div>
      </div>
      <div tw="text-xs pr-5 flex items-center gap-10">
        &nbsp;
        <span tw="opacity-40">
          {timestamp ? formatTimestampAsDate(timestamp) : null}
        </span>
        <a
          rel="noreferrer"
          href={getExplorerUrl('transaction', transactionHash || '')}
          target="_blank"
          tw="text-brand-400 underline cursor-pointer"
        >
          <Icon.Link tw="w-4 h-4 text-brand-600 cursor-pointer" />
        </a>
      </div>
    </Card>
  );
};
