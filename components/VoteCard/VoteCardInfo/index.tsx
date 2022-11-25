import React, { FC } from 'react';
import Card from '@/components/common/Card';

const VoteCardInfo: FC<{
  infoTitle: string;
  infoSubtitle: string;
  info: string | number;
}> = ({ infoSubtitle, info, infoTitle, ...props }) => {
  return (
    <Card hover="pointer" tw="justify-between flex items-center" {...props}>
      <p tw="font-semibold text-neutral-500 dark:text-neutral-400">
        {infoTitle}
      </p>
      <div tw="flex flex-col justify-end text-right gap-1">
        <p tw="text-sm text-neutral-400 dark:text-neutral-300 font-light">
          {infoSubtitle}
        </p>
        <p tw="font-semibold">{info}</p>
      </div>
    </Card>
  );
};

export default VoteCardInfo;
