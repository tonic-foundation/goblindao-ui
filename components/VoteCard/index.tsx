import { FC, useMemo } from 'react';
import Card from '@/components/common/Card';
import { ProposalProps } from '@/components/Proposals/Proposal';
import ProgressBar from '@/components/common/ProgressBar';
import { arrayRandomlyShuffle, truncateToLocaleString } from '@/lib/util';
import VoteCardHeading, {
  VoteCardHeadingVariantsTypes,
} from '@/components/VoteCard/VoteCardHeading';
import tw from 'twin.macro';
import { VOTERS_PER_VOTE_CARD_DESKTOP } from '@/config';
import { chunk } from 'lodash';
import Voter from '@/components/VoteCard/Voter';
import { Swiper, SwiperSlide } from '@/components/common/Swiper';

const GrayCircle = tw.div`bg-neutral-100 dark:bg-neutral-700 rounded-full w-10 h-10 inline-block mx-1.5 my-2`;

export enum VoteCardVariant {
  FOR,
  AGAINST,
  ABSTAIN,
}

type VoteCardProps = {
  proposal: ProposalProps;
  percentage: number;
  variant: VoteCardVariant;
  voterIds?: Array<string>;
};
const VoteCard: FC<VoteCardProps> = (props) => {
  const { variant, proposal, percentage, voterIds } = props;

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

  const { variant: cardVariant, voteCount, title } = voteCardVariant(variant);

  const shuffledVoterIdsIntoChunks = useMemo(() => {
    const shuffled = arrayRandomlyShuffle(voterIds, +proposal.id);
    const chunks = chunk(shuffled, VOTERS_PER_VOTE_CARD_DESKTOP) as string[][];

    return chunks.map((chunk) => {
      if (chunk.length < VOTERS_PER_VOTE_CARD_DESKTOP) {
        const emptyArray = Array(
          VOTERS_PER_VOTE_CARD_DESKTOP - chunk.length
        ).fill('');

        chunk = [...chunk, ...emptyArray];
      }

      return chunk;
    });
  }, [proposal, voterIds]);

  return (
    <Card hover="pointer">
      <div tw="flex flex-col justify-center md:text-left text-center md:flex-row md:justify-between w-full">
        <VoteCardHeading tw="md:mb-0 mb-5" variant={cardVariant}>
          {title}
        </VoteCardHeading>
        <span tw="font-semibold text-lg">
          {truncateToLocaleString(voteCount, 0)}
        </span>
      </div>
      <div tw="w-full mt-3 mb-2">
        <ProgressBar variant={cardVariant} percentage={percentage} />
      </div>
      <div tw="hidden md:block pt-5">
        <Swiper>
          {shuffledVoterIdsIntoChunks?.length &&
            shuffledVoterIdsIntoChunks.map((pages, index) => (
              <SwiperSlide key={index}>
                <div tw="flex flex-wrap justify-between pb-6 relative">
                  {pages.map((raw, index) =>
                    raw ? (
                      <Voter
                        key={raw + index}
                        voterId={raw}
                        tokenId={`${index + 1}`}
                      />
                    ) : (
                      <GrayCircle />
                    )
                  )}
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </Card>
  );
};

export default VoteCard;
