import { ProposalAction } from '@/lib/services/goblinDao/types';
import React, { FC } from 'react';
import { getExplorerUrl } from '@/config';
import Link from 'next/link';
import Icon from '@/components/common/Icon';
import Tooltip from '@/components/common/Tooltip';
import { abbreviateCryptoString } from '@/lib/util';

export type VoteActionProps = {
  type: ProposalAction;
  position: string;
  date: string;
  name: string;
  hash?: string;
};

export const VoteAction: FC<VoteActionProps> = ({
  type,
  position,
  date,
  name,
  hash,
}) => {
  const explorerLink = hash ? getExplorerUrl('transaction', hash) : '';

  return (
    <div tw="absolute top-[-17px]" style={{ left: position }}>
      <Tooltip anchorId={date} place="top">
        <div tw="text-center">
          <span>{abbreviateCryptoString(name, 22)}</span>
          <br />
          <span tw="text-sm">{date}</span>
          <br />
          <span tw="text-xs">Click to open in Explorer</span>
        </div>
      </Tooltip>

      <Link id={date} href={explorerLink} rel="noreferrer" target="_blank">
        {type === 'VoteApprove' ? (
          <div tw="bg-white dark:bg-neutral-900">
            <div tw="p-[4px] bg-success-500 rounded-full bg-opacity-10 border border-success-500">
              <Icon.Like tw="w-5 h-5 text-success-500" />
            </div>
          </div>
        ) : (
          <div tw="bg-white dark:bg-neutral-900">
            <div tw="p-[4px] bg-danger-500 rounded-full bg-opacity-10 border border-danger-500">
              <Icon.Dislike tw="w-5 h-5 text-danger-500" />
            </div>
          </div>
        )}
      </Link>
    </div>
  );
};
