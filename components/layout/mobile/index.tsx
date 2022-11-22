import { FC, ReactNode } from 'react';
import tw from 'twin.macro';
import Icon from '@/components/common/Icon';
import { useSetRecoilState } from 'recoil';
import MenuDrawer, {
  menuDrawerState,
} from '@/components/layout/mobile/MenuDrawer';
import IconButton from '@/components/common/IconButton';
import Heading from '@/components/common/Heading';
import usePageTitle from '@/hooks/usePageTitle';

const Content = tw.main`w-screen max-w-[768px] bg-white dark:bg-neutral-900 flex flex-col items-stretch p-4 py-8 h-full`;

const DefaultLayout: FC<{ children: ReactNode; floatingFooter?: boolean }> = ({
  children,
  floatingFooter,
}) => {
  const setMenuVisible = useSetRecoilState(menuDrawerState);
  const { title } = usePageTitle();

  return (
    // HACK: padding roughly accounts for the height of the footers we've used, though this is a hack.
    // A better design would be to pass custom style through so that the padding can be adjusted.
    <div css={floatingFooter && tw`pb-20`}>
      {/* TODO: refactor header */}
      <header tw="z-10 bg-white flex items-center justify-between p-4 sticky top-0 border-b border-slate-100 dark:(border-neutral-800 bg-neutral-900)">
        <Heading>{title}</Heading>
        <IconButton
          tw="w-10 h-10"
          icon={<Icon.HamburgerMenu tw="text-2xl" />}
          onClick={() => setMenuVisible(true)}
        />
      </header>
      <Content>{children}</Content>
      <MenuDrawer />
    </div>
  );
};

export default DefaultLayout;
