import React, { FC } from 'react';
import IconButton from '@/components/common/IconButton';
import Icon from '@/components/common/Icon';
import Typography from '@/components/Typography';
import { ProposalsStatus } from '@/components/Proposals';
import { ProposalProps } from '@/components/Proposals/Proposal';
import { useRouter } from 'next/router';

const ProposalHeading: FC<{ proposal: ProposalProps }> = ({ proposal }) => {
  const router = useRouter();

  return (
    <div tw="mb-10 flex gap-3">
      <div>
        <IconButton
          onClick={() => router.push('/governance')}
          tw="border w-9 h-9 text-neutral-600 dark:text-neutral-300"
          icon={<Icon.Back tw="w-5 h-5" />}
        />
      </div>
      <div>
        <div tw="flex flex-row gap-3 items-center mb-4">
          <Typography.Heading tw="text-neutral-500">
            Proposal {proposal.id}
          </Typography.Heading>
          <ProposalsStatus status={proposal.status} />
        </div>
        <Typography.Title tw="mb-3">{proposal.title}</Typography.Title>
        <Typography.Subheading tw="mb-2 text-neutral-500 font-semibold">
          Proposed by{' '}
          <a
            href=""
            target="_blank"
            tw="text-brand-400 underline cursor-pointer"
          >
            {proposal.proposer}
          </a>{' '}
          at{' '}
          <a
            href=""
            target="_blank"
            tw="text-brand-400 underline cursor-pointer"
          >
            {proposal.transactionHash}
          </a>
        </Typography.Subheading>
      </div>
    </div>
  );
};

export default ProposalHeading;
