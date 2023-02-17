import React from 'react';
import Tile from '@/components/common/Tile';
import GrayCircle from '@/components/common/GrayCircle';
import { abbreviateCryptoString } from '@/lib/util';
import NFTImage from '@/components/common/NFTImage';

const VoterTile: React.FC<{ vote: string; name: string }> = ({
  vote,
  name,
  ...props
}) => {
  const rndInt = Math.floor(Math.random() * 2000) + 1;

  return (
    <div tw="flex justify-between w-full px-3" {...props}>
      <div tw="flex items-center gap-3">
        {/*TODO Set user's avatar if there is*/}
        <NFTImage
          tw="w-8 h-8 border rounded-full"
          tokenId={rndInt.toString()}
        />
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
