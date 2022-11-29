import { Bid } from '@/components/BidsHistory/index';

interface BidHistory {
  tokenId: string;
  bids: Bid[];
}
export const mock_bid_history: BidHistory = {
  tokenId: '1',
  bids: [
    {
      user: 'username',
      bidAmount: 20,
      bidDate: 'Nov 28, 2022, 4:18 AM',
    },
    {
      user: 'username',
      bidAmount: 20,
      bidDate: 'Nov 28, 2022, 4:18 AM',
    },
    {
      user: 'username',
      bidAmount: 20,
      bidDate: 'Nov 28, 2022, 4:18 AM',
    },
    {
      user: 'username',
      bidAmount: 20,
      bidDate: 'Nov 28, 2022, 4:18 AM',
    },
    {
      user: 'username',
      bidAmount: 20.01,
      bidDate: 'Nov 28, 2022, 3:38 AM',
    },
    {
      user: 'username',
      bidAmount: 20.01,
      bidDate: 'Nov 28, 2022, 3:38 AM',
    },
  ],
};
