import { FC } from 'react';
import Link from 'next/link';
import Icon from '@/components/common/Icon';
import { truncateToLocaleString } from '@/lib/util';
import NavbarItemBase from '@/components/NavbarItemBase';

type NavbarTreasuryProps = {
  treasuryBalance?: number;
};
const NavbarTreasury: FC<NavbarTreasuryProps> = ({
  treasuryBalance = 23900,
  ...props
}) => {
  return (
    <div tw="flex flex-row items-center" {...props}>
      <Link href="">
        <NavbarItemBase target="_blank">
          <div tw="text-sm mr-1 text-gray-500 font-medium md:block hidden">
            Treasury
          </div>
          <Icon.Near tw="w-4 h-4 text-black dark:text-white" />
          <div tw="font-semibold text-black dark:text-white">
            {truncateToLocaleString(treasuryBalance, 0)}
          </div>
        </NavbarItemBase>
      </Link>
    </div>
  );
};

export default NavbarTreasury;
