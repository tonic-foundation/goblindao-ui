import Icon from '@/components/common/Icon';
import React from 'react';

export interface MenuLink {
  href: string;
  name: string;
  icon: React.ReactNode;
  external?: boolean;
}

export const MENU_LINKS: MenuLink[] = [
  {
    href: '/',
    name: 'Home',
    icon: <Icon.Home />,
  },
];
