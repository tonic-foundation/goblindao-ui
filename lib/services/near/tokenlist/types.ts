import { NearEnv } from '@tonic-foundation/config';

// TODO XXX: make this match token-list type
export interface IToken {
  nearEnv: NearEnv;
  address: string;
  name: string;
  shortName?: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  // TODO: is this needed
  price?: number;
  tags?: string[];

  // extensions over the real IToken from token-list
  stable?: boolean;
  extensions: {
    website?: string;
    explorer?: string;
    coingeckoId?: string;
  };
}
