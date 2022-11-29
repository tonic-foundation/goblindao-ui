import Modal from '@/components/common/Modal';
import React from 'react';
import {
  atom,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import BidsHistory from './index';

const bidsHistoryModalState = atom<boolean>({
  key: 'bids-history-modal-state',
  default: false,
});

const BidsHistoryModal = () => {
  const modalState = useRecoilValue(bidsHistoryModalState);
  const closeModal = useResetRecoilState(bidsHistoryModalState);

  return (
    <Modal
      visible={modalState}
      onClose={closeModal}
      mobileDisplay="modal"
      render={({ closeModal }) => {
        return <BidsHistory onClose={closeModal} />;
      }}
    />
  );
};

export default BidsHistoryModal;

export function useBidsHistoryModal() {
  const setModal = useSetRecoilState(bidsHistoryModalState);
  const closeModal = useResetRecoilState(bidsHistoryModalState);

  return {
    showModal: (p: boolean) => setModal(p),
    closeModal,
  } as const;
}
