import tw, { styled } from 'twin.macro';
import React from 'react';
import Icon from '../Icon';

const FormBody = tw.div`flex flex-col items-stretch gap-4 p-4`;
// const FormTitle = Typography.Heading;
const FormLabel = tw.p`font-semibold text-base`;
const FormRoot = styled.form(tw`p-0 w-full`);
const Form = Object.assign(FormRoot, {
  Body: FormBody,
  Root: FormRoot,
  // Title: FormTitle,
  Label: FormLabel,
});

const FormAlertRoot = tw.div`flex items-center justify-between text-xs`;
export const FormAlertIcon: React.FC<{ variant?: 'warning' | 'error' }> = ({
  variant,
  ...props
}) => {
  return (
    <Icon.Warning
      tw="inline text-base shrink-0"
      css={variant === 'error' ? tw`text-red-500` : tw`text-amber-500`}
      {...props}
    />
  );
};
export const FormAlertLabel: React.FC<{
  children: React.ReactNode;
  variant?: 'warning' | 'error';
}> = ({ children, variant = 'error', ...props }) => {
  return (
    <span {...props}>
      <FormAlertIcon variant={variant} />{' '}
      <FormAlertText>{children}</FormAlertText>
    </span>
  );
};
export const FormAlertText = tw.span`opacity-60`;
export const FormAlert = Object.assign(FormAlertRoot, {
  Icon: FormAlertIcon,
  Text: FormAlertText,
  Label: FormAlertLabel,
});

export default Form;
