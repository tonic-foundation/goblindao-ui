import { LP_TOKEN_DECIMALS, NEAR_ENV, TONIC_CONTRACT_ID } from '@/config';

export * from './mainnet';
export * from './testnet';
export * from './types';

import { NearEnv } from '@tonic-foundation/config';
import { MAINNET_TOKENS } from './mainnet';
import { TESTNET_TOKENS } from './testnet';
import { IToken } from './types';

export interface LpTokenConfig {
  nearEnv: NearEnv;
  symbol?: string;
  address: string;
  logoURI: string;
  name?: string;
  shortName?: string;
}

function makeLpTokenInfo(
  nearEnv: NearEnv,
  config: Omit<LpTokenConfig, 'nearEnv'>
) {
  return {
    nearEnv,
    decimals: LP_TOKEN_DECIMALS,
    name: config.name || 'Tonic Index Token',
    shortName: config.shortName || 'Tonic Index',
    symbol: config.symbol || 'GIN',
    address: config.address,
    logoURI: config.logoURI,
    tags: [],
    extensions: {
      website: '',
      explorer: '',
      coingeckoId: 'invalid',
    },
  };
}

class TokenService {
  tokens: IToken[];
  constructor(
    readonly nearEnv: NearEnv,
    readonly lpConfig: Omit<LpTokenConfig, 'nearEnv'>
  ) {
    if (nearEnv === 'mainnet') {
      this.tokens = [...MAINNET_TOKENS, makeLpTokenInfo(nearEnv, lpConfig)];
    } else {
      this.tokens = [...TESTNET_TOKENS, makeLpTokenInfo(nearEnv, lpConfig)];
    }
  }

  getAllTokens(includeLp = false): IToken[] {
    return this.tokens.filter((t) =>
      includeLp ? true : t.address !== this.lpConfig.address
    );
  }

  getToken(tokenId: string): IToken {
    const allTokens = this.getAllTokens(true);
    const foundToken = allTokens.find(
      (t) => t.address.toLowerCase() === tokenId.toLowerCase()
    );
    if (!foundToken) {
      const allAddresses = allTokens.map((t) => t.address).join(', ');
      throw new Error(`Unsupported asset: ${tokenId} (${allAddresses})`);
    }
    return foundToken;
  }

  getDefaultStable(): IToken {
    const token = this.getAllTokens().find((t) => t.stable);
    if (!token) {
      throw new Error('No stable tokens supported');
    }
    return token;
  }
}

const tokenService = new TokenService(NEAR_ENV, {
  address: TONIC_CONTRACT_ID,
  logoURI: '/logo_v2.svg',
});

export default tokenService;
