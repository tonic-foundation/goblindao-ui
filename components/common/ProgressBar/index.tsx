import tw, { styled } from 'twin.macro';

const baseStyles = tw`
  rounded-md
  p-2
  w-full
`;

const variants = {
  default: tw`bg-neutral-100 dark:bg-neutral-700`,
  success: tw`bg-success-500`,
  danger: tw`bg-danger-500`,
  warning: tw`bg-warning-500`,
  info: tw`bg-info-500`,
};

export interface ProgressBarStyleOpts {
  percentage: number;
  variant?: keyof typeof variants;
}

function progressBarStyles(opts: ProgressBarStyleOpts) {
  return [baseStyles, opts.variant ? variants[opts.variant] : variants.default];
}

const ProgressBar = styled.div<ProgressBarStyleOpts>(progressBarStyles);

export default ProgressBar;
