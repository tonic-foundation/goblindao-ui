import React, { FC, ReactNode } from 'react';
import tw from 'twin.macro';
import Icon from '@/components/common/Icon';
import { useSetRecoilState } from 'recoil';
import MenuDrawer, { menuDrawerState } from '@/layouts/mobile/MenuDrawer';
import IconButton from '@/components/common/IconButton';
import NavbarTreasury from '@/components/NavbarTreasury';
import { BaseHeader } from '@/layouts';
import NavbarBrand from '@/components/NavbarBrand';
import ThemeToggle from '@/components/ThemeToggle';
import { useGoblinDaoFunds } from '@/hooks/useGoblinDao';

const Main = tw.div`flex flex-col mb-7`;
const Content = tw.main`w-screen max-w-[768px] flex flex-col items-stretch h-full p-4`;

const MobileLayout: FC<{ children: ReactNode; floatingFooter?: boolean }> = ({
  children,
  floatingFooter,
}) => {
  const setNavbarVisible = useSetRecoilState(menuDrawerState);

  const { data: funds } = useGoblinDaoFunds();

  return (
    <div css={floatingFooter && tw`pb-20`}>
      <Main>
        <BaseHeader tw="justify-between">
          <div tw="md:hidden flex flex-row gap-2">
            <NavbarBrand />
            <NavbarTreasury treasuryBalance={funds || 0} />
            <ThemeToggle />
          </div>
          <IconButton
            tw="w-10 h-10"
            icon={<Icon.HamburgerMenu tw="text-2xl" />}
            onClick={() => setNavbarVisible(true)}
          />
        </BaseHeader>
        <Content>{children}</Content>
      </Main>
      <MenuDrawer />
    </div>
  );
};

export default MobileLayout;
