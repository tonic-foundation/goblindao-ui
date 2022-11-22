import { FC, ReactNode } from 'react';
import tw from 'twin.macro';
import AuthButton from '@/components/AuthButton';
import Navbar from '@/components/Navbar';

const Wrapper = tw.div`h-screen w-screen flex dark:bg-neutral-900 overflow-auto grow flex flex-col items-stretch`;
const Main = tw.div`flex flex-col items-stretch`;
const Content = tw.main`grow flex flex-col gap-8 items-stretch p-8 overflow-auto container my-0 mx-auto`;

const BaseHeader = tw.header`
  py-4 px-8
  grow
  container z-10 flex items-center
  justify-end gap-6 bg-white
  my-0 mx-auto
`;
const Header = () => {
  return (
    <BaseHeader>
      <Navbar />
      <AuthButton />
    </BaseHeader>
  );
};

const DesktopLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Wrapper>
      <Main>
        <Header />
        <Content>{children}</Content>
      </Main>
    </Wrapper>
  );
};

export default DesktopLayout;
