import React, { FC } from 'react';
import Link from 'next/link';
import { NAVBAR_MENU } from '@/config/navbar';
import ThemeToggle from '@/components/ThemeToggle';
import AuthButton from '@/components/AuthButton';
import tw from 'twin.macro';
import IconButton from '@/components/common/IconButton';
import NavbarTreasury from '@/components/NavbarTreasury';
import NavbarBrand from '@/components/NavbarBrand';
import Icon from '@/components/common/Icon';
import { useRouter } from 'next/router';
import NavbarItemBase from '@/components/NavbarItemBase';
import { useGoblinDaoFunds } from '@/hooks/useGoblinDaoFunds';

const NavbarWrapper = tw.div`w-full flex md:flex-row flex-col justify-center items-center h-full`;

const Navbar: FC<{ onClose?: () => unknown }> = ({ onClose }) => {
  const router = useRouter();
  const currentRoute = router.pathname;

  const { data: funds } = useGoblinDaoFunds();

  return (
    <NavbarWrapper>
      <div tw="flex items-center justify-between w-full">
        <div tw="hidden md:flex gap-10">
          <NavbarBrand />
          <NavbarTreasury treasuryBalance={funds || 0} />
        </div>
        {onClose && (
          <div tw="absolute top-6 right-6">
            <IconButton.Close tw="w-10 h-10 text-2xl" onClick={onClose} />
          </div>
        )}
      </div>
      <nav tw="w-full flex md:flex-row flex-col items-center md:justify-end gap-3 px-4">
        <div tw="hidden md:flex">
          <ThemeToggle />
        </div>
        <div tw="flex w-full md:w-auto gap-3">
          {NAVBAR_MENU.map((m) => (
            <div tw="w-full md:w-auto" key={m.name}>
              {m.href ? (
                <Link passHref href={m.href}>
                  <NavbarItemBase
                    target={m.external ? '_blank' : undefined}
                    rel="noreferrer"
                    tw=""
                    currentRoute={currentRoute}
                    route={m.href}
                  >
                    {m.icon && <span tw="text-lg">{m.icon}</span>}
                    <span>{m.name}</span>
                  </NavbarItemBase>
                </Link>
              ) : (
                <NavbarItemBase>
                  <span>{m.name}</span>
                  {m.subMenu && (
                    <span>
                      <Icon.ChevronDown />
                    </span>
                  )}
                </NavbarItemBase>
              )}
              {/* TODO submenu */}
            </div>
          ))}
        </div>
        {/* TODO refactor AuthButton styles */}
        <AuthButton />
      </nav>
    </NavbarWrapper>
  );
};

export default Navbar;
