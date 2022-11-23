import tw, { styled } from 'twin.macro';

const baseStyles = tw`
  font-medium
  rounded-xl outline-none
  disabled:(opacity-80 cursor-not-allowed
  bg-neutral-200 border-slate-300 hover:border-slate-300
  dark:(hover:bg-neutral-600 bg-neutral-600 hover:border-neutral-400 border-neutral-400))
`;

const variants = {
  default: tw`bg-white border border-slate-200 hover:border-slate-400 transition dark:(bg-neutral-800 border-neutral-600 hover:border-neutral-400)`,
  confirm: tw`text-white bg-neutral-900 dark:bg-neutral-800 dark:hover:bg-neutral-900 transition hover:bg-opacity-90 border`,

  // TODO refactor
  success: tw`text-white bg-mint-500 hover:bg-opacity-90 dark:(bg-opacity-90 hover:bg-opacity-100)`,
  error: tw`text-white bg-red-600 hover:bg-opacity-90 dark:(bg-opacity-90 hover:bg-opacity-100)`,
  info: tw`text-white bg-blue-600 hover:bg-opacity-90 dark:(bg-opacity-90 hover:bg-opacity-100)`,
};

const sizes = {
  none: tw``,
  xs: tw`text-xs px-1 py-0.5`,
  sm: tw`text-sm py-1.5 px-2`,
  default: tw`py-1.5 px-3`,
  lg: tw`py-3 px-4`,
};

export interface ButtonStyleOpts {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

export function buttonStyles(opts: ButtonStyleOpts) {
  return [
    baseStyles,
    opts.variant ? variants[opts.variant] : variants.default,
    opts.size ? sizes[opts.size] : sizes.default,
  ];
}

const Button = styled.button<ButtonStyleOpts>(buttonStyles);

export default Button;
