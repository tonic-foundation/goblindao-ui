import { NextPage } from 'next';
import React from 'react';
import { GOBLIN_IPFS_URL } from '@/config';
import { Input } from '@/components/common/Input';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import IconButton from '@/components/common/IconButton';
import tw from 'twin.macro';
import Link from 'next/link';
// import { useWalletSelector } from '@/state/containers/WalletSelectorContainer';

const HomeTypography = {
  H1: tw.h1`text-5xl font-bold`,
  H2: tw.h2`text-3xl font-medium`,
  H3: tw.h3``,
  P1: tw.p`text-lg font-medium text-neutral-400 mb-2`,
  P2: tw.p`font-semibold text-neutral-400`,
  P3: tw.p`text-sm`,
};

const NFTActivity = () => {
  return <div></div>;
};

const Content: NextPage = () => {
  // const { accountId } = useWalletSelector();
  return (
    <>
      <div tw="flex gap-10 justify-between">
        <div tw="flex">
          <img src={`${GOBLIN_IPFS_URL}/1.png`} alt="" />
        </div>
        <div tw="flex flex-col gap-5">
          <div tw="flex items-center gap-3">
            <div tw="flex gap-1">
              <IconButton
                onClick={() => {}}
                tw="border w-9 h-9 text-neutral-600 dark:text-neutral-300"
                icon={<Icon.Back tw="w-5 h-5" />}
              />
              <IconButton
                onClick={() => {}}
                tw="border w-9 h-9 text-neutral-600 dark:text-neutral-300"
                icon={<Icon.Next tw="w-5 h-5" />}
              />
            </div>
            <HomeTypography.P2>November 27, 2022</HomeTypography.P2>
          </div>
          <HomeTypography.H1>Tonic Greedy Goblins {1}</HomeTypography.H1>
          <div tw="flex flex-col">
            <div tw="flex gap-10 mb-3">
              <div tw="border-r border-solid pr-10">
                <HomeTypography.P1>Current bid</HomeTypography.P1>
                <div tw="flex gap-2 items-center">
                  <Icon.Near tw="w-6 h-6" />
                  <HomeTypography.H2>20.00</HomeTypography.H2>
                </div>
              </div>
              <div tw="cursor-pointer">
                <HomeTypography.P1>Auction ends in</HomeTypography.P1>
                <HomeTypography.H2>10h 7m 47s</HomeTypography.H2>
              </div>
            </div>
            <div>
              <Link passHref href="">
                <a tw="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                  <Icon.Info />
                  <HomeTypography.P3>Help mint the next Noun</HomeTypography.P3>
                </a>
              </Link>
            </div>
          </div>
          <div tw="flex gap-4">
            <Input
              tw="text-2xl w-4/5"
              placeholder="20.40 or more"
              type="text"
            />
            <Button variant="confirm" tw="w-1/5">
              Place bid
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
