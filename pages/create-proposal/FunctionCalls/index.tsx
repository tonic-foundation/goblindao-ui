import React, { FC, useState } from 'react';
import Card from '@/components/common/Card';
import { Input } from '@/components/common/Input';
import { TokenInput } from '@/components/TokenInput';
import tokenService, { IToken } from '@/lib/services/near/tokenlist';
import { TONIC_CONTRACT_ID } from '@/config';
import { useSignTransaction } from '@/hooks/useSignTransaction';
import { SUPPORTED_TOKENS } from '@/components/TokenPickerModal';
import { useWalletSelector } from '@/state/containers/WalletSelectorContainer';
import Form from '@/components/common/Form';
import { SubmitOrLoginButton } from '@/components/SubmitOrLoginButton';
import {
  ProposalDescriptionTextArea,
  TextArea,
} from '@/pages/create-proposal/content';
import { createProposalFunctionCall } from '@/lib/services/goblinDao/transactions';
import { decimalToBn, tgasAmount } from '@tonic-foundation/utils';

const CreateProposalFunctionCalls: FC = () => {
  const { activeAccount } = useWalletSelector();

  const [smartContract, setSmartContract] = useState(TONIC_CONTRACT_ID);
  // TODO fetch from the contract
  const [method, setMethod] = useState('mint_lp_near');
  const [description, setDescription] = useState('');
  const [depositToken, setDepositToken] = useState<IToken>(SUPPORTED_TOKENS[0]);
  const [depositAmount, setDepositAmount] = useState<
    number | string | undefined
  >('');
  const [tGas, setTGas] = useState<number | string | undefined>(150);
  const [Json, setJson] = useState('{\n\n}');
  const [JSONFocused, setJSONFocused] = useState(false);
  const onJSONFocus = () => setJSONFocused(true);
  const onJSONBlur = () => setJSONFocused(false);

  const [submitting, handleSubmit] = useSignTransaction(
    async (wallet) => {
      if (
        activeAccount &&
        description &&
        depositAmount &&
        depositToken &&
        smartContract &&
        method &&
        tGas
      ) {
        try {
          const token = tokenService.getToken(depositToken.address);
          const amount = decimalToBn(+depositAmount, token.decimals);
          return await wallet.signAndSendTransaction({
            actions: [
              createProposalFunctionCall(
                smartContract,
                method,
                amount,
                json,
                tGas
              ),
            ],
          });
        } finally {
          // Do something...
        }
      }
    },
    [
      smartContract,
      method,
      description,
      depositAmount,
      depositToken,
      Json,
      tGas,
    ]
  );

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Form.Body tw="p-0">
        <div tw="flex gap-3">
          <Input
            tw="py-3 px-4"
            value={smartContract}
            onChange={(e) => setSmartContract(e.target.value)}
            placeholder="Smart Contract Address"
          />
          <Input
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            tw="py-3 px-4"
            placeholder="Method Name"
          />
        </div>
        <Card focused={JSONFocused} tw="opacity-70 text-sm rounded-lg">
          <div tw="flex flex-col">
            <label tw="mb-1">JSON</label>
          </div>
          <div tw="flex flex-col">
            <TextArea
              tw="min-h-[70px]"
              placeholder="{}"
              value={Json}
              onFocus={onJSONFocus}
              onBlur={onJSONBlur}
              onChange={(e) => setJson(e.target.value)}
            />
          </div>
        </Card>
        <div tw="flex gap-3 w-full">
          <TokenInput
            tw="w-1/2"
            label="Deposit"
            id="deposit-input-amount"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e)}
            token={depositToken}
            onChangeToken={setDepositToken}
            step={Number.MIN_VALUE}
          />
          <div tw="relative w-1/2">
            <Input
              id="tGas-input-amount"
              value={tGas}
              onChange={(e) => setTGas(e.target.value)}
              placeholder="0.00"
              tw="text-right px-4 py-3 w-full"
            />
            <label
              htmlFor="tGas-input-amount"
              tw="absolute left-0 top-0 bottom-0 flex items-center justify-center pl-3"
            >
              <span tw="text-xs">TGas</span>
            </label>
          </div>
        </div>
        <ProposalDescriptionTextArea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
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

export default CreateProposalFunctionCalls;
