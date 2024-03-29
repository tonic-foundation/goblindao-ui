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
      .swiper-pagination-bullet {
        background: rgba(255, 255, 255, 0.5);
      }

      .ace_cursor {
        color: white !important;
      }
    }

    .light {
      .ace_cursor {
        color: black !important;
      }
    }

    html {
      width: 100vw;
      overflow-x: hidden;
    }

    .swiper-pagination .swiper-pagination-bullet-active {
      background: rgba(0, 0, 0, 0.3);
    }
  `,
});

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
  </>
);

export default GlobalStyles;
