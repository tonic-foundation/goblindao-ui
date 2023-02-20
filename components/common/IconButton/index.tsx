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
  w-6 h-6 rounded-full
  flex items-center justify-center text-base
  hover:(transition-colors bg-neutral-200)
  hover:dark:text-deep-blue-900
  disabled:(opacity-40 hover:opacity-40 cursor-not-allowed hover:bg-transparent dark:bg-none dark:hover:bg-transparent)
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
