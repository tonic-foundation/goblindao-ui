import tw, { styled } from 'twin.macro';

export type VoteCardHeadingVariantsTypes =
  | 'default'
  | 'success'
  | 'danger'
  | undefined;

const baseStyles = tw`text-lg font-bold`;

const variants = {
  default: tw`text-neutral-400 dark:text-neutral-300`,
  success: tw`text-success-500`,
  danger: tw`text-danger-500`,
};

export interface VoteCardHeadingStyleOpts {
  variant?: keyof typeof variants;
}

function voteCardHeadingStyles(opts: VoteCardHeadingStyleOpts) {
  return [baseStyles, opts.variant ? variants[opts.variant] : variants.default];
}

const VoteCardHeading = styled.span<VoteCardHeadingStyleOpts>(
  voteCardHeadingStyles
);

export default VoteCardHeading;
