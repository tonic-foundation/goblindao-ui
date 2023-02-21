import React from 'react';
import Tile from '@/components/common/Tile';
import { abbreviateCryptoString } from '@/lib/util';
import NFTImage from '@/components/common/NFTImage';
import { useMyNFT } from '@/hooks/useMyNFT';

const VoterTile: React.FC<{ vote: string; name: string }> = ({
  vote,
  name,
  ...props
}) => {
  const myNFT = useMyNFT(name);

  return (
    <div tw="flex justify-between w-full px-3" {...props}>
      <div tw="flex items-center gap-3">
        <NFTImage tw="w-8 h-8 border rounded-full" tokenId={myNFT} />
        <Tile.Label tw="text-sm">
          {abbreviateCryptoString(name, 14, 4)}
        </Tile.Label>
      </div>
      <div tw="items-center flex pr-5">
        <Tile.Label tw="text-sm">{vote}</Tile.Label>
      </div>
    </div>
  );
};

export default VoterTile;
