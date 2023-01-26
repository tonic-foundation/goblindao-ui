import React, { FC } from 'react';
import { DesktopAuction, MobileAuction } from '@/components/Auction';
import { useIsMobile } from '@/hooks/useIsMobile';

const Content: FC<{ tokenId: string }> = ({ tokenId }) => {
  const isMobile = useIsMobile();

  return (
    <div>
      {isMobile ? (
        <MobileAuction tokenId={tokenId} />
      ) : (
        <DesktopAuction tokenId={tokenId} />
      )}
    </div>
  );
};

export default Content;
