import React, { FC } from 'react';
import Link from 'next/link';
import Icon from '@/components/common/Icon';
import { NEAR_ENV } from '@/config';
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

const Navbar: FC = () => {
  return (
    <nav tw="px-2 w-full">
      <div tw="flex flex-row items-center justify-between">
        <div tw="flex">
          <Icon.Tonic tw="h-8 w-8" />
          {NEAR_ENV === 'testnet' && (
            <div tw="flex-1 text-xs font-semibold px-1 py-0.5 rounded shadow bg-lime-400 overflow-hidden">
              <span tw="inline-block text-black" css={animateMarquee}>
                TESTNET
              </span>
            </div>
          )}
        </div>
        <div tw="flex">
          <div tw="hidden w-full md:block md:w-auto">
            <ul tw="flex flex-col rounded-lg">
              <li>
                <Link href="">
                  <a
                    tw="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent"
                    aria-current="page"
                  >
                    Home
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
