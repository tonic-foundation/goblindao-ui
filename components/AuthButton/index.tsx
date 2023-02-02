import React, { useCallback, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { Popover as HeadlessPopover } from '@headlessui/react';

import Icon from '@/components/common/Icon';
import { useWalletSelector } from '@/state/containers/WalletSelectorContainer';
import useWalletBalance from '@/hooks/useWalletBalance';
import { getExplorerUrl, NEAR_TOKEN_INFO } from '@/config';
import BaseButton, {
  ButtonStyleOpts,
  buttonStyles,
} from '@/components/common/Button';
import { useWalletPickerModal } from '@/components/WalletSelector/state';
import { abbreviateCryptoString, sleep } from '@/lib/util';
import toast from 'react-hot-toast';
import Transition, { TransitionProps } from '@/components/Transition';
import Card from '@/components/common/Card';
import Typography from '../Typography';
import { border, hover, color } from '@/styles';

type PopoverProps = {
  panelProps?: {
    as?: React.ElementType;
    focus?: boolean;
    static?: boolean;
    unmount?: undefined;
  };
  transitionProps?: TransitionProps;
};

type TriggerProps = {
  open: boolean;
};

const buttonHover = tw`hover:(bg-brand-400 bg-opacity-5) dark:hover:text-brand-400`;
const Button = styled(BaseButton)(
  tw`rounded-none p-4 py-2 border-0 font-normal`
);
const ButtonLink = styled.a<ButtonStyleOpts>(
  buttonStyles,
  tw`rounded-none py-3 bg-transparent border-0 font-normal`
);

const DEFAULT_COPY_TEXT = 'Copy address';
function AccountPopover({ panelProps }: PopoverProps) {
  const { accountId, selector } = useWalletSelector();
  const [copyText, setCopyText] = useState(DEFAULT_COPY_TEXT);

  const disconnect = useCallback(async () => {
    const wallet = await selector.wallet();
    wallet.signOut();
    toast.error('Wallet disconnected');
  }, [selector]);

  const copy = useCallback(async () => {
    if (accountId) {
      await navigator.clipboard.writeText(accountId);
      setCopyText('Copied!');
      toast.success('Copied!');

      await sleep(2_000);
      setCopyText(DEFAULT_COPY_TEXT);
    }
  }, [accountId]);

  return (
    <HeadlessPopover tw="relative self-stretch">
      {({ open }) => (
        <React.Fragment>
          <AccountPopoverTrigger open={open} />
          <Transition
            as={React.Fragment}
            enterFrom={tw`opacity-0 -translate-y-2`}
            enterTo={tw`opacity-100 translate-y-0`}
            leaveTo={tw`opacity-0 -translate-y-2`}
            enter={tw`transition duration-200`}
            leave={tw`transition duration-200`}
          >
            <HeadlessPopover.Panel
              tw="absolute z-10 transform md:top-full md:bottom-0 bottom-full top-auto left-0 right-0"
              {...panelProps}
            >
              <Card
                tw="shadow-lg md:rounded-t-none border-t-0 rounded-xl border-[2px]
                    md:rounded-b-md rounded-b-none p-0 flex md:flex-col flex-col-reverse
                    items-stretch min-w-max w-full overflow-hidden"
                css={color.border}
              >
                <Button
                  tw="text-sm px-3 bg-transparent"
                  css={buttonHover}
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    copy();
                  }}
                >
                  {copyText}
                </Button>
                <ButtonLink
                  size="sm"
                  tw="text-sm text-center px-3"
                  css={buttonHover}
                  href={getExplorerUrl('account', accountId || 'anon')}
                  target="_blank"
                  rel="noreferrer"
                >
                  View in explorer
                </ButtonLink>
                <Button
                  variant="error"
                  tw="text-sm"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    disconnect();
                  }}
                >
                  Disconnect
                </Button>
              </Card>
            </HeadlessPopover.Panel>
          </Transition>
        </React.Fragment>
      )}
    </HeadlessPopover>
  );
}

function AccountPopoverTrigger({ open }: TriggerProps) {
  const { accountId } = useWalletSelector();
  const { data: nearBalance } = useWalletBalance(NEAR_TOKEN_INFO.symbol);

  return (
    <HeadlessPopover.Button
      tw="w-full flex items-center justify-center gap-2 py-2 px-3 border-[2px] rounded-xl"
      css={[
        border.default,
        hover.default,
        open &&
          tw`md:rounded-b-none md:rounded-t-xl rounded-b-xl rounded-t-none bg-brand-400 shadow-lg bg-opacity-5 transition duration-200 text-brand-400`,
      ]}
    >
      <span tw="flex items-center">
        <Icon.Tonic tw="w-4 h-4" />
        <span tw="ml-2 font-bold text-xs">
          {abbreviateCryptoString(accountId || 'anon', 12, 3)}
        </span>
        <span tw="ml-2 text-xs p-1 bg-neutral-100/10 rounded-sm">
          <Typography.Currency
            value={nearBalance}
            unit="NEAR"
            fallback="---"
            unitAfter
          />
        </span>
      </span>
    </HeadlessPopover.Button>
  );
}

const AuthButton: React.FC = (props) => {
  const { accountId } = useWalletSelector();
  const [, showWalletPicker] = useWalletPickerModal();

  if (!accountId) {
    return (
      <BaseButton
        variant="confirm"
        tw="p-3"
        onClick={(e) => {
          e.preventDefault();
          showWalletPicker(true);
        }}
        {...props}
      >
        Connect
      </BaseButton>
    );
  }

  return <AccountPopover {...props} />;
};

export default AuthButton;
