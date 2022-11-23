import Icon from '@/components/common/Icon';
import React from 'react';

export interface INavbarMenuItem {
  name: string;
  href?: string;
  icon: React.ReactNode;
  external?: boolean;
  subMenu?: INavbarMenuItem[];
}

export const NAVBAR_MENU: INavbarMenuItem[] = [
  {
    href: '/vote',
    name: 'DAO',
    icon: <Icon.GroupPeople />,
  },
];
