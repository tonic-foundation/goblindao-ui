import React, { FC } from 'react';
import { NAVBAR_LINKS, NavbarMenuLink } from '@/config/navbar';
import ThemeToggle from '@/components/ThemeToggle';
import AuthButton from '@/components/AuthButton';
import tw from 'twin.macro';
import NavbarTreasury from '@/components/NavbarTreasury';
import NavbarBrand from '@/components/NavbarBrand';
import Icon from '@/components/common/Icon';
import { useRouter } from 'next/router';
import { useGoblinDaoFunds } from '@/hooks/useGoblinDao';
import { NEAR_ENV } from '@/config';
import NavbarItemBase from '@/components/NavbarItemBase';

const NavbarWrapper = tw.div`w-full flex md:flex-row flex-col justify-center items-center h-full`;

type NavProps = {
  links: NavbarMenuLink[];
  menuOnClose?: () => unknown;
};

function shouldHide(link: NavbarMenuLink) {
  if (link.hidden) {
    return true;
  }
  if (link.nearEnv) {
    return NEAR_ENV !== link.nearEnv;
  }
  return false;
}

const Nav: FC<NavProps> = ({ links, menuOnClose }) => {
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <nav tw="w-full flex md:flex-row flex-col items-center md:justify-end gap-3 px-4 sm:py-0 py-7">
      <div tw="hidden md:flex">
        <ThemeToggle />
      </div>
      <div tw="flex w-full md:w-auto gap-3">
        {links.map((link) =>
          shouldHide(link) ? null : (
            <div tw="w-full md:w-auto" key={link.name}>
              {link.href ? (
                <NavbarItemBase
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel="noreferrer"
                  tw=""
                  currentRoute={currentRoute}
                  route={link.href}
                  onClick={() => {
                    if (menuOnClose) {
                      menuOnClose();
                    }
                  }}
                >
                  {link.icon && <span tw="text-lg">{link.icon}</span>}
                  <span>{link.name}</span>
                </NavbarItemBase>
              ) : (
                <NavbarItemBase href="">
                  <span>{link.name}</span>
                  {link.subMenu && (
                    <span>
                      <Icon.ChevronDown />
                    </span>
                  )}
                </NavbarItemBase>
              )}
            </div>
          )
        )}
      </div>
      {/* TODO refactor AuthButton styles */}
      <AuthButton />
    </nav>
  );
};

const Navbar: FC<{ onClose?: () => unknown }> = ({ onClose }) => {
  const { data: funds } = useGoblinDaoFunds();

  return (
    <NavbarWrapper>
      <div tw="flex items-center justify-between w-full">
        <div tw="hidden md:flex gap-10">
          <NavbarBrand />
          <NavbarTreasury treasuryBalance={funds || 0} />
        </div>
      </div>
      <Nav links={NAVBAR_LINKS} menuOnClose={onClose} />
    </NavbarWrapper>
  );
};

export default Navbar;
