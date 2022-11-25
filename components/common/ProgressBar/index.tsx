import tw, { css, styled } from 'twin.macro';
import { FC } from 'react';

const baseStyles = tw`
  rounded-md
  w-full
  h-4
  bg-neutral-100 dark:bg-neutral-700
`;

const variants = {
  default: tw`bg-neutral-400 dark:bg-neutral-500`,
  success: tw`bg-success-500 dark:bg-success-500`,
  danger: tw`bg-danger-500 dark:bg-danger-500`,
  warning: tw`bg-warning-500 dark:bg-warning-500`,
  info: tw`bg-info-500 dark:bg-info-500`,
};

export interface ProgressBarStyleOpts {
  percentage: number;
  variant?: keyof typeof variants;
}

function progressBarInnerStyles(opts: ProgressBarStyleOpts) {
  return [
    baseStyles,
    tw`absolute top-0 left-0`,
    css(css`
      & {
        width: ${opts.percentage}%;
        opacity: ${!opts.percentage ? 0 : 1};
        visibility: ${!opts.percentage ? 'hidden' : 'visible'};
      }
    `),
    opts.variant ? variants[opts.variant] : variants.default,
  ];
}

const ProgressBarWrapper = styled.div(tw`relative w-full`);
const ProgressBarInnerWrapper = styled.div<{ variant?: keyof typeof variants }>(
  ({ variant }) => [
    baseStyles,
    tw`opacity-10`,
    variant ? variants[variant] : variants.default,
  ]
);
const ProgressBarInner = styled.div<ProgressBarStyleOpts>(
  progressBarInnerStyles
);

const ProgressBar: FC<ProgressBarStyleOpts> = ({
  variant,
  percentage,
  ...props
}) => {
  return (
    <ProgressBarWrapper {...props}>
      <ProgressBarInnerWrapper variant={variant} />
      <ProgressBarInner variant={variant} percentage={percentage} />
    </ProgressBarWrapper>
  );
};

export default ProgressBar;
