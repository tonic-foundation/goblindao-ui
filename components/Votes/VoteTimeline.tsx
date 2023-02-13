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
        <div tw="">
          <Icon.Checked />
        </div>
        <div tw="text-sm bottom-[-24px] left-0 absolute whitespace-nowrap	">
          Creating proposal
        </div>
      </div>
      <div
        tw="border h-[1px] relative w-[864px]"
        style={{ width: `${total * POINT}px` }}
      >
        <div
          tw="bg-success-500 h-[4px] left-0 absolute top-[50%] translate-y-2/4"
          style={{
            width:
              proposal.voteStatus === 'Expired' ? '100%' : `${lastVote.left}px`,
          }}
        />
        {/*<ExtraActions actions={extraActions} />*/}
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
