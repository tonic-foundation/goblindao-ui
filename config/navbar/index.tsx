import Icon from '@/components/common/Icon';
import React from 'react';
import { NearEnv } from '@tonic-foundation/config';

export interface NavbarMenuLink {
  name: string;
  href: string;
  icon: React.ReactNode;
  external?: boolean;
  subMenu?: NavbarMenuLink[];
  alsoMatch?: string[];
  hidden?: boolean;
  /**
   * if set, will only show this link for this near env
   */
  nearEnv?: NearEnv;
}

export const NAVBAR_LINKS: NavbarMenuLink[] = [
  {
    href: '/governance',
    name: 'DAO',
    icon: <Icon.GroupPeople />,
  },
  {
    href: '/explore',
    name: 'Explore',
    icon: <Icon.Explore />,
  },
];
