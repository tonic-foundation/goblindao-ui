import React, { FC, useState } from 'react';
import IconButton from '@/components/common/IconButton';
import Icon from '@/components/common/Icon';
import Typography from '@/components/Typography';
import { useRouter } from 'next/router';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import tw from 'twin.macro';
import Markdown from '@/components/common/Markdown';
import Radio from '@/components/common/radio';

const CreateProposalTextArea = tw.textarea`outline-none min-h-[340px] placeholder:(text-neutral-500 font-light) py-1.5`;
const CreateProposalInput = tw.input`border-b border-solid border-neutral-300 text-lg outline-none placeholder:(text-neutral-500 font-light) mb-2 py-1.5`;
const textAreaPlaceholder = `## Summary\n\nInsert your summary here\n\n## Methodology\n\nInsert your methodology here\n\n## Conclusion\n\nInsert your conclusion here`;

const Content: FC = () => {
  const router = useRouter();
  const [proposalBody, setProposalBody] = useState('');

  return (
    <div tw="mb-10 flex flex-col gap-5 min-w-[768px] max-w-[768px] mx-auto">
      <div tw="flex items-center gap-4">
        <IconButton
          onClick={() => router.push('/governance')}
          tw="border w-9 h-9 text-neutral-600 dark:text-neutral-300"
          icon={<Icon.Back tw="w-5 h-5" />}
        />
        <Typography.Title>Create Proposal</Typography.Title>
      </div>
      <Card tw="bg-neutral-200 border-neutral-300 border-solid opacity-70 text-sm">
        <span tw="font-semibold">Tip:</span> Add one or more proposal actions
        and describe your proposal for the community. The proposal cannot be
        modified after submission, so please verify all information before
        submitting. The voting period will begin after 2 days and last for 5
        days.
      </Card>
      {/*<Button*/}
      {/*  onClick={() => alert('No actions yet')}*/}
      {/*  size="lg"*/}
      {/*  variant="confirm"*/}
      {/*>*/}
      {/*  Add Action*/}
      {/*</Button>*/}
      <Radio value="FunctionCalls" label="Function Calls" />
      <Card tw="border-neutral-300 border-solid opacity-70 text-sm">
        <div tw="flex flex-col">
          <label tw="mb-1">Proposal</label>
          <CreateProposalInput placeholder="Proposal Title" />
        </div>
        <div tw="flex flex-col">
          <CreateProposalTextArea
            value={proposalBody}
            onChange={(e) => setProposalBody(e.target.value)}
            placeholder={textAreaPlaceholder}
          />
        </div>
      </Card>
      {proposalBody && (
        <Card>
          <p tw="text-sm opacity-70">Preview</p>
          <Markdown>{proposalBody}</Markdown>
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
  );
};

export default Content;
