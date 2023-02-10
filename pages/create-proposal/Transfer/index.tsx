import React, { FC, useState } from 'react';
import { Input } from '@/components/common/Input';
import { TokenInput } from '@/components/TokenInput';
import tokenService, { IToken } from '@/lib/services/near/tokenlist';
import { useSignTransaction } from '@/hooks/useSignTransaction';
import { SUPPORTED_TOKENS } from '@/components/TokenPickerModal';
import { useWalletSelector } from '@/state/containers/WalletSelectorContainer';
import Form from '@/components/common/Form';
import { SubmitOrLoginButton } from '@/components/SubmitOrLoginButton';
import { ProposalDescriptionTextArea } from '@/pages/create-proposal/content';
import { createProposalTransaction } from '@/lib/services/goblinDao/transactions';
import { GOBLIN_DAO_ID } from '@/config';
import { createProposalTransferArgs } from '@/lib/services/goblinDao';
import { decimalToBn } from '@tonic-foundation/utils';

const CreateProposalTransfer: FC = () => {
  const { activeAccount } = useWalletSelector();

  const [description, setDescription] = useState('');
  const [transferToken, setTransferToken] = useState<IToken>(
    SUPPORTED_TOKENS[0]
  );
  const [transferAmount, setTransferAmount] = useState<
    number | string | undefined
  >('');
  const [transferTarget, setTransferTarget] = useState('');

  const [submitting, handleSubmit] = useSignTransaction(
    async (wallet) => {
      if (activeAccount && description && transferAmount && transferToken) {
        try {
          const token = tokenService.getToken(transferToken.address);
          const amount = decimalToBn(+transferAmount, token.decimals);
          return await wallet.signAndSendTransaction({
            receiverId: GOBLIN_DAO_ID,
            actions: [
              createProposalTransaction(
                GOBLIN_DAO_ID,
                createProposalTransferArgs({
                  description,
                  amount,
                  receiver_id: transferTarget,
                })
              ).toWalletSelectorAction(),
            ],
          });
        } finally {
          // ...
        }
      }
    },
    [description, transferAmount, transferTarget, transferToken]
  );

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      tw="min-w-[768px] max-w-[768px] mx-auto"
    >
      <Form.Body tw="p-0">
        <div tw="flex gap-3 w-full">
          <TokenInput
            tw="w-1/2"
            label="Amount"
            id="transfer-input-amount"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e)}
            token={transferToken}
            onChangeToken={setTransferToken}
            step={Number.MIN_VALUE}
          />
          <Input
            value={transferTarget}
            onChange={(e) => setTransferTarget(e.target.value)}
            placeholder="Target"
            tw="px-4 py-3 w-1/2"
          />
        </div>
        <ProposalDescriptionTextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <SubmitOrLoginButton
          label="Submit a proposal"
          loadingLabel="Confirming"
          loading={submitting}
        />
      </Form.Body>
    </Form>
  );
};

export default CreateProposalTransfer;
