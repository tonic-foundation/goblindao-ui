import React from 'react';
import { Global } from '@emotion/react';
import tw, { css, GlobalStyles as BaseStyles } from 'twin.macro';

const customStyles = css({
  body: {
    ...tw`antialiased`,
  },
  ...css`
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input[type='number'] {
      -moz-appearance: textfield;
    }

    .dark {
    }

    .light {
    }

    html {
      width: 100vw;
      overflow-x: hidden;
    }

    body {
    }
  `,
});
/* --color-scroll-thumb: ${theme`colors.neutral.700`}; */
/* --color-scroll-thumb: ${theme`colors.neutral.400`}; */
/* ${tw`bg-neutral-50 font-primary text-black dark:(bg-black text-white) transition-colors duration-200`} */

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
  </>
);

export default GlobalStyles;
