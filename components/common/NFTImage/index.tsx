import { GOBLIN_IPFS_URL } from '@/config';
import React, { FC } from 'react';

const NFTImage: FC<{ tokenId: string }> = ({ tokenId, ...props }) => {
  return <img {...props} src={`${GOBLIN_IPFS_URL}/${tokenId}.png`} alt="" />;
};

export default NFTImage;
