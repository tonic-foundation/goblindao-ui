import { FC } from 'react';
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
      <NavbarItemBase href="" target="_blank">
        <div tw="text-sm mr-1 text-gray-500 font-medium lg:block hidden">
          Treasury
        </div>
        {/*<Icon.Near tw="w-4 h-4 text-black dark:text-white" />*/}
        <div tw="font-semibold text-black dark:text-white">
          <Typography.Currency value={treasuryBalance} unit={'USD'} unitAfter />
        </div>
      </NavbarItemBase>
    </div>
  );
};

export default NavbarTreasury;
