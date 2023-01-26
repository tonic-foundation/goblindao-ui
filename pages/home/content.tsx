import { NextPage } from 'next';
import React from 'react';
import { DesktopAuction, MobileAuction } from '@/components/Auction';
import { useIsMobile } from '@/hooks/useIsMobile';

const Content: NextPage = () => {
  const isMobile = useIsMobile();
  const tokenIdOfActiveAuction = '1';

  return (
    <React.Fragment>
      {isMobile ? (
        <MobileAuction activeAuction tokenId={tokenIdOfActiveAuction} />
      ) : (
        <DesktopAuction activeAuction tokenId={tokenIdOfActiveAuction} />
      )}
    </React.Fragment>
  );
};

export default Content;
