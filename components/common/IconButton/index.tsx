import { ClickHandler } from '@/types/event-handlers';
import React from 'react';
import tw from 'twin.macro';
import Icon from '../Icon';

interface BaseProps {
  hideOnMobile?: boolean;
  onClick?: ClickHandler;
  disabled?: boolean;
}

function curried<T = unknown>(icon: React.ReactNode): React.FC<BaseProps & T> {
  // eslint-disable-next-line react/display-name
  return (props) => <BaseIconButton icon={icon} {...props}></BaseIconButton>;
}

const BaseButton = tw.button`
  w-9 h-9 rounded-full
  transition
  border border-solid
  flex items-center justify-center text-base
  hover:bg-neutral-200
  dark:hover:bg-neutral-600
  disabled:(opacity-60 cursor-not-allowed bg-neutral-200 dark:bg-neutral-600)
`;

const BaseIconButton: React.FC<
  BaseProps & {
    icon: React.ReactNode;
  }
> = ({ icon, hideOnMobile, ...props }) => {
  return (
    <BaseButton
      {...props}
      css={hideOnMobile && tw`hidden md:flex`}
      type="button"
    >
      {icon}
    </BaseButton>
  );
};

const IconButton = Object.assign(BaseIconButton, {
  Close: curried(<Icon.Close />),
  Back: curried(<Icon.Back />),
});

export default IconButton;
