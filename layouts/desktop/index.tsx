import { FC, ReactNode } from 'react';
import tw from 'twin.macro';
import Navbar from '@/components/Navbar';
import { BaseHeader } from '@/layouts';

const Wrapper = tw.div`h-screen w-screen flex flex-col overflow-auto`;
const Main = tw.div`flex flex-col`;
const Content = tw.main`flex flex-col overflow-auto max-w-[1028px] my-0 mx-auto p-10 w-full`;

const Header = () => {
  return (
    <BaseHeader>
      <Navbar />
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
