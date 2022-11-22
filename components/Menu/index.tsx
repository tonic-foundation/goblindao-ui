import React, { FC, useEffect, useRef } from 'react';
import tw, { css } from 'twin.macro';

import Icon from '@/components/common/Icon';
import ThemeToggle from '../ThemeToggle';
import { atom, useRecoilState } from 'recoil';
import IconButton from '../common/IconButton';
import { NEAR_ENV } from '@/config';
import AuthButton from '@/components/AuthButton';

const animateMarquee = css`
  animation: wtf 10s linear infinite;

  @keyframes wtf {
    0% {
      transform: translateX(110%);
    }
    100% {
      transform: translateX(-110%);
    }
  }
`;

const menuCollapsedState = atom({
  key: 'global.menu-collapsed-state',
  default: false,
});

const Wrapper = tw.div`
  h-screen w-full
  flex flex-col justify-between items-stretch
  p-4 py-7
`;

const MenuFooter = () => {
  return (
    <div tw="flex py-1 px-2 mt-3 gap-2 justify-between">
      <div tw="md:hidden">
        <AuthButton />
      </div>
      <ThemeToggle />
    </div>
  );
};

const Menu: FC<{ onClose?: () => unknown }> = ({ onClose }) => {
  return (
    <Wrapper>
      <div>
        <div tw="flex items-center justify-between px-3 gap-3">
          <Icon.Tonic tw="h-8 w-8" />
          {NEAR_ENV === 'testnet' && (
            <div tw="flex-1 text-xs font-semibold px-1 py-0.5 rounded shadow bg-lime-400 overflow-hidden">
              <span tw="inline-block text-black" css={animateMarquee}>
                TESTNET
              </span>
            </div>
          )}
          {/* spacer */}
          <span tw="flex-1" />
        </div>
        {onClose && (
          <div tw="absolute top-6 right-6">
            <IconButton.Close tw="w-10 h-10 text-2xl" onClick={onClose} />
          </div>
        )}
      </div>
      <MenuFooter />
    </Wrapper>
  );
};

export function useMenuCollapsed(collapsed?: true) {
  const [_collapsed, setCollapsed] = useRecoilState(menuCollapsedState);
  const beforeRef = useRef(_collapsed);

  useEffect(() => {
    if (typeof collapsed === 'boolean') {
      beforeRef.current = _collapsed;
      setCollapsed(collapsed);
    }

    return () => setCollapsed(beforeRef.current);
  }, [_collapsed, collapsed, setCollapsed]);

  return { collapsed: _collapsed, setCollapsed };
}

export default Menu;
