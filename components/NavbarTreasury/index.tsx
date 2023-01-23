import { FC } from 'react';
import Link from 'next/link';
import NavbarItemBase from '@/components/NavbarItemBase';
import Typography from '../Typography';

type NavbarTreasuryProps = {
  treasuryBalance: number;
};
const NavbarTreasury: FC<NavbarTreasuryProps> = ({
  treasuryBalance,
  ...props
}) => {
  return (
    <div tw="flex flex-row items-center" {...props}>
      <Link href="">
        <NavbarItemBase target="_blank">
          <div tw="text-sm mr-1 text-gray-500 font-medium md:block hidden">
            Treasury
          </div>
          {/*<Icon.Near tw="w-4 h-4 text-black dark:text-white" />*/}
          <div tw="font-semibold text-black dark:text-white">
            <Typography.Currency
              value={treasuryBalance}
              unit={'USD'}
              unitAfter
            />
          </div>
        </NavbarItemBase>
      </Link>
    </div>
  );
};

export default NavbarTreasury;
