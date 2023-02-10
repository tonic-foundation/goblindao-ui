import 'twin.macro';
import React from 'react';
import tokenService, { IToken } from '@/lib/services/near/tokenlist';

const TokenIcon: React.FC<{
  tokenId?: string;
  token?: IToken;
}> = ({ tokenId, token, ...props }) => {
  if (!tokenId?.length && !token) {
    throw new Error('must provide either tokenId or token prop');
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const _token = token || tokenService.getToken(tokenId!); // guaranteed to exist if we get here

  return (
    <img
      alt={_token.name}
      tw="h-8 w-8 rounded-full object-cover"
      src={_token.logoURI}
      {...props}
    />
  );
};

export default TokenIcon;
