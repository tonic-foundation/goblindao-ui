import { FC } from 'react';
import { GOBLIN_IPFS_URL } from '@/config';
import Link from 'next/link';
import Tooltip from '@/components/common/Tooltip';
import NFTImage from '@/components/common/NFTImage';

// TODO Voter Tooltip
const VoterContent: FC<{ voterId: string; tokenId: string }> = ({
  voterId,
  tokenId,
}) => {
  return (
    <div>
      <div>
        <VoterNFTImage tokenId={tokenId} />
      </div>
    </div>
  );
};

const VoterNFTImage: FC<{ tokenId: string }> = ({ tokenId }) => {
  return (
    <NFTImage
      tw="w-10 h-10 inline-block rounded-full mx-1.5 my-2 opacity-[85%]"
      tokenId={tokenId}
    />
  );
};

const Voter: FC<{ voterId: string; tokenId: string }> = ({
  voterId,
  tokenId,
}) => {
  return (
    // <Tooltip
    //   hoverContent={(dataTip, id) => (
    //     <VoterContent tokenId={id} voterId={dataTip} />
    //   )}
    //   tip={voterId + tokenId}
    //   id={tokenId}
    // >
    <Link href={`#`}>
      <VoterNFTImage tokenId={tokenId} />
    </Link>
    // </Tooltip>
  );
};

export default Voter;
