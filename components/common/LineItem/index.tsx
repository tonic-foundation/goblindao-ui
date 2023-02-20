import React from 'react';
import tw from 'twin.macro';

const Container = tw.div`text-xs font-medium flex items-center justify-between gap-2.5`;
const Line = tw.hr`grow border-dashed dark:opacity-50`;
const Label = tw.span`text-neutral-700 dark:text-neutral-200`;
const Content = tw.span``;

const LineItemRoot: React.FC<{
  label: string | React.ReactElement;
  content: string | React.ReactElement;
}> = ({ label, content, ...props }) => {
  return (
    <Container {...props}>
      <Label>{label}</Label>
      <Line />
      <Content>{content}</Content>
    </Container>
  );
};

const LineItem = Object.assign(LineItemRoot, {
  Container,
  Line,
  Label,
  Content,
});

export default LineItem;
