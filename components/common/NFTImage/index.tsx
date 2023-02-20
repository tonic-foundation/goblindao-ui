import { GOBLIN_IPFS_URL } from '@/config';
import React, { FC, useState } from 'react';
import Icon from '../Icon';

const NFTImage: FC<{ tokenId: string }> = ({ tokenId, ...props }) => {
  const [imgLoadError, setImgLoadError] = useState(false);

  return !imgLoadError ? (
    <img
      onError={() => setImgLoadError(true)}
      {...props}
      src={`${GOBLIN_IPFS_URL}/${tokenId}.png`}
      alt=""
    />
  ) : (
    <div {...props} tw="flex items-center justify-center">
      <Icon.Avatar tw="w-5 h-5" />
    </div>
  );
};

export default NFTImage;
