import React, { FC, ReactNode } from 'react';

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
    <div>
      <div>{title}</div>
      <div>{subTitle}</div>
      {children}
    </div>
  );
};

export default NoVoteResultsView;
