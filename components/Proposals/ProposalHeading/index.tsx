import React, { FC } from 'react';
import IconButton from '@/components/common/IconButton';
import Icon from '@/components/common/Icon';
import Typography from '@/components/Typography';
import { ProposalsStatus } from '@/components/Proposals';
import { useRouter } from 'next/router';
import { getExplorerUrl } from '@/config';
// import { useIsMobile } from '@/hooks/useIsMobile';
import { abbreviateCryptoString } from '@/lib/util';
import { Proposal } from '@/lib/services/goblinDao/types';

const ProposalHeading: FC<{ proposal: Proposal }> = ({ proposal }) => {
  const router = useRouter();
  // const isMobile = useIsMobile();

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
        <Typography.Title tw="mb-3">{proposal.type}</Typography.Title>
        <Typography.Heading tw="mb-2 text-neutral-500 font-semibold">
          Proposed by{' '}
          <a
            rel="noreferrer"
            href=""
            target="_blank"
            tw="text-brand-400 underline cursor-pointer"
          >
            {proposal.proposer}
          </a>{' '}
          at {/* TODO not sure if this is correct url*/}
          <a
            rel="noreferrer"
            href={getExplorerUrl(
              'transaction',
              proposal.transactionHash || proposal.updateTransactionHash
            )}
            target="_blank"
            tw="text-brand-400 underline cursor-pointer"
          >
            {proposal.transactionHash
              ? abbreviateCryptoString(proposal.transactionHash, 16, 3)
              : proposal.updateTransactionHash
              ? abbreviateCryptoString(proposal.updateTransactionHash, 16, 3)
              : null}
          </a>
        </Typography.Heading>
      </div>
    </div>
  );
};

export default ProposalHeading;
