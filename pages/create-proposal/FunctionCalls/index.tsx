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
import { validateJSON } from '@/lib/util';
import ListBox, { ListBoxItemsProps } from '@/components/Listbox';
import useNearContractMethods from '@/hooks/useNearContractMethods';
import useDebounce from '@/hooks/useDebounce';
const DynamicAceEditor = dynamic(() => import('@/components/AceEditor'), {
  ssr: false,
});

const CreateProposalFunctionCalls: FC = () => {
  const { activeAccount } = useWalletSelector();

  const [smartContract, setSmartContract] = useState(TONIC_CONTRACT_ID);
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

  const debouncedSmartContract = useDebounce(smartContract);
  const contractMethodList = useNearContractMethods(debouncedSmartContract);
  const [selectedMethod, setSelectedMethod] = useState<ListBoxItemsProps>({
    name: 'Select Method',
    value: '',
  });

  const [submitting, handleSubmit] = useSignTransaction(
    async (wallet) => {
      if (
        activeAccount &&
        description &&
        depositAmount &&
        depositToken &&
        smartContract &&
        selectedMethod &&
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
                  method_name: selectedMethod.value,
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
      selectedMethod,
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
        <div tw="flex items-center gap-3.5 w-full">
          <Input
            tw="py-3 px-4 w-1/2"
            value={smartContract}
            onChange={(e) => setSmartContract(e.target.value)}
            placeholder="Smart Contract Address"
          />
          <ListBox
            tw="w-1/2 h-[46px]"
            selected={selectedMethod}
            setSelected={setSelectedMethod}
            list={contractMethodList || []}
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
          <div tw="flex flex-col text-white">
            <DynamicAceEditor
              tw="m-2 text-white"
              style={{ color: 'white' }}
              value={Json}
              highlightActiveLine={false}
              onChange={handleJson}
              onFocus={onJSONFocus}
              onBlur={onJSONBlur}
              name="proposal_json"
            />
          </div>
        </Card>
        <div tw="flex gap-3.5 w-full">
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
            !depositAmount ||
            !tGas ||
            !smartContract ||
            !selectedMethod.value ||
            !validJson
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
