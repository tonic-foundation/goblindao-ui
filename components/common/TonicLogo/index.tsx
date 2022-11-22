import 'twin.macro';
import React, { useState } from 'react';

import { sleep } from '@/lib/util';

export const LogoIcon: React.FC = (props) => {
  return <img alt="" src="/logo_v2.svg" {...props} />;
};

const TonicLogo: React.FC<{ text?: string }> = ({
  text = 'Tonic',
  ...props
}) => {
  const [spinning, setSpinning] = useState(false);

  return (
    <div
      onMouseEnter={async () => {
        if (!spinning) {
          setSpinning(true);
          await sleep(700); // same as transition duration
          setSpinning(false);
        }
      }}
      tw="flex items-center gap-x-2 select-none"
      {...props}
    >
      <LogoIcon
        tw="h-8 w-8"
        // css={
        //   spinning &&
        //   tw`rotate-[540deg] transition-transform duration-700 ease-out`
        // }
      />
      <span tw="text-2xl cursor-default font-semibold whitespace-nowrap">
        {text}
      </span>
    </div>
  );
};

export default TonicLogo;
