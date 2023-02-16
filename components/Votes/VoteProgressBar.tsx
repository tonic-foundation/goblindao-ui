import React, { FC } from 'react';
import { VoterDetail } from '@/lib/services/goblinDao/types';

interface VotesProgressBarProps {
  votes: VoterDetail[];
  width?: number;
  yes?: boolean;
}

export const VotesProgressBar: FC<VotesProgressBarProps> = ({
  width = 0,
  yes = false,
}) => {
  return (
    <div tw="flex items-center rounded-[80px] overflow-hidden w-full h-[8px] bg-neutral-300">
      <div
        tw="rounded-tr-[80px] h-[8px] rounded-br-[80px]"
        style={{
          width: `${width}%`,
          backgroundColor: `${yes ? '#a3e635' : '#CA3A31'}`,
        }}
      />
    </div>
  );
};
