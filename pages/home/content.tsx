import { NextPage } from 'next';
import React from 'react';
import Auction from '@/components/Auction';

const Content: NextPage = () => {
  const tokenIdOfActiveAuction = '1';

  return (
    <React.Fragment>
      <Auction activeAuction tokenId={tokenIdOfActiveAuction} />
    </React.Fragment>
  );
};

export default Content;
