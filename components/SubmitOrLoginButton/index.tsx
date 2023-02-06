import React from 'react';
import { useWalletSelector } from '@/state/containers/WalletSelectorContainer';
import { useWalletPickerModal } from '@/components/WalletSelector/state';
import Button from '@/components/common/Button';
import Loading from '../common/Loading';

export const SubmitOrLoginButton: React.FC<{
  label: React.ReactNode;
  loadingLabel: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
}> = ({ label, loadingLabel, loading, disabled, ...props }) => {
  const { isSignedIn } = useWalletSelector();
  const [, showModal] = useWalletPickerModal();

  if (isSignedIn) {
    return (
      <Button
        variant="confirm"
        size="lg"
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span tw="flex items-center justify-center gap-2 mx-auto">
            <span>{loadingLabel}</span>
            <Loading.Spinner size="xxs" />
          </span>
        ) : (
          label
        )}
      </Button>
    );
  } else {
    return (
      <Button
        variant="confirm"
        size="lg"
        onClick={(e) => {
          e.preventDefault();
          showModal(true);
        }}
        {...props}
      >
        Connect wallet
      </Button>
    );
  }
};
