import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useKey } from 'react-use';
import tw, { css, styled, TwStyle } from 'twin.macro';
import { ClickHandler } from '@/types/event-handlers';
import { sleep } from '@/lib/util';
import Card from '../Card';

// XXX: mobile modal might be broken. it's never (?) used, though
type MobileDisplay = 'drawer' | 'modal' | 'fullscreen' | 'menubar';

export interface ModalProps {
  visible?: boolean;
  onClose?: () => unknown;
  /**
   * ID of DOM element to render inside of. Defaults to 'root'.
   */
  wrapperId?: string;
  /**
   * Render as a drawer on mobile. Defaults to `false`.
   */
  mobileDisplay?: MobileDisplay;
  /**
   * Whether clicking the background/pressing ESC should close this modal.
   *
   * Defaults to true.
   */
  shouldHandleClose?: boolean;
  render?: (props: { closeModal: () => unknown }) => React.ReactNode;
  disableTransitions?: boolean;
  children?: React.ReactElement;
}

export type ModalComponent<T> = React.FC<ModalProps & T>;

export const ModalHeader = tw.header`text-lg px-6 pt-6 flex items-center justify-between`;
export const ModalBody = tw.div`p-6 flex flex-col overflow-auto`;
const Container = styled.div<{ visible: boolean }>(({ visible }) => [
  tw`
    fixed z-40 inset-0 overflow-hidden
    flex items-center justify-center
    transition-opacity duration-300
  `,
  visible ? tw`opacity-100` : tw`opacity-0`,
]);
const Backdrop = tw.div`absolute inset-0 bg-slate-500 bg-opacity-80`;

/**
 * Style to use when content not visible, nameley
 *
 * - if normal modal, opacity -> 0 and scale down slightly
 * - if bottom drawer, opacity -> 0 and slide down
 */
const contentInvisibleStyles = (mobileDisplay: MobileDisplay) => {
  if (mobileDisplay !== 'drawer') {
    return css`
      transform: scale(99%);
    `;
  }
  return css`
    @media (max-width: 639px) {
      transform: translateY(50%);
    }
    @media (min-width: 640px) {
      transform: scale(99%);
    }
  `;
};

const ContentWrapper = styled(Card)<{
  visible: boolean;
  mobileDisplay: MobileDisplay;
}>(({ visible, mobileDisplay }) => {
  // misnamed
  const radiusStyle: TwStyle =
    mobileDisplay === 'drawer'
      ? // TODO: refactor radius
        tw`rounded-2xl rounded-b-none sm:rounded-2xl`
      : mobileDisplay === 'modal'
      ? tw`mx-6 sm:mx-auto`
      : tw`rounded-none sm:rounded-2xl overflow-hidden`;

  const positionStyle =
    mobileDisplay === 'drawer'
      ? css`
          @media (max-width: 639px) {
            position: fixed;
            bottom: 0;
            padding-bottom: env(safe-area-inset-bottom);
          }
        `
      : mobileDisplay === 'fullscreen'
      ? css`
          @media (max-width: 639px) {
            position: fixed;
            bottom: 0;
            top: 0;
            left: 0;
            right: 0;
            padding-bottom: env(safe-area-inset-bottom);
          }
        `
      : mobileDisplay === 'menubar'
      ? css`
          @media (max-width: 768px) {
            position: fixed;
            bottom: 0;
            top: 0;
            left: 0;
            right: 0;
            border-radius: 0;
            padding-bottom: env(safe-area-inset-bottom);
          }
        `
      : undefined;

  return [
    tw`
    p-0
    relative mx-auto
    w-full sm:w-auto
    transition-transform duration-300
  `,
    // mobile drawer needs big radius to look good.
    // modal can retain card's default radius.
    radiusStyle,
    positionStyle,
    visible
      ? tw`sm:shadow-2xl translate-y-0 scale-100`
      : contentInvisibleStyles(mobileDisplay),
  ];
});

const Modal: React.FC<ModalProps> = ({
  visible,
  children,
  render,
  onClose = () => null,
  shouldHandleClose = true,
  disableTransitions = false,
  mobileDisplay = 'fullscreen',
  wrapperId = 'root',
  ...props
}) => {
  // The `visible` prop controls whether to render the modal.
  // These inner states control transitions and react to the visible prop.
  const [modalVisible, setModalVisible] = useState(visible);
  const [contentVisible, setContentVisible] = useState(visible);

  const handleClose = useCallback(async () => {
    setContentVisible(false);
    setModalVisible(false);
    // wait for transition
    sleep(300).then(onClose);
  }, [onClose]);

  useEffect(() => {
    if (disableTransitions) {
      setModalVisible(visible);
      setContentVisible(visible);
      return;
    }
    if (visible) {
      setModalVisible(true);
      // wait for a new "tick" (doesn't really matter how long this sleep is)
      sleep(25).then(() => setContentVisible(true));
    } else {
      handleClose();
    }
  }, [disableTransitions, handleClose, visible]);

  const handleClickBackground: ClickHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (shouldHandleClose) {
        handleClose();
      }
    },
    [shouldHandleClose, handleClose]
  );

  useKey(
    'Escape',
    (e) => {
      if (shouldHandleClose) {
        if (e.key === 'Escape') {
          e.stopPropagation();
          e.preventDefault();
          handleClose();
        }
      }
    },
    { event: 'keydown' },
    [handleClose, shouldHandleClose]
  );

  if (!visible) {
    return <React.Fragment />;
  }
  return createPortal(
    <Container
      role="dialog"
      aria-modal="true"
      visible={!!modalVisible}
      {...props}
    >
      <Backdrop aria-hidden="true" onClick={handleClickBackground} />
      <ContentWrapper mobileDisplay={mobileDisplay} visible={!!contentVisible}>
        {render ? render({ closeModal: handleClose }) : children}
      </ContentWrapper>
    </Container>,
    document.getElementById(wrapperId)!
  );
};

export default Modal;
