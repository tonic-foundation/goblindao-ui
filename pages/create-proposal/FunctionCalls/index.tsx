import React, { FC, useState } from 'react';
import Card from '@/components/common/Card';
import { Input } from '@/components/common/Input';
import { TokenInput } from '@/components/TokenInput';
import tokenService, { IToken } from '@/lib/services/near/tokenlist';
import { TONIC_CONTRACT_ID, GOBLIN_DAO_ID } from '@/config';
import { useSignTransaction } from '@/hooks/useSignTransaction';
import { SUPPORTED_TOKENS } from '@/components/TokenPickerModal';
import { useWalletSelector } from '@/state/containers/WalletSelectorContainer';
import Form, { FormAlert } from '@/components/common/Form';
import { SubmitOrLoginButton } from '@/components/SubmitOrLoginButton';
import { ProposalDescriptionTextArea } from '@/pages/create-proposal/content';
import { createProposalTransaction } from '@/lib/services/goblinDao/transactions';
import { decimalToBn, tgasAmount } from '@tonic-foundation/utils';
import { createProposalFunctionCallArgs } from '@/lib/services/goblinDao';
import { encode as base64_encode } from 'base-64';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { validateJSON } from '@/lib/util';
const DynamicAceEditor = dynamic(() => import('@/components/AceEditor'), {
  ssr: false,
});

const CreateProposalFunctionCalls: FC = () => {
  const { activeAccount } = useWalletSelector();
  const { theme } = useTheme();

  const [smartContract, setSmartContract] = useState(TONIC_CONTRACT_ID);
  // TODO fetch from the contract
  const [method, setMethod] = useState('mint_lp_near');
  const [description, setDescription] = useState('');
  const [depositToken] = useState<IToken>(SUPPORTED_TOKENS[0]);
  const [depositAmount, setDepositAmount] = useState<
    number | string | undefined
  >('');
  const [tGas, setTGas] = useState<number | string | undefined>(150);
  const [Json, setJson] = useState('{\n\n}');
  const [validJson, setValidJson] = useState(true);
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
          // const json = Json.replaceAll(/\n/g, '');
          const args = base64_encode(Json);
          return await wallet.signAndSendTransaction({
            receiverId: GOBLIN_DAO_ID,
            actions: [
              createProposalTransaction(
                GOBLIN_DAO_ID,
                createProposalFunctionCallArgs({
                  description,
                  gas: tgasAmount(+tGas),
                  receiver_id: smartContract,
                  args,
                  method_name: method,
                  deposit: amount,
                })
              ).toWalletSelectorAction(),
            ],
          });
        } finally {
          // ...
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

  const handleJson = (e: string) => {
    setJson(e);
    const jsonValid = validateJSON(e);
    setValidJson(jsonValid);
  };

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
          <div tw="flex items-center gap-2 mb-1">
            <label>JSON</label>
            {!validJson && (
              <FormAlert>
                <FormAlert.Label tw="items-center flex gap-1">
                  Provided JSON is not valid
                </FormAlert.Label>
              </FormAlert>
            )}
          </div>
          <div tw="flex flex-col">
            <DynamicAceEditor
              style={{
                marginTop: 10,
                background: 'transparent',
                color: theme === 'dark' ? 'white' : 'black',
              }}
              value={Json}
              highlightActiveLine={false}
              onChange={handleJson}
              onFocus={onJSONFocus}
              onBlur={onJSONBlur}
              name="proposal_json"
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
            // onChangeToken={setDepositToken}
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
          disabled={
            !depositAmount || !tGas || !smartContract || !method || !validJson
          }
          label="Submit a proposal"
          loadingLabel="Confirming"
          loading={submitting}
        />
      </Form.Body>
    </Form>
  );
};

export default CreateProposalFunctionCalls;
