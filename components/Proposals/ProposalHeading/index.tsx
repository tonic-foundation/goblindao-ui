import React, { FC } from 'react';
import IconButton from '@/components/common/IconButton';
import Icon from '@/components/common/Icon';
import Typography from '@/components/Typography';
import { ProposalsStatus } from '@/components/Proposals';
import { useRouter } from 'next/router';
import { getExplorerUrl } from '@/config';
// import { useIsMobile } from '@/hooks/useIsMobile';
import { abbreviateCryptoString } from '@/lib/util';
import { ProposalFeedItem } from '@/lib/services/goblinDao/types/proposal';

const ProposalHeading: FC<{ proposal: ProposalFeedItem }> = ({ proposal }) => {
  const router = useRouter();
  // const isMobile = useIsMobile();

  return (
    <div tw="mb-10 flex flex-col gap-6">
      <div tw="flex items-center gap-3">
        <IconButton
          onClick={() => router.push('/governance')}
          tw="border w-9 h-9 text-neutral-600 dark:text-neutral-300"
          icon={<Icon.Back tw="w-5 h-5" />}
        />
        <span>Back</span>
      </div>
      <div tw="flex items-center gap-3">
        <ProposalsStatus status={proposal.status} />
        <Typography.Label tw="text-neutral-500 font-semibold">
          Proposed by{' '}
          <a
            rel="noreferrer"
            href=""
            target="_blank"
            tw="text-brand-400 underline cursor-pointer"
          >
            {abbreviateCryptoString(proposal.proposer, 14, 4)}
          </a>{' '}
          at{' '}
          <a
            rel="noreferrer"
            href={getExplorerUrl('transaction', proposal.txHash)}
            target="_blank"
            tw="text-brand-400 underline cursor-pointer"
          >
            {proposal.txHash
              ? abbreviateCryptoString(proposal.txHash, 16, 3)
              : null}
          </a>
        </Typography.Label>
      </div>
      {/*<div>*/}
      {/*  <div tw="flex flex-row gap-3 items-center mb-4">*/}
      {/*    <Typography.Heading tw="text-neutral-500">*/}
      {/*      Proposal {proposal.id}*/}
      {/*    </Typography.Heading>*/}
      {/*    <ProposalsStatus status={proposal.status} />*/}
      {/*  </div>*/}
      {/*  <Typography.Title tw="mb-3">{proposal.kind.type}</Typography.Title>*/}
      {/*</div>*/}
    </div>
  );
};

export default ProposalHeading;
