import tw, { styled } from 'twin.macro';

const baseStyles = tw`
  font-medium
  rounded-lg outline-none
  text-xs
  p-2
  text-white
  flex items-center gap-2
`;

const variants = {
  default: tw`bg-neutral-100 text-neutral-500 dark:bg-neutral-700 dark:text-neutral-300`,
  gray: tw`bg-neutral-400`,
  success: tw`bg-success-500`,
  danger: tw`bg-danger-500`,
  warning: tw`bg-warning-500`,
  info: tw`bg-info-500`,
};

export interface TagStyleOpts {
  variant?: keyof typeof variants;
}

export function tagStyles(opts: TagStyleOpts) {
  return [baseStyles, opts.variant ? variants[opts.variant] : variants.default];
}

const Tag = styled.div<TagStyleOpts>(tagStyles);

export default Tag;
