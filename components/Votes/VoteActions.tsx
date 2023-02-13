import { ProposalAction, ProposalStatus } from '@/lib/services/goblinDao/types';
import React, { FC } from 'react';
import { getExplorerUrl } from '@/config';
import Link from 'next/link';
import Icon from '@/components/common/Icon';

export type VoteActionProps = {
  type: ProposalAction;
  position: string;
  date: string;
  name: string;
  hash?: string;
};

export const VoteAction: FC<VoteActionProps> = ({
  type,
  position = '0',
  date,
  name,
  hash,
}) => {
  const explorerLink = hash ? getExplorerUrl('transaction', hash) : '';

  return (
    <div style={{ left: position }}>
      <span>
        {name}
        <br />
        {date}
        <br />
        <span>Click to open in Explorer</span>
      </span>
      <Link href={explorerLink} rel="noreferrer" target="_blank">
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
