import { FC, ReactNode } from 'react';
import tw from 'twin.macro';
import Menu from '@/components/Menu';
import usePageTitle from '@/hooks/usePageTitle';
import AuthButton from '@/components/AuthButton';
import Typography from '@/components/Typography';

const Wrapper = tw.div`h-screen w-screen flex dark:bg-neutral-900 overflow-auto`;
const Left = tw.div`flex justify-end border-r border-slate-100 dark:border-neutral-800`;
const Right = tw.div`grow flex flex-col items-stretch`;
const Content = tw.main`grow flex flex-col gap-8 items-stretch p-8 overflow-auto bg-slate-50 dark:bg-neutral-900`;

const BaseHeader = tw.header`
  py-4 px-8
  z-10 flex items-center justify-between gap-6
  sticky top-0
  border-b border-slate-100 bg-white
  dark:(bg-neutral-900 border-neutral-800)
`;
const Header = () => {
  const { title } = usePageTitle();

  return (
    <BaseHeader>
      <Typography.Title>{title}</Typography.Title>
      <AuthButton />
    </BaseHeader>
  );
};

const DefaultLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Wrapper>
      <Left>
        <Menu />
      </Left>
      <Right>
        <Header />
        {/* this extra div is necessary; without it, flexbox eats the bottom
          padding in Content (??) */}
        <Content>{children}</Content>
      </Right>
    </Wrapper>
  );
};

export default DefaultLayout;
