import { css } from 'twin.macro';

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
