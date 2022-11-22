import React, { useCallback, useState } from 'react';
import { NEAR_HREF } from '@/config';
import Button from '@/components/common/Button';
import { useWalletPickerPage } from '../state';
import Icon from '@/components/common/Icon';
import Shape from '@/components/common/Shape';
import Typography from '../components/Typography';
import tw from 'twin.macro';
import { useEffect } from 'react';
import { range } from '@/lib/util';

const CDots: React.FC = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // using index higher than the number of dots creates a pulse effect
    const id = setInterval(() => setActiveIndex((i) => (i + 1) % 8), 120);
    return () => clearInterval(id);
  }, []);

  return (
    <div tw="flex items-center gap-2" {...props}>
      {range(4).map((i) => {
        return (
          <Shape.Cdot
            key={i}
            tw="transition ease-in duration-200"
            css={i !== activeIndex && tw`opacity-30`}
          />
        );
      })}
    </div>
  );
};

const Heading = tw.h2`text-base sm:text-sm font-medium`;
const Body = tw.p`text-sm sm:text-xs opacity-80`;
const Bullet = () => {
  return (
    <div tw="pt-[9px] sm:pt-[7px]">
      <Shape.Cdot />
    </div>
  );
};

const Home: React.FC = () => {
  const [, setPage] = useWalletPickerPage();

  const handleClickContinue = useCallback(() => {
    setPage({
      route: 'wallet-select',
    });
  }, [setPage]);

  return (
    <div tw="flex-grow flex flex-col p-6 items-stretch">
      <div tw="flex items-center justify-center gap-4">
        <Icon.Near tw="h-7 w-7" />
        <CDots />
        <Icon.Tonic tw="h-9 w-9" />
      </div>
      <Typography.Title tw="mt-6 text-center px-6">
        To use Tonic, you need to connect a NEAR wallet.
      </Typography.Title>

      {/* extra padding here looks good.. */}
      <div tw="flex-grow flex flex-col items-stretch justify-end gap-6 my-12 px-3">
        <div tw="flex items-start gap-3">
          <Bullet />
          <div>
            <Heading>You control your crypto</Heading>
            <Body tw="mt-1.5">
              Using a non-custodial wallet enables you to control your crypto
              without having to trust third parties.
            </Body>
          </div>
        </div>
        <div tw="flex items-start gap-3">
          <Bullet />
          <div>
            <Heading>Transact quickly and cheaply</Heading>
            <Body tw="mt-1.5">
              One second block times and fast transaction finality, all on NEAR
              L1.
            </Body>
          </div>
        </div>
      </div>

      <Button variant="confirm" size="lg" onClick={handleClickContinue}>
        Continue
      </Button>
      <p tw="text-center text-xs mt-3 opacity-80 hover:opacity-100">
        First time using NEAR?{' '}
        <a
          tw="inline underline"
          href={NEAR_HREF}
          target="_blank"
          rel="noreferrer"
        >
          Learn more
        </a>
      </p>
    </div>
  );
};

export default Home;
