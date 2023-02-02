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

const CreateProposalTextArea = tw.textarea`dark:bg-neutral-800 bg-white outline-none placeholder:(text-neutral-500 font-light) py-1.5`;
const CreateProposalInput = tw.input`dark:bg-neutral-800 bg-white border-b border-solid border-neutral-300 text-lg outline-none placeholder:(text-neutral-500 font-light) mb-2 py-1.5`;
const textAreaPlaceholder = `## Summary\n\nInsert your summary here\n\n## Methodology\n\nInsert your methodology here\n\n## Conclusion\n\nInsert your conclusion here`;

const proposalTypes: ListBoxProps[] = [
  { name: 'Function Calls', value: 'FunctionCalls' },
  { name: 'Deposit', value: 'deposit' },
];

export const SUPPORTED_TOKENS = tokenService.getAllTokens();

const Content: FC = () => {
  const router = useRouter();
  const [proposalDescription, setProposalDescription] = useState('');
  const [proposalDepositToken, setProposalDepositToken] = useState<IToken>(
    SUPPORTED_TOKENS[0]
  );
  const [proposalDepositAmount, setProposalDepositAmount] = useState<
    number | string | undefined
  >('');
  const [proposalJSON, setProposalJSON] = useState('');
  const [proposalJSONFocused, setProposalJSONFocused] = useState(false);
  const [proposalDescriptionFocused, setProposalDescriptionFocused] =
    useState(false);
  const [proposalTitleFocused, setProposalTitleFocused] = useState(false);
  // TODO make a separate hook or component
  const onProposalJSONFocus = () => setProposalJSONFocused(true);
  const onProposalJSONBlur = () => setProposalJSONFocused(false);
  const onProposalDescriptionFocus = () => setProposalDescriptionFocused(true);
  const onProposalDescriptionBlur = () => setProposalDescriptionFocused(false);

  const onProposalTitleFocus = () => setProposalTitleFocused(true);
  const onProposalTitleBlur = () => setProposalTitleFocused(false);

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
        <div tw="flex gap-3">
          <Input tw="py-3 px-4" placeholder="Smart Contract Address" />
          <Input tw="py-3 px-4" placeholder="Method Name" />
        </div>
        <Card focused={proposalJSONFocused} tw="opacity-70 text-sm rounded-lg">
          <div tw="flex flex-col">
            <label tw="mb-1">JSON</label>
          </div>
          <div tw="flex flex-col">
            <CreateProposalTextArea
              placeholder="{}"
              value={proposalJSON}
              onFocus={onProposalJSONFocus}
              onBlur={onProposalJSONBlur}
              onChange={(e) => setProposalJSON(e.target.value)}
            />
          </div>
        </Card>
        <div tw="flex gap-3">
          <TokenInput
            tw="w-[50%]"
            label="Deposit"
            id="deposit-input-amount"
            value={proposalDepositAmount}
            onChange={(e) => setProposalDepositAmount(e)}
            token={proposalDepositToken}
            onChangeToken={setProposalDepositToken}
            step={Number.MIN_VALUE}
          />
          <Input tw="py-3 px-4 w-1/2" placeholder="Method Name" />
        </div>
        <Card
          focused={proposalDescriptionFocused || proposalTitleFocused}
          tw="opacity-70 text-sm rounded-lg"
        >
          <div tw="flex flex-col">
            <label tw="mb-1">Proposal</label>
            <CreateProposalInput
              onBlur={onProposalTitleBlur}
              onFocus={onProposalTitleFocus}
              placeholder="Proposal Title"
            />
          </div>
          <div tw="flex flex-col">
            <CreateProposalTextArea
              tw="min-h-[340px]"
              onBlur={onProposalDescriptionBlur}
              onFocus={onProposalDescriptionFocus}
              value={proposalDescription}
              onChange={(e) => setProposalDescription(e.target.value)}
              placeholder={textAreaPlaceholder}
            />
          </div>
        </Card>
        {proposalDescription && (
          <Card>
            <p tw="text-sm opacity-70">Preview</p>
            <Markdown>{proposalDescription}</Markdown>
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
