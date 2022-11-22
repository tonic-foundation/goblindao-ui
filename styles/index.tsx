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
};
