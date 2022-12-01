import { FC, ReactNode } from 'react';
import tw from 'twin.macro';
import Navbar from '@/components/Navbar';
import { BaseHeader } from '@/layouts';

const Wrapper = tw.div`w-screen flex flex-col overflow-auto`;
const Main = tw.div`flex flex-col`;
const Content = tw.main`flex flex-col container my-0 mx-auto p-10 w-full relative`;

const Header = () => {
  return (
    <BaseHeader>
      <Navbar />
    </BaseHeader>
  );
};

const DesktopLayout: FC<{ children: ReactNode }> = ({ children, ...props }) => {
  return (
    <Wrapper>
      <Main>
        <Header />
        <Content {...props}>{children}</Content>
      </Main>
    </Wrapper>
  );
};

export default DesktopLayout;
