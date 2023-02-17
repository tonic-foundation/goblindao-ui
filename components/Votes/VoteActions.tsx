import React, { FC, useState } from 'react';
import { ProposalFeedItem, VoteAction } from '@/lib/services/goblinDao/types';
import { getProposalPermissions } from '@/lib/services/goblinDao/helpers';
import { useWalletSelector } from '@/state/containers/WalletSelectorContainer';
import { useSignTransaction } from '@/hooks/useSignTransaction';
import { GOBLIN_DAO_ID } from '@/config';
import { voteProposalTransaction } from '@/lib/services/goblinDao/transactions';
import Card from '../common/Card';
import Button from '@/components/common/Button';
import Form from '@/components/common/Form';
import { SubmitOrLoginButton } from '@/components/SubmitOrLoginButton';
import Typography from '@/components/Typography';
import Icon from '@/components/common/Icon';
import { useTheme } from 'next-themes';

export type VoteProps = {
  proposal: ProposalFeedItem;
};

const VoteActions: FC<VoteProps> = ({ proposal }) => {
  const { accountId } = useWalletSelector();
  const permissions = getProposalPermissions(proposal, accountId || '');
  const [voteType, setVoteType] = useState<VoteAction | undefined>();

  const { theme } = useTheme();

  const timeLeft =
    new Date(proposal.votePeriodEnd).getTime() > new Date().getTime();

  const votedLiked = proposal.votes[accountId || ''] === 'Yes';
  const votedDisliked = proposal.votes[accountId || ''] === 'No';
  const voted = votedLiked || votedDisliked;

  const [submitting, handleSubmit] = useSignTransaction(
    async (wallet, activeAccount) => {
      if (
        activeAccount &&
        proposal &&
        timeLeft &&
        !voted &&
        voteType &&
        (voteType === 'VoteApprove'
          ? permissions.canApprove
          : permissions.canReject)
      ) {
        try {
          return await wallet.signAndSendTransaction({
            receiverId: GOBLIN_DAO_ID,
            actions: [
              voteProposalTransaction(GOBLIN_DAO_ID, {
                id: proposal.proposalId,
                action: voteType,
              }).toWalletSelectorAction(),
            ],
          });
        } finally {
          // ...
        }
      }
    },
    [accountId, proposal, timeLeft, voted, permissions, voteType]
  );

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Form.Body tw="p-0">
        <Card hasBody tw="items-center justify-center mx-auto w-full">
          <Card.Header tw="border-b-[1px] dark:border-neutral-700 border-neutral-200">
            <Typography.Heading tw="font-semibold">
              Cast your vote
            </Typography.Heading>
          </Card.Header>
          <div tw="p-5 flex flex-col gap-2">
            <Button
              onClick={() => !voted && setVoteType('VoteApprove')}
              type="button"
              variant="default"
              tw="w-full p-3 rounded-xl relative"
              style={{
                cursor: `${voted ? 'not-allowed' : 'pointer'}`,
                borderColor: `${
                  voteType === 'VoteApprove'
                    ? 'white'
                    : theme === 'dark'
                    ? '#3f3f46'
                    : '#e5e5e5'
                }`,
              }}
            >
              <span>Yes</span>
              {voteType === 'VoteApprove' && (
                <Icon.CheckMark tw="absolute top-4" />
              )}
            </Button>
            <Button
              onClick={() => !voted && setVoteType('VoteReject')}
              type="button"
              variant="default"
              tw="w-full p-3 rounded-xl relative"
              style={{
                cursor: `${voted ? 'not-allowed' : 'pointer'}`,
                borderColor: `${
                  voteType === 'VoteReject'
                    ? 'white'
                    : theme === 'dark'
                    ? '#3f3f46'
                    : '#e5e5e5'
                }`,
              }}
            >
              <span>No</span>
              {voteType === 'VoteReject' && (
                <Icon.CheckMark tw="absolute top-4" />
              )}
            </Button>
            <SubmitOrLoginButton
              disabled={voted}
              tw="w-full p-3 rounded-xl"
              label="Vote"
              loading={submitting}
              loadingLabel="Confirming"
            />
          </div>
        </Card>
      </Form.Body>
    </Form>
  );
};

export default VoteActions;
