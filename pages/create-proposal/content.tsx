import React, { FC, useState } from 'react';
import IconButton from '@/components/common/IconButton';
import Icon from '@/components/common/Icon';
import Typography from '@/components/Typography';
import { useRouter } from 'next/router';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import tw from 'twin.macro';
import Markdown from '@/components/common/Markdown';
import ListBox, { ListBoxProps } from '@/components/Listbox';
import { Input } from '@/components/common/Input';
import { TokenInput } from '@/components/TokenInput';
import tokenService, { IToken } from '@/lib/services/near/tokenlist';

const TextArea = tw.textarea`dark:bg-neutral-800 bg-white outline-none placeholder:(text-neutral-500 font-light) py-1.5`;
const TitleInput = tw.input`dark:bg-neutral-800 bg-white border-b border-solid border-neutral-300 text-lg outline-none placeholder:(text-neutral-500 font-light) mb-2 py-1.5`;
const textAreaPlaceholder = `## Summary\n\nInsert your summary here\n\n## Methodology\n\nInsert your methodology here\n\n## Conclusion\n\nInsert your conclusion here`;

const proposalTypes: ListBoxProps[] = [
  { name: 'Function Calls', value: 'FunctionCalls' },
  { name: 'Deposit', value: 'Deposit' },
];

export const SUPPORTED_TOKENS = tokenService.getAllTokens();

const Content: FC = () => {
  const router = useRouter();
  const [description, setDescription] = useState('');
  const [depositToken, setDepositToken] = useState<IToken>(SUPPORTED_TOKENS[0]);
  const [depositAmount, setDepositAmount] = useState<
    number | string | undefined
  >('');
  const [tGasAmount, setTGasAmount] = useState<number | string | undefined>(
    150
  );
  const [target, setTarget] = useState('');
  const [JSON, setJSON] = useState('');
  const [JSONFocused, setJSONFocused] = useState(false);
  const [descriptionFocused, setDescriptionFocused] = useState(false);
  const [titleFocused, setTitleFocused] = useState(false);
  // TODO make a separate hook or component
  const onJSONFocus = () => setJSONFocused(true);
  const onJSONBlur = () => setJSONFocused(false);
  const onDescriptionFocus = () => setDescriptionFocused(true);
  const onDescriptionBlur = () => setDescriptionFocused(false);
  const onTitleFocus = () => setTitleFocused(true);
  const onTitleBlur = () => setTitleFocused(false);

  const [selectedType, setSelectedType] = useState<ListBoxProps>(
    proposalTypes[0]
  );

  return (
    <div tw="flex flex-col min-w-[768px] max-w-[768px] mx-auto">
      {/* TODO Make a common component */}
      {/* ====== START ====== */}
      <div tw="flex items-center gap-4">
        <IconButton
          onClick={() => router.push('/governance')}
          tw="border w-9 h-9 text-neutral-600 dark:text-neutral-300"
          icon={<Icon.Back tw="w-5 h-5" />}
        />
        <Typography.Title>Create Proposal</Typography.Title>
      </div>
      {/* ====== END ====== */}
      <Card tw="bg-neutral-200 border-neutral-300 border-solid border-[0.5px] opacity-60 text-sm p-2 rounded-lg my-5">
        <span tw="font-semibold">Tip:</span> Add one or more proposal actions
        and describe your proposal for the community. The proposal cannot be
        modified after submission, so please verify all information before
        submitting. The voting period will begin after 2 days and last for 5
        days.
      </Card>
      <div tw="gap-4 flex flex-col">
        <ListBox
          selected={selectedType}
          setSelected={setSelectedType}
          list={proposalTypes}
        />
        {selectedType?.value === 'FunctionCalls' && (
          <>
            <div tw="flex gap-3">
              <Input tw="py-3 px-4" placeholder="Smart Contract Address" />
              <Input tw="py-3 px-4" placeholder="Method Name" />
            </div>
            <Card focused={JSONFocused} tw="opacity-70 text-sm rounded-lg">
              <div tw="flex flex-col">
                <label tw="mb-1">JSON</label>
              </div>
              <div tw="flex flex-col">
                <TextArea
                  placeholder="{}"
                  value={JSON}
                  onFocus={onJSONFocus}
                  onBlur={onJSONBlur}
                  onChange={(e) => setJSON(e.target.value)}
                />
              </div>
            </Card>
          </>
        )}
        <div tw="flex gap-3 w-full">
          <TokenInput
            tw="w-1/2"
            label={
              selectedType?.value === 'FunctionCalls' ? 'Deposit' : 'Amount'
            }
            id="deposit-input-amount"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e)}
            token={depositToken}
            onChangeToken={setDepositToken}
            step={Number.MIN_VALUE}
          />
          {selectedType?.value === 'FunctionCalls' ? (
            <div tw="relative w-1/2">
              <Input
                id="tGas-input-amount"
                value={tGasAmount}
                onChange={(e) => setTGasAmount(e.target.value)}
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
          ) : (
            <Input
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="Target"
              tw="px-4 py-3 w-1/2"
            />
          )}
        </div>
        <Card
          focused={descriptionFocused || titleFocused}
          tw="opacity-70 text-sm rounded-lg"
        >
          <div tw="flex flex-col">
            <label tw="mb-1">Proposal</label>
            <TitleInput
              onBlur={onTitleBlur}
              onFocus={onTitleFocus}
              placeholder="Proposal Title"
            />
          </div>
          <div tw="flex flex-col">
            <TextArea
              tw="min-h-[340px]"
              onBlur={onDescriptionBlur}
              onFocus={onDescriptionFocus}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={textAreaPlaceholder}
            />
          </div>
        </Card>
        {description && (
          <Card>
            <p tw="text-sm opacity-70">Preview</p>
            <Markdown>{description}</Markdown>
          </Card>
        )}
        <Button
          tw="opacity-90"
          onClick={() => alert('Submitted')}
          size="lg"
          variant="confirm"
        >
          Submit a proposal
        </Button>
      </div>
    </div>
  );
};

export default Content;
