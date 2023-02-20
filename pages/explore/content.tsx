import { NextPage } from 'next';
import React, { useState } from 'react';
import tw, { css } from 'twin.macro';
import { mock_nfts } from '@/pages/nft/[tokenId]';
import NFTImage from '@/components/common/NFTImage';
import IconButton from '@/components/common/IconButton';
import Icon from '@/components/common/Icon';
import Button from '@/components/common/Button';
import GrayCircle from '@/components/common/GrayCircle';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useIsMobile } from '@/hooks/useIsMobile';
import { NFT_COLLECTION_HREF } from '@/config';

const ExploreWrapper = {
  Main: tw.div`flex border border-solid`,
  Header: tw.div`border-b justify-between px-4 py-2.5 items-center sm:flex hidden`,
  Left: tw.div`flex grow flex-col h-screen`,
  Right: tw.div`flex flex-col w-[33%] grow items-stretch border-l border-solid overflow-auto`,
};

const Content: NextPage = () => {
  const [hoveredNFT, setHoveredNFT] = useState<string>('');
  const [selectedNFT, setSelectedNFT] = useState('1');
  const [rightVisible, setRightVisible] = useState(false);
  const { theme } = useTheme();
  const isMobile = useIsMobile();

  return (
    <ExploreWrapper.Main>
      <ExploreWrapper.Left>
        <ExploreWrapper.Header>
          <p tw="uppercase text-sm text-neutral-600 dark:text-neutral-300">
            Explore 1600 Goblins
          </p>
        </ExploreWrapper.Header>
        <div
          tw="grid gap-2 p-4 max-h-fit overflow-auto"
          css={css`
            & {
              grid-template-columns: repeat(
                ${isMobile ? 1 : rightVisible ? 4 : 8},
                minmax(0, 1fr)
              );
          `}
        >
          {mock_nfts.map((g, index) => (
            <div
              onClick={() => {
                setSelectedNFT(g.tokenId);
                !rightVisible && setRightVisible(true);
              }}
              onMouseEnter={() => setHoveredNFT(g.tokenId)}
              onMouseLeave={() => setHoveredNFT('')}
              key={`tokenId-#${index + 1}`}
            >
              <NFTImage
                css={[
                  theme === 'dark'
                    ? tw`hover:border-white`
                    : tw`hover:border-black`,
                  selectedNFT === g.tokenId &&
                    (theme === 'dark' ? tw`border-white` : tw`border-black`),
                ]}
                tw="w-full h-full rounded-xl cursor-pointer border-4 border-transparent"
                tokenId={g.tokenId}
              />
            </div>
          ))}
        </div>
      </ExploreWrapper.Left>
      {rightVisible && selectedNFT && (
        <ExploreWrapper.Right>
          <div tw="w-full relative">
            <IconButton.Close
              onClick={() => {
                setRightVisible(false);
                setSelectedNFT('');
                setHoveredNFT('');
              }}
              tw="absolute right-2 top-2 border-0 text-2xl font-semibold"
            />
          </div>
          <NFTImage tokenId={hoveredNFT || selectedNFT} />
          <div tw="text-2xl font-bold flex justify-between items-center bg-neutral-200 dark:bg-neutral-700 py-4 px-7">
            <IconButton.Back
              disabled={selectedNFT === '1'}
              onClick={() => setSelectedNFT((+selectedNFT - 1).toString())}
              tw="bg-neutral-300 hover:bg-neutral-400 border-neutral-400 dark:bg-neutral-700
               text-xl disabled:(bg-neutral-300 hover:bg-neutral-300 dark:bg-neutral-700)"
            />
            <p tw="text-center flex flex-col gap-2">
              <span>Tonic Greedy Goblins {hoveredNFT || selectedNFT}</span>
            </p>
            <IconButton
              disabled={selectedNFT === '2000'}
              onClick={() => setSelectedNFT((+selectedNFT + 1).toString())}
              tw="bg-neutral-300 hover:bg-neutral-400 border-neutral-400 dark:bg-neutral-700
               text-xl disabled:(bg-neutral-300 hover:bg-neutral-300 dark:bg-neutral-700)"
              icon={<Icon.Next />}
            />
          </div>
          <div tw="py-4 px-7 gap-4 flex flex-col items-center justify-center">
            <p>Want your own Goblin?</p>
            <a href={NFT_COLLECTION_HREF} target="_blank" rel="noreferrer">
              <Button>View the collection</Button>
            </a>
          </div>
        </ExploreWrapper.Right>
      )}
    </ExploreWrapper.Main>
  );
};

export default Content;
