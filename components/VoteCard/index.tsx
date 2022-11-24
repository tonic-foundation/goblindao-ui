import { FC } from 'react';
import Card from '@/components/common/Card';
import { ProposalProps } from '@/components/Proposals/Proposal';
import ProgressBar from '@/components/common/ProgressBar';
import { truncateToLocaleString } from '@/lib/util';
import VoteCardHeading, {
  VoteCardHeadingVariantsTypes,
} from '@/components/VoteCard/VoteCardHeading';

export enum VoteCardVariant {
  FOR,
  AGAINST,
  ABSTAIN,
}

type VoteCardProps = {
  proposal: ProposalProps;
  percentage: number;
  variant: VoteCardVariant;
  goblinIds?: Array<string>;
};
const VoteCard: FC<VoteCardProps> = (props) => {
  const { variant, proposal, percentage } = props;

  const voteCardVariant = (
    v: VoteCardVariant
  ): {
    title: string;
    voteCount: number;
    variant?: VoteCardHeadingVariantsTypes;
  } => {
    switch (v) {
      case VoteCardVariant.FOR:
        return {
          title: 'For',
          variant: 'success',
          voteCount: proposal.forCount,
        };

      case VoteCardVariant.AGAINST:
        return {
          title: 'Against',
          variant: 'danger',
          voteCount: proposal.againstCount,
        };
      default: {
        return {
          title: 'Abstain',
          voteCount: proposal.abstainCount,
        };
      }
    }
  };

  return (
    <Card hover="pointer">
      <div tw="flex justify-between w-full">
        <VoteCardHeading variant={voteCardVariant(variant).variant}>
          {voteCardVariant(variant).title}
        </VoteCardHeading>
        <span tw="font-semibold text-lg">
          {truncateToLocaleString(voteCardVariant(variant).voteCount, 0)}
        </span>
      </div>
      <div tw="w-full my-3">
        <ProgressBar percentage={percentage} />
      </div>
    </Card>
  );
};

export default VoteCard;
