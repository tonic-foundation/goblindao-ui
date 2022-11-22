import Icon from '@/components/common/Icon';
import React from 'react';

export interface IMenuItem {
  name: string;
  href?: string;
  icon: React.ReactNode;
  external?: boolean;
  subMenu?: IMenuItem[];
}

export const MENU: IMenuItem[] = [
  {
    href: '/',
    name: 'Home',
    icon: <Icon.Home />,
    subMenu: [{ href: '/sub-home', name: 'Sub Home', icon: <Icon.Home /> }],
  },
];
