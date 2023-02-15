import React, { FC, ReactNode } from 'react';
import Card from '@/components/common/Card';

interface NoVoteResultsViewProps {
  title: ReactNode;
  subTitle?: string;
  children?: ReactNode;
}

const NoVoteResultsView: FC<NoVoteResultsViewProps> = ({
  title,
  subTitle,
  children,
}) => {
  return (
    <Card tw="text-sm text-center mt-5">
      <div>{title}</div>
      <div>{subTitle}</div>
      {children}
    </Card>
  );
};

export default NoVoteResultsView;
