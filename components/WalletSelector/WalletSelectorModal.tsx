import React from 'react';
import { TONIC_CONTRACT_ID } from '@/config';
import { WalletSelector } from './index';
import Modal from '@/components/common/Modal';
import { useWalletPickerModal } from './state';

export const WalletSelectorModal: React.FC = () => {
  const [visible, setVisible] = useWalletPickerModal();

  return (
    <Modal
      mobileDisplay="fullscreen"
      visible={visible}
      onClose={() => setVisible(false)}
      render={({ closeModal }) => {
        return (
          <WalletSelector
            options={{
              contractId: TONIC_CONTRACT_ID,
            }}
            onClose={closeModal}
          />
        );
      }}
    />
  );
};

export default WalletSelectorModal;
