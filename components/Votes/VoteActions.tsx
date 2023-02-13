import { ProposalAction, ProposalStatus } from '@/lib/services/goblinDao/types';
import React, { FC } from 'react';
import { getExplorerUrl } from '@/config';
import Link from 'next/link';
import Icon from '@/components/common/Icon';
import Tooltip from '@/components/common/Tooltip';

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
    <div style={{ left: position }} tw="absolute">
      <Tooltip anchorId={date} place="top">
        <div tw="text-center">
          <span>{name}</span>
          <br />
          <span tw="text-sm">{date}</span>
          <br />
          <span tw="text-xs">Click to open in Explorer</span>
        </div>
      </Tooltip>

      <Link id={date} href={explorerLink} rel="noreferrer" target="_blank">
        {type === 'VoteApprove' ? <Icon.Like /> : <Icon.Dislike />}
      </Link>
    </div>
  );
};

interface FinishProposalProps {
  status: ProposalStatus;
}

export const FinishProposal: FC<FinishProposalProps> = ({
  status = 'Active',
}) => (
  <div>
    {status !== 'Active' ? (
      <>
        {status === 'Approved' ? <Icon.Checked /> : <Icon.AiClock />}
        <div>{status === 'InProgress' ? '' : status} </div>
      </>
    ) : null}
  </div>
);
