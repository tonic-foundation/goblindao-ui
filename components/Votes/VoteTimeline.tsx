import React, { FC, useRef, useState } from 'react';
import { POINT, TOTAL, useTimelineData } from '@/hooks/useTimelineData';
import { useWindowResize } from '@/hooks/useWindowResize';
import Icon from '@/components/common/Icon';
import { formatTimestampAsDate } from '@/lib/util';
import {
  ProposalActionData,
  ProposalFeedItem,
  ProposalStatus,
} from '@/lib/services/goblinDao/types';
import { VoteAction } from '@/components/Votes/VoteActions';
import { css } from 'twin.macro';

interface FinishProposalProps {
  status: ProposalStatus;
}
export const FinishProposal: FC<FinishProposalProps> = ({
  status = 'Active',
}) => (
  <div tw="relative">
    {status !== 'Active' ? (
      <>
        <div
          css={css`
            & {
              background-color: ${status === 'Approved'
                ? '#15B97E'
                : '#CA3A31'};
            }
          `}
          tw="rounded-full p-1"
        >
          {status === 'Approved' ? (
            <Icon.Checked tw="w-6 h-6 text-white" />
          ) : (
            <Icon.FiClock tw="w-6 h-6 text-white" />
          )}
        </div>
        <div tw="text-sm bottom-[-34px] right-0 absolute whitespace-nowrap">
          <span tw="opacity-70">{status === 'InProgress' ? '' : status} </span>
        </div>
      </>
    ) : null}
  </div>
);

export type ExtraActionsProps = {
  actions: ProposalActionData[];
};
export const ExtraActions: FC<ExtraActionsProps> = ({ actions }) => {
  if (!actions.length) {
    return null;
  }

  return (
    <div>
      <ul>
        {actions.map((action) => (
          <li key={action.id}>
            {action.action === 'VoteApprove' ? <Icon.Like /> : <Icon.Dislike />}
            <div>{action.accountId}</div>
            <div>{formatTimestampAsDate(action.timestamp)}</div>
          </li>
        ))}
      </ul>
      <div>{actions.length}</div>
    </div>
  );
};

interface VoteTimelineProps {
  proposal: ProposalFeedItem;
}
const VoteTimeline: FC<VoteTimelineProps> = ({ proposal }) => {
  const [total, setTotal] = useState(TOTAL);
  const timeLineRef = useRef<HTMLDivElement>(null);

  useWindowResize(() => {
    if (timeLineRef.current) {
      const totalValue = Math.floor(
        (timeLineRef.current?.clientWidth - 2 * POINT) / POINT
      );

      setTotal(totalValue < 0 ? 0 : totalValue);
    }
  });

  const { extraActions, lastVote, voteActions } = useTimelineData(
    proposal,
    total
  );

  return (
    <div ref={timeLineRef} tw="items-center flex h-[60px] relative">
      <div tw="flex flex-col relative">
        <div tw="bg-success-500 rounded-full p-1">
          <Icon.Checked tw="w-6 h-6 text-white" />
        </div>
        <div tw="text-sm bottom-[-34px] left-0 absolute whitespace-nowrap">
          <span tw="opacity-70">Creating proposal</span>
        </div>
      </div>
      <div
        tw="border-t border-dashed border-neutral-400 h-[1px] relative"
        style={{ width: `${total * POINT}px` }}
      >
        <div
          css={css`
            & {
              background-color: ${proposal.status === 'Rejected' ||
              proposal.voteStatus === 'Expired'
                ? ''
                : '#15B97E'};
            }
          `}
          tw="h-[4px] left-0 absolute top-[-4px] translate-y-2/4"
          style={{
            width:
              proposal.voteStatus === 'Expired' ? '100%' : `${lastVote.left}px`,
          }}
        />
        <ExtraActions actions={extraActions} />
        {voteActions
          .filter((voteAction) => voteAction.action)
          .map((voteAction) => (
            <VoteAction
              key={`${voteAction.action?.id}_${voteAction.action?.accountId}`}
              type={voteAction.action?.action || 'VoteApprove'}
              position={`${voteAction.left}px`}
              date={
                voteAction?.action?.timestamp
                  ? formatTimestampAsDate(voteAction.action.timestamp)
                  : ''
              }
              name={voteAction?.action?.accountId || ''}
              hash={voteAction?.action?.transactionHash}
            />
          ))}
      </div>

      <FinishProposal
        status={proposal.voteStatus !== 'Expired' ? proposal.status : 'Expired'}
      />
    </div>
  );
};

export default VoteTimeline;
