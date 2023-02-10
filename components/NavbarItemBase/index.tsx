import tw, { styled } from 'twin.macro';
import Link from 'next/link';

const NavbarItemBase = styled(Link)<{
  currentRoute?: string;
  route?: string;
  alsoMatch?: string[];
}>(
  tw`flex gap-2 items-center rounded-xl font-medium 
  justify-center text-center
  py-2 px-3 border cursor-pointer hover:bg-fuchsia-600/10 dark:hover:bg-fuchsia-500/30 whitespace-nowrap
  transition`,
  ({ currentRoute, route, alsoMatch }) =>
    currentRoute &&
    route &&
    (currentRoute === route || alsoMatch?.find((r) => r === currentRoute))
      ? tw`bg-fuchsia-600/10 text-fuchsia-600 dark:(text-white bg-fuchsia-700/90 hover:bg-fuchsia-700)`
      : tw`bg-transparent`
);

export default NavbarItemBase;
