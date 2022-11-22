import { FC, ReactNode } from 'react';
import tw from 'twin.macro';
// import Menu from '@/components/Menu';
import AuthButton from '@/components/AuthButton';

const Wrapper = tw.div`h-screen w-screen flex dark:bg-neutral-900 overflow-auto grow flex flex-col items-stretch`;
const Container = tw.div`grow flex flex-col items-stretch`;
const Content = tw.main`grow flex flex-col gap-8 items-stretch p-8 overflow-auto bg-slate-50 dark:bg-neutral-900`;

const BaseHeader = tw.header`
  py-4 px-8
  z-10 flex items-center justify-end gap-6
  sticky top-0
  border-b border-slate-100 bg-white
  dark:(bg-neutral-900 border-neutral-800)
`;
const Header = () => {
  return (
    <BaseHeader>
      <AuthButton />
    </BaseHeader>
  );
};

const DefaultLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Wrapper>
      {/*<Menu />*/}
      <Container>
        <Header />
        <Content>{children}</Content>
      </Container>
    </Wrapper>
  );
};

export default DefaultLayout;
