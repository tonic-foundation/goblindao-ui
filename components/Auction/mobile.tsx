import React, { FC, useState } from 'react';
import { getExplorerUrl } from '@/config';
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
import Typography from '@/components/Typography';
import NFTImage from '@/components/common/NFTImage';

const AuctionWrapper = {
  Main: tw.div`flex flex-col gap-10 justify-between`,
  Image: tw.div`flex w-full grow items-stretch`,
  Tools: tw.div`flex flex-col gap-5 w-full grow items-stretch`,
};
const AuctionTypography = {
  H1: tw.h1`text-2xl font-bold`,
  H2: tw.h2`text-xl font-medium`,
  H3: tw.h3``,
  P1: tw.p`font-medium text-neutral-400 mb-2`,
  P2: tw.p`text-sm font-semibold text-neutral-400`,
  P3: tw.p`text-xs`,
};

const AuctionBids: FC<Bid> = ({ user, bidAmount }) => {
  return (
    <div tw="flex justify-between items-center border-b border-solid p-2">
      <div tw="flex items-center gap-1">
        <GrayCircle tw="w-7 h-7 border border-solid" />
        <p tw="font-medium">{user} or accountId</p>
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

const Auction: FC<{ tokenId: string; activeAuction?: boolean }> = ({
  tokenId,
  activeAuction = tokenId === '1',
}) => {
  const router = useRouter();
  const { accountId } = useWalletSelector();
  const { showModal: showBidHistoryModal } = useBidsHistoryModal();
  const [currentTokenId, setCurrentTokenId] = useState(tokenId);
  const [auctionTimeViewToggle, setAuctionTimeViewToggle] = useState(false);

  const handleClickBack = () => {
    const newCurrentTokenId = +currentTokenId - 1;
    setCurrentTokenId(newCurrentTokenId.toString());
    router.push(`/nft/${newCurrentTokenId}`);
  };

  const handleClickNext = () => {
    const newCurrentTokenId = +currentTokenId + 1;
    setCurrentTokenId(newCurrentTokenId.toString());
    router.push(`/nft/${newCurrentTokenId}`);
  };

  return (
    <>
      <AuctionWrapper.Main tw="flex gap-10 justify-between">
        <AuctionWrapper.Image>
          <NFTImage tw="w-full" tokenId={tokenId} />
        </AuctionWrapper.Image>
        <AuctionWrapper.Tools>
          <div tw="flex items-center gap-3">
            <div tw="flex gap-2">
              <IconButton.Back
                disabled={tokenId === '1'}
                onClick={handleClickBack}
                tw="text-xl text-neutral-600 dark:text-neutral-300"
              />
              <IconButton
                icon={<Icon.Next />}
                disabled={tokenId === '2000'}
                onClick={handleClickNext}
                tw="text-xl text-neutral-600 dark:text-neutral-300"
              />
            </div>
            <AuctionTypography.P2>November 27, 2022</AuctionTypography.P2>
          </div>
          <AuctionTypography.H1>
            Tonic Greedy Goblins {currentTokenId}
          </AuctionTypography.H1>
          <div tw="flex flex-col">
            <div tw="flex gap-10 mb-5">
              <div tw="border-r border-solid pr-10">
                <AuctionTypography.P1>
                  {activeAuction ? 'Current bid' : 'Winning bid'}
                </AuctionTypography.P1>
                <div tw="flex gap-2 items-center">
                  <Icon.Near tw="w-6 h-6" />
                  <AuctionTypography.H2>
                    {truncateToLocaleString(activeAuction ? 20 : 31, 2)}
                  </AuctionTypography.H2>
                </div>
              </div>
              {activeAuction ? (
                <div
                  tw="cursor-pointer"
                  onClick={() =>
                    setAuctionTimeViewToggle(!auctionTimeViewToggle)
                  }
                >
                  {!auctionTimeViewToggle ? (
                    <React.Fragment>
                      <AuctionTypography.P1>
                        Auction ends in
                      </AuctionTypography.P1>
                      <AuctionTypography.H2>10h 7m 47s</AuctionTypography.H2>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <AuctionTypography.P1>
                        Ends on Nov 30 at
                      </AuctionTypography.P1>
                      <AuctionTypography.H2>3:45:59 AM</AuctionTypography.H2>
                    </React.Fragment>
                  )}
                </div>
              ) : (
                <div>
                  <AuctionTypography.P1>Held by</AuctionTypography.P1>
                  <Link passHref href="/">
                    <a>
                      <AuctionTypography.H2 tw="flex items-center gap-3">
                        <GrayCircle tw="m-0" />

                        <Typography.AccountId
                          length={10}
                          accountId={
                            '0x5d837276ec1ddcbfe3f85d9414dffe4b641ebaff'
                          }
                        />
                      </AuctionTypography.H2>
                    </a>
                  </Link>
                </div>
              )}
            </div>
            {activeAuction && (
              <div>
                <Link passHref href="/">
                  <a tw="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                    <Icon.Info />
                    <AuctionTypography.P3>
                      Help mint the next Goblin
                    </AuctionTypography.P3>
                  </a>
                </Link>
              </div>
            )}
          </div>
          {activeAuction && (
            <div tw="flex gap-2 sm:gap-4">
              <Input
                type="number"
                tw="text-xl w-[65%] sm:text-2xl sm:w-[75%]"
                placeholder="20.40 or more"
              />
              <Button variant="confirm" size="lg" tw="w-[35%] sm:w-[40%]">
                Place bid
              </Button>
            </div>
          )}
          {activeAuction && (
            <div tw="flex flex-col gap-2">
              <div>
                {mock_bid_history?.bids?.length ? (
                  <>
                    {mock_bid_history.bids.slice(0, 2).map((b, index) => (
                      <AuctionBids
                        key={index}
                        user={b.user}
                        bidAmount={b.bidAmount}
                      />
                    ))}
                    {mock_bid_history.bids.length > 2 && (
                      <p
                        onClick={() => showBidHistoryModal(true)}
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
          )}
          {!activeAuction && (
            <div>
              <div tw="flex gap-3 items-center mb-3 text-lg">
                <Icon.Cake tw="text-2xl" />
                <p tw="text-black dark:text-white">
                  Born <strong>November 29, 2022</strong>
                </p>
              </div>
              <div tw="flex gap-3 items-center mb-6 text-lg">
                <Icon.Heart tw="text-2xl" />
                <p tw="flex gap-2 text-black dark:text-white">
                  Winner{' '}
                  <Link passHref href="/#">
                    <a tw="flex items-center gap-2 font-semibold text-brand-400">
                      <Typography.AccountId
                        accountId={'0x5d837276ec1ddcbfe3f85d9414dffe4b641ebaff'}
                      />
                      <Icon.Link tw="text-neutral-600 dark:text-neutral-300" />
                    </a>
                  </Link>
                </p>
              </div>
              <div tw="flex w-full items-center gap-3">
                <Button
                  tw="w-full"
                  onClick={() => showBidHistoryModal(true)}
                  size="lg"
                  variant="confirm"
                >
                  Bid History
                </Button>
                <Button
                  tw="w-full justify-center flex"
                  size="lg"
                  variant="confirm"
                >
                  <Link
                    passHref
                    href={getExplorerUrl(
                      'account',
                      '0x5d837276ec1ddcbfe3f85d9414dffe4b641ebaff'
                    )}
                  >
                    <a target="_blank" tw="flex items-center gap-2">
                      <Icon.Near tw="w-4 h-4" />
                      Explore
                    </a>
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </AuctionWrapper.Tools>
      </AuctionWrapper.Main>
    </>
  );
};

export default Auction;
