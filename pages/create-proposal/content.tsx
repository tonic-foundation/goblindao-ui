import React, { ChangeEvent, FC, useState } from 'react';
import IconButton from '@/components/common/IconButton';
import Icon from '@/components/common/Icon';
import Typography from '@/components/Typography';
import { useRouter } from 'next/router';
import Card from '@/components/common/Card';
import tw from 'twin.macro';
import ListBox, { ListBoxProps } from '@/components/Listbox';
import CreateProposalFunctionCalls from '@/pages/create-proposal/FunctionCalls';
import CreateProposalTransfer from '@/pages/create-proposal/Transfer';
import Markdown from '@/components/common/Markdown';

export const TextArea = tw.textarea`dark:bg-neutral-800 bg-white outline-none placeholder:(text-neutral-500 font-light) py-1.5`;
export const descriptionTextAreaPlaceholder = `## Summary\n\nInsert your summary here\n\n## Methodology\n\nInsert your methodology here\n\n## Conclusion\n\nInsert your conclusion here`;

const proposalTypes: ListBoxProps[] = [
  { name: 'Function Calls', value: 'FunctionCalls' },
  { name: 'Transfer', value: 'Transfer' },
];

export const ProposalDescriptionTextArea: FC<{
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => unknown;
}> = ({ value, onChange }) => {
  const [descriptionFocused, setDescriptionFocused] = useState(false);

  const onDescriptionFocus = () => setDescriptionFocused(true);
  const onDescriptionBlur = () => setDescriptionFocused(false);

  return (
    <>
      <Card focused={descriptionFocused} tw="opacity-70 text-sm rounded-lg">
        <div tw="flex flex-col">
          <label tw="mb-4">Description</label>
        </div>
        <div tw="flex flex-col">
          <TextArea
            tw="min-h-[200px]"
            onBlur={onDescriptionBlur}
            onFocus={onDescriptionFocus}
            value={value}
            onChange={onChange}
            placeholder={descriptionTextAreaPlaceholder}
          />
        </div>
      </Card>
      {value && (
        <Card>
          <p tw="text-sm opacity-70">Preview</p>
          <Markdown>{value}</Markdown>
        </Card>
      )}
    </>
  );
};

export const Content: FC = () => {
  const router = useRouter();

  const [selectedType, setSelectedType] = useState<ListBoxProps>(
    proposalTypes[0]
  );

  return (
    <div tw="flex flex-col min-w-[768px] max-w-[768px] mx-auto">
      <div tw="flex items-center gap-4">
        <IconButton
          onClick={() => router.push('/governance')}
          tw="border w-9 h-9 text-neutral-600 dark:text-neutral-300"
          icon={<Icon.Back tw="w-5 h-5" />}
        />
        <Typography.Title>Create Proposal</Typography.Title>
      </div>
      <Card tw="bg-neutral-200 border-neutral-300 border-solid border-[0.5px] opacity-60 text-sm p-2 rounded-lg my-5">
        <span tw="font-semibold">Tip:</span> Add one or more proposal actions
        and describe your proposal for the community. The proposal cannot be
        modified after submission, so please verify all information before
        submitting. The voting period will begin after 2 days and last for 5
        days.
      </Card>
      <ListBox
        selected={selectedType}
        setSelected={setSelectedType}
        list={proposalTypes}
      />
      <div tw="mt-4">
        {selectedType.value === 'FunctionCalls' ? (
          <CreateProposalFunctionCalls />
        ) : selectedType?.value === 'Transfer' ? (
          <CreateProposalTransfer />
        ) : null}
      </div>
    </div>
  );
};

export default Content;
