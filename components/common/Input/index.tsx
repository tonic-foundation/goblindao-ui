import tw, { styled } from 'twin.macro';

export const Input = styled.input(
  tw`w-full`,
  tw`appearance-none outline-none`,
  tw`border-[1px] border-slate-200 hover:border-slate-300 focus:border-black`,
  tw`dark:(border-neutral-700 hover:border-neutral-600 focus:border-neutral-400)`,
  tw`rounded-lg p-2.5`,
  tw`text-sm font-medium`,
  tw`placeholder:opacity-75`,
  tw`transition duration-200`
);
