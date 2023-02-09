import React, { FC } from 'react';
import Icon from '@/components/common/Icon';
import { NEAR_ENV } from '@/config';
import Link from 'next/link';
import { css } from 'twin.macro';

const animateMarquee = css`
  animation: wtf 10s linear infinite;

  @keyframes wtf {
    0% {
      transform: translateX(110%);
    }
    100% {
      transform: translateX(-110%);
    }
  }
`;

const NavbarBrand: FC = ({ ...props }) => (
  <Link href="/" tw="flex gap-2 items-center cursor-pointer" {...props}>
    <Icon.Tonic tw="h-12 w-12" />
    <div>
      {NEAR_ENV === 'testnet' && (
        <div tw="flex py-3 text-xs font-semibold rounded-xl shadow bg-lime-400 overflow-hidden">
          <span tw="inline-block text-black" css={animateMarquee}>
            TESTNET
          </span>
        </div>
      )}
    </div>
  </Link>
);

export default NavbarBrand;
