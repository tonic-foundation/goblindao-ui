import React, { FC } from 'react';
import { theme } from 'twin.macro';

interface VotesProgressBarProps {
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
          backgroundColor: `${
            yes ? theme`colors.green.400` : theme`colors.red.600`
          }`,
        }}
      />
    </div>
  );
};
