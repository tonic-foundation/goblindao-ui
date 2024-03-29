import { useIsMobile } from '@/hooks/useIsMobile';
import React from 'react';
import DesktopLayout from './desktop';
import MobileLayout from './mobile';
import tw from 'twin.macro';

export const BaseHeader = tw.header`container flex items-center my-0 mx-auto py-10 px-4`;

const AppLayout: React.FC<{
  children: React.ReactNode;
  floatingFooter?: boolean;
}> = ({ children, floatingFooter, ...props }) => {
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <MobileLayout {...props} floatingFooter={floatingFooter}>
        {children}
      </MobileLayout>
    );
  }

  return <DesktopLayout {...props}>{children}</DesktopLayout>;
};

export default AppLayout;
