import { NextPage } from 'next';
import React, { FC } from 'react';
import { GOBLIN_IPFS_URL } from '@/config';
import { Input } from '@/components/common/Input';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import IconButton from '@/components/common/IconButton';
import tw from 'twin.macro';
import Link from 'next/link';
import { useWalletSelector } from '@/state/containers/WalletSelectorContainer';
import GrayCircle from '@/components/common/GrayCircle';
import { truncateToLocaleString } from '@/lib/util';
import { mock_bid_history } from '@/components/BidsHistory/mock_data';
import Empty from '@/components/common/Empty';
import { Bid } from '@/components/BidsHistory';
import { useBidsHistoryModal } from '@/components/BidsHistory/modal';
import { useRouter } from 'next/router';

const HomeWrapper = {
  Main: tw.div`flex gap-10 justify-between`,
  Left: tw.div`flex w-[50%]`,
  Right: tw.div`flex flex-col gap-5 w-[50%]`,
};
const HomeTypography = {
  H1: tw.h1`text-4xl font-bold`,
  H2: tw.h2`text-3xl font-medium`,
  H3: tw.h3``,
  P1: tw.p`text-lg font-medium text-neutral-400 mb-2`,
  P2: tw.p`font-semibold text-neutral-400`,
  P3: tw.p`text-sm`,
};

const Bids: FC<Bid> = ({ user, bidAmount }) => {
  return (
    <div tw="flex justify-between items-center border-b border-solid p-2">
      <div tw="flex items-center gap-1">
        <GrayCircle tw="w-7 h-7 border border-solid" />
        <p tw="font-medium">{user}</p>
      </div>
      <div tw="flex items-center gap-1 font-medium">
        <Icon.Near tw="w-3.5 h-3.5" />
        <p tw="mr-3">{truncateToLocaleString(bidAmount, 2)}</p>
        <Link passHref href="/">
          <a>
            <Icon.Link tw="text-lg" />
          </a>
        </Link>
      </div>
    </div>
  );
};

// TODO should be separate component and used in nft/[tokenId] pages
const Content: NextPage = () => {
  const router = useRouter();
  const { accountId } = useWalletSelector();
  const { showModal } = useBidsHistoryModal();
  let currentToken = 1;

  return (
    <>
      <HomeWrapper.Main tw="flex gap-10 justify-between">
        <HomeWrapper.Left>
          <img src={`${GOBLIN_IPFS_URL}/${currentToken}.png`} alt="" />
        </HomeWrapper.Left>
        <HomeWrapper.Right>
          <div tw="flex items-center gap-3">
            <div tw="flex gap-1">
              <IconButton
                onClick={() => router.push(`/nft/${currentToken--}`)}
                tw="border w-9 h-9 text-neutral-600 dark:text-neutral-300"
                icon={<Icon.Back tw="w-5 h-5" />}
              />
              <IconButton
                onClick={() => router.push(`/nft/${currentToken++}`)}
                tw="border w-9 h-9 text-neutral-600 dark:text-neutral-300"
                icon={<Icon.Next tw="w-5 h-5" />}
              />
            </div>
            <HomeTypography.P2>November 27, 2022</HomeTypography.P2>
          </div>
          <HomeTypography.H1>
            Tonic Greedy Goblins {currentToken}
          </HomeTypography.H1>
          <div tw="flex flex-col">
            <div tw="flex gap-10 mb-3">
              <div tw="border-r border-solid pr-10">
                <HomeTypography.P1>Current bid</HomeTypography.P1>
                <div tw="flex gap-2 items-center">
                  <Icon.Near tw="w-6 h-6" />
                  <HomeTypography.H2>
                    {truncateToLocaleString(20, 2)}
                  </HomeTypography.H2>
                </div>
              </div>
              <div tw="cursor-pointer">
                <HomeTypography.P1>Auction ends in</HomeTypography.P1>
                <HomeTypography.H2>10h 7m 47s</HomeTypography.H2>
              </div>
            </div>
            <div>
              <Link passHref href="/">
                <a tw="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                  <Icon.Info />
                  <HomeTypography.P3>
                    Help mint the next Goblin
                  </HomeTypography.P3>
                </a>
              </Link>
            </div>
          </div>
          <div tw="flex gap-4">
            <Input
              type="number"
              tw="text-2xl w-[75%]"
              placeholder="20.40 or more"
            />
            <Button variant="confirm" size="lg" tw="w-[25%]">
              Place bid
            </Button>
          </div>
          {
            <div tw="flex flex-col gap-2">
              <div>
                {mock_bid_history?.bids?.length ? (
                  <>
                    {mock_bid_history.bids.slice(0, 2).map((b, index) => (
                      <Bids key={index} user={b.user} bidAmount={b.bidAmount} />
                    ))}
                    {mock_bid_history.bids.length > 2 && (
                      <p
                        onClick={() => showModal(true)}
                        tw="w-full text-center cursor-pointer text-sm font-medium text-neutral-400 mt-2"
                      >
                        View all bids
                      </p>
                    )}
                  </>
                ) : (
                  <Empty tw="py-7 mt-5">No bids activity</Empty>
                )}
              </div>
            </div>
          }
        </HomeWrapper.Right>
      </HomeWrapper.Main>
    </>
  );
};

export default Content;
