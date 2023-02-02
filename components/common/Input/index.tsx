import tw, { styled } from 'twin.macro';
import { border } from '@/styles';

export const Input = styled.input<{ tabular?: boolean }>(
  ...border.default,
  ...border.hover,
  tw`w-full p-2.5`,
  tw`appearance-none outline-none`,
  tw`text-sm placeholder:opacity-60`,
  ({ tabular }) => tabular && tw`tabular-nums`,
  tw`disabled:(opacity-80 hover:opacity-80 cursor-not-allowed)
`
);
