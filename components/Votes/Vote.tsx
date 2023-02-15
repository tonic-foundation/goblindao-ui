import React, { FC, useCallback } from 'react';
import Icon from '@/components/common/Icon';
import { ProposalFeedItem, VoteAction } from '@/lib/services/goblinDao/types';
import IconButton from '@/components/common/IconButton';
import { getProposalPermissions } from '@/lib/services/goblinDao/helpers';
import { useWalletSelector } from '@/state/containers/WalletSelectorContainer';
import { useSignTransaction } from '@/hooks/useSignTransaction';
import { GOBLIN_DAO_ID } from '@/config';
import { voteProposalTransaction } from '@/lib/services/goblinDao/transactions';
import { Wallet } from '@near-wallet-selector/core';

export type VoteProps = {
  proposal: ProposalFeedItem;
};

const Vote: FC<VoteProps> = ({ proposal }) => {
  const { accountId } = useWalletSelector();
  const permissions = getProposalPermissions(proposal, accountId || '');
  const { canApprove, canReject } = permissions;

  const timeLeft =
    new Date(proposal.votePeriodEnd).getTime() > new Date().getTime();

  const votedLiked = proposal.votes[accountId || ''] === 'Yes';
  const votedDisliked = proposal.votes[accountId || ''] === 'No';
  const voted = votedLiked || votedDisliked;

  const doTransaction = useCallback(
    async (vote: VoteAction, wallet: Wallet) => {
      if (
        accountId &&
        proposal &&
        timeLeft &&
        !voted &&
        (vote === 'VoteApprove'
          ? permissions.canApprove
          : permissions.canReject)
      ) {
        try {
          return await wallet.signAndSendTransaction({
            receiverId: GOBLIN_DAO_ID,
            actions: [
              voteProposalTransaction(GOBLIN_DAO_ID, {
                id: proposal.proposalId,
                action: vote,
              }).toWalletSelectorAction(),
            ],
          });
        } finally {
          // ...
        }
      }
    },
    [accountId, proposal, timeLeft, voted, permissions]
  );

  const [, handleSubmitVoteApprove] = useSignTransaction(
    async (wallet) => {
      return await doTransaction('VoteApprove', wallet);
    },
    [doTransaction]
  );

  const [, handleSubmitVoteReject] = useSignTransaction(
    async (wallet) => {
      return await doTransaction('VoteReject', wallet);
    },
    [doTransaction]
  );

  return (
    <div tw="flex gap-3 items-center justify-center">
      <div tw="flex flex-col items-center gap-1">
        <div tw="p-3 cursor-pointer bg-success-500 rounded-full bg-opacity-10 border border-success-500">
          <IconButton
            disabled={!timeLeft || !canApprove || votedLiked || votedDisliked}
            onClick={() => handleSubmitVoteApprove()}
            icon={<Icon.Like tw="w-7 h-7 text-success-500" />}
          />
        </div>
        <span tw="font-semibold">{proposal.voteYes}</span>
      </div>
      <div tw="flex flex-col items-center gap-1">
        <div tw="p-3 cursor-pointer bg-danger-500 rounded-full bg-opacity-10 border border-danger-500">
          <IconButton
            disabled={!canReject || !timeLeft || votedDisliked || votedLiked}
            onClick={() => handleSubmitVoteReject()}
            icon={<Icon.Dislike tw="w-7 h-7 text-danger-500" />}
          />
        </div>
        <span tw="font-semibold">{proposal.voteNo}</span>
      </div>
    </div>
  );
};

export default Vote;
