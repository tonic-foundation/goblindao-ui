import tw, { css } from 'twin.macro';

export const commonStyles = {
  bgBlackTransparent: tw`bg-black bg-opacity-5`,
};

export const hover = {
  textColor: (color: string) => css`
    &:hover {
      color: ${color};
    }
  `,
  bgColor: (color: string) => css`
    &:hover {
      background-color: ${color};
    }
  `,
  default: tw`hover:(bg-black/5 text-black/80) dark:hover:(bg-white/5 text-white)`,
};

export const border = {
  default: [
    tw`overflow-hidden`,
    tw`rounded-md border-[1px] border-neutral-200`,
    tw`dark:(bg-neutral-900 border-neutral-700)`,
  ],
  hover: [
    tw`hover:border-neutral-300 focus:border-black`,
    tw`dark:(hover:border-neutral-600 focus:border-lime-400)`,
  ],
};
