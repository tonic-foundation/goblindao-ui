// TODO: move this inside DefaultLayout dir
import { useIsMobile } from '@/hooks/useIsMobile';
import React from 'react';
import DesktopLayout from './desktop';
import MobileLayout from './mobile';

const DefaultLayout: React.FC<{
  children: React.ReactNode;
  floatingFooter?: boolean;
}> = ({ children, floatingFooter }) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <MobileLayout floatingFooter={floatingFooter}>{children}</MobileLayout>
    );
  }

  return <DesktopLayout>{children}</DesktopLayout>;
};

export default DefaultLayout;
