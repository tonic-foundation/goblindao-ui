import tw, { css, styled } from 'twin.macro';
import { useTheme } from 'next-themes';

const Card = tw.div`bg-white rounded-2xl`;

const spinnerSizes = {
  xxs: tw`h-4 w-4 border`,
  xs: tw`h-8 w-8 border-2`,
  sm: tw`h-12 w-12 border-2`,
  default: tw`h-16 w-16 border-4`,
  huge: tw`h-24 w-24 border-4`,
};

const Spinner: React.FC<{
  size?: keyof typeof spinnerSizes;
  color?: string;
}> = ({ size, color, ...props }) => {
  // TODO
  //  check if possible to move nextTheme to parent components
  const { theme: nextTheme } = useTheme();
  const borderColor = nextTheme === 'dark' ? 'white' : color || 'black';

  return (
    <div
      // css comes first, so we can override the border-t and border-r
      css={[
        size ? spinnerSizes[size] : spinnerSizes.default,
        css`
          border-top-color: transparent;
          border-bottom-color: ${borderColor};
          border-left-color: ${borderColor};
          border-right-color: ${borderColor};
        `,
      ]}
      tw="rounded-full animate-spin"
      {...props}
    />
  );
};

const Loading = {
  Spinner,
  Pulse: styled(Card)(tw`animate-pulse bg-slate-200 dark:bg-neutral-800`),
};

export default Loading;
