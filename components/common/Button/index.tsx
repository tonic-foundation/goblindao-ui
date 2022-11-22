import tw, { styled } from 'twin.macro';

const baseStyles = tw`
  font-medium
  rounded-lg outline-none
  disabled:(opacity-80 hover:opacity-80 cursor-not-allowed dark:bg-neutral-500 dark:hover:bg-neutral-500 )
`;

const variants = {
  default: tw`bg-white border-[1px] border-slate-200 hover:border-slate-300 dark:(bg-neutral-700 border-neutral-700 hover:border-neutral-600)`,
  confirm: tw`text-white bg-deep-blue-900 dark:bg-neutral-900 hover:bg-opacity-90 dark:(bg-opacity-90 hover:bg-opacity-100)`,
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

// occasionally want this for links etc that behave like buttons but aren't
export function buttonStyles(opts: ButtonStyleOpts) {
  return [
    baseStyles,
    opts.variant ? variants[opts.variant] : variants.default,
    opts.size ? sizes[opts.size] : sizes.default,
  ];
}

const Button = styled.button<ButtonStyleOpts>(buttonStyles);

export default Button;
