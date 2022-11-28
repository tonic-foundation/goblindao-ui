import React, { FC } from 'react';

const Content: FC<{ tokenId: string }> = ({ tokenId }) => {
  return <div>Tonic Greedy Goblins {tokenId}</div>;
};

export default Content;
