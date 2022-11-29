import { NextPage } from 'next';
import React, { useState } from 'react';
import tw, { css } from 'twin.macro';
import { mock_nfts } from '@/pages/nft/[tokenId]';
import NFTImage from '@/components/common/NFTImage';
import { useTheme } from 'next-themes';
import IconButton from '@/components/common/IconButton';
import Icon from '@/components/common/Icon';
import Button from '@/components/common/Button';
import GrayCircle from '@/components/common/GrayCircle';
import Link from 'next/link';

const ExploreWrapper = {
  Main: tw.div`flex border border-solid rounded-xl relative`,
  Header: tw.div`border-b flex justify-between px-4 py-2.5 items-center`,
  Left: tw.div`flex grow flex-col`,
  Right: tw.div`flex flex-col w-[33%] grow items-stretch border-l border-solid sticky top-0`,
};

const Content: NextPage = () => {
  const [hoveredNFT, setHoveredNFT] = useState<string>('');
  const [selectedNFT, setSelectedNFT] = useState('1');
  const [rightVisible, setRightVisible] = useState(true);
  const { theme } = useTheme();

  return (
    <ExploreWrapper.Main>
      <ExploreWrapper.Left>
        <ExploreWrapper.Header>
          <p tw="uppercase text-sm text-neutral-600 dark:text-neutral-300">
            Explore {2000} Goblins
          </p>
          <Button size="lg">Latest Goblins</Button>
        </ExploreWrapper.Header>
        <div
          tw="grid grid-cols-10 gap-2 p-4"
          css={css`
            & {
              grid-template-columns: repeat(
                ${rightVisible ? 10 : 20},
                minmax(0, 1fr)
              );
            }
          `}
        >
          {mock_nfts.map((g, index) => (
            <div
              tw="transition"
              onClick={() => {
                setSelectedNFT(g.tokenId);
                !rightVisible && setRightVisible(true);
              }}
              onMouseEnter={() => setHoveredNFT(g.tokenId)}
              onMouseLeave={() => setHoveredNFT('')}
              key={g.tokenId + index}
            >
              <NFTImage
                css={css`
                  & {
                    border-color: ${theme === 'dark'
                      ? selectedNFT === g.tokenId || hoveredNFT === g.tokenId
                        ? '#fff'
                        : 'transparent'
                      : selectedNFT === g.tokenId || hoveredNFT === g.tokenId
                      ? '#000'
                      : 'transparent'};
                    border-width: 4px;
                    border-style: solid;
                  }
                `}
                tw="w-24 h-full rounded-xl cursor-pointer"
                tokenId={g.tokenId}
              />
            </div>
          ))}
        </div>
      </ExploreWrapper.Left>
      {rightVisible && selectedNFT && (
        <ExploreWrapper.Right>
          <IconButton.Close
            onClick={() => {
              setRightVisible(false);
              setSelectedNFT('');
              setHoveredNFT('');
            }}
            tw="absolute right-2 top-2 border-0 text-2xl font-semibold"
          />
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
              <span tw="text-sm font-light text-neutral-600 dark:text-neutral-300">
                Born November 8, 2022
              </span>
            </p>
            <IconButton
              disabled={selectedNFT === '2000'}
              onClick={() => setSelectedNFT((+selectedNFT + 1).toString())}
              tw="bg-neutral-300 hover:bg-neutral-400 border-neutral-400 dark:bg-neutral-700
               text-xl disabled:(bg-neutral-300 hover:bg-neutral-300 dark:bg-neutral-700)"
              icon={<Icon.Next />}
            />
          </div>
          <div tw="py-4 px-7">
            <div tw="flex items-center gap-2 py-3">
              <GrayCircle tw="rounded-lg bg-neutral-200 w-16 h-16 m-0" />
              <div tw="flex flex-col pt-2">
                <span tw="font-light text-sm text-neutral-400">Body</span>
                <p tw="font-semibold">Dark Green</p>
              </div>
            </div>
            <div tw="flex items-center gap-2 border-t border-solid py-3">
              <GrayCircle tw="rounded-lg bg-neutral-200 w-16 h-16 m-0" />
              <div tw="flex flex-col pt-2">
                <span tw="font-light text-sm text-neutral-400">Eyes</span>
                <p tw="font-semibold">Brown</p>
              </div>
            </div>
            <div tw="w-full flex justify-center mt-4">
              <Link href="/" passHref>
                <a tw="text-brand-400 underline text-sm">Vote history</a>
              </Link>
            </div>
          </div>
        </ExploreWrapper.Right>
      )}
    </ExploreWrapper.Main>
  );
};

export default Content;
