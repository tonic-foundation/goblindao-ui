import React, { FC } from 'react';
import Auction from '@/components/Auction';

const Content: FC<{ tokenId: string }> = ({ tokenId }) => {
  return (
    <div>
      <Auction tokenId={tokenId} />
    </div>
  );
};

export default Content;
