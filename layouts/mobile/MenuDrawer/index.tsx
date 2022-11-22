import React, { FC } from 'react';
import Modal from '@/components/common/Modal';
import { atom, useRecoilValue, useResetRecoilState } from 'recoil';

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
      mobileDisplay="menubar"
      render={({ closeModal }) => {
        return null;
      }}
    />
  );
};

export default MenuDrawer;
