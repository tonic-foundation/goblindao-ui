import React, { FC, useState } from 'react';
import GrayCircle from '@/components/common/GrayCircle';
import Icon from '@/components/common/Icon';
import { truncateToLocaleString } from '@/lib/util';
import Link from 'next/link';
import { mock_bid_history } from '@/components/BidsHistory/mock_data';
import IconButton from '@/components/common/IconButton';
import Card from '@/components/common/Card';
import { GOBLIN_IPFS_URL } from '@/config';

export interface Bid {
  // TODO
  user: string;
  bidAmount: number;
  bidDate?: number | string;
}

const BidHistoryRow: FC<Bid> = ({ user, bidAmount, bidDate }) => {
  return (
    <Card tw="flex justify-between py-3 mb-2">
      <div tw="flex items-center gap-1">
        <GrayCircle tw="w-10 h-10 border border-solid" />
        <div>
          <p tw="font-semibold">{user}</p>
          <p tw="text-xs text-neutral-400">{bidDate}</p>
        </div>
      </div>
      <div tw="flex items-center gap-1 font-medium">
        <Icon.Near tw="w-3.5 h-3.5" />
        <p tw="mr-3">{truncateToLocaleString(bidAmount, 2)}</p>
        <Link passHref href="/">
          <a>
            <Icon.Link tw="text-xl text-neutral-400" />
          </a>
        </Link>
      </div>
    </Card>
  );
};

const BidsHistory: FC<{ onClose?: () => unknown }> = ({ onClose }) => {
  const [bidHistory] = useState<Bid[]>(mock_bid_history.bids);
  const [tokenId] = useState(mock_bid_history.tokenId);

  return (
    <div tw="p-5 min-w-[500px]">
      <div>
        <div tw="flex items-center gap-3 mb-4">
          <img
            tw="w-20 h-20 rounded-lg"
            src={`${GOBLIN_IPFS_URL}/${tokenId}.png`}
            alt=""
          />
          <div tw="w-3/5">
            <p tw="text-xl font-semibold text-neutral-500">Bids for</p>
            <p tw="text-2xl font-bold">Tonic Greedy Goblins {tokenId}</p>
          </div>
          {onClose && (
            <IconButton.Close
              tw="absolute right-4 top-4 text-xl"
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
            />
          )}
        </div>
      </div>
      <div tw="max-h-[400px] overflow-auto">
        {bidHistory.map((b, index) => (
          <BidHistoryRow
            key={index}
            user={b.user}
            bidAmount={b.bidAmount}
            bidDate={b.bidDate}
          />
        ))}
      </div>
    </div>
  );
};

export default BidsHistory;
