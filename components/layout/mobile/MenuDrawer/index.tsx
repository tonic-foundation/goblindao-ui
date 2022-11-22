import React, { FC } from 'react';
import Modal from '@/components/common/Modal';
import { atom, useRecoilValue, useResetRecoilState } from 'recoil';
import Menu from '@/components/Menu';

export const menuDrawerState = atom<boolean>({
  key: 'menu-drawer-visibility',
  default: false,
});

const MenuDrawer: FC = () => {
  const visible = useRecoilValue(menuDrawerState);
  const closeModal = useResetRecoilState(menuDrawerState);

  return (
    <Modal
      visible={visible}
      onClose={closeModal}
      mobileDisplay="sidebar"
      render={({ closeModal }) => {
        return <Menu onClose={closeModal} />;
      }}
    />
  );
};

export default MenuDrawer;
