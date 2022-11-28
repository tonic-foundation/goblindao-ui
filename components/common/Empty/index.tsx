// Used to show that there are no records to display, eg, no proposals, no
// activity, error loading activity, etc.

import React from 'react';
import Card from '../Card';

const Empty: React.FC<{ children?: React.ReactNode }> = ({
  children,
  ...props
}) => {
  return (
    <Card hover="pointer" tw="py-10 flex flex-col items-center" {...props}>
      <div tw="font-medium opacity-50">{children}</div>
    </Card>
  );
};

export default Empty;
