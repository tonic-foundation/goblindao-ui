import tw, { styled } from 'twin.macro';

const NavbarItemBase = styled.a<{
  currentRoute?: string;
  route?: string;
}>(
  tw`flex gap-2 items-center rounded-xl font-medium 
  justify-center text-center
  py-2 px-3 border cursor-pointer hover:bg-gray-100 dark:bg-neutral-800 hover:text-black
  text-neutral-600 dark:text-neutral-400 transition`,
  ({ currentRoute, route }) =>
    currentRoute && route && currentRoute === route
      ? tw`bg-gray-100 text-black dark:text-white`
      : tw`bg-white dark:hover:text-white`
);

export default NavbarItemBase;
