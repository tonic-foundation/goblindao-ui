import { NEAR_DECIMALS, NEAR_ICON_SVG_DATA_URI } from '@tonic-foundation/token';
import { IToken } from './types';

export const MAINNET_TOKENS: IToken[] = [
  {
    decimals: NEAR_DECIMALS,
    name: 'NEAR',
    symbol: 'NEAR',
    address: 'near',
    nearEnv: 'mainnet',
    logoURI: NEAR_ICON_SVG_DATA_URI,
    tags: [],
    extensions: {
      website: '',
      explorer: '',
      coingeckoId: 'near',
    },
  },
  {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
    address: 'aurora',
    nearEnv: 'mainnet',
    logoURI:
      'https://raw.githubusercontent.com/tonic-foundation/token-list/master/images/aurora.png',
    tags: [],
    extensions: {
      website: '',
      explorer: 'https://nearblocks.io/address/aurora',
      coingeckoId: 'Ethereum',
    },
  },
  {
    stable: true,
    name: 'Tether USD',
    symbol: 'USDT',
    decimals: 6,
    address: 'usdt.tether-token.near',
    nearEnv: 'mainnet',
    logoURI: `data:image/svg+xml,%3Csvg width='111' height='90' viewBox='0 0 111 90' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M24.4825 0.862305H88.0496C89.5663 0.862305 90.9675 1.64827 91.7239 2.92338L110.244 34.1419C111.204 35.7609 110.919 37.8043 109.549 39.1171L58.5729 87.9703C56.9216 89.5528 54.2652 89.5528 52.6139 87.9703L1.70699 39.1831C0.305262 37.8398 0.0427812 35.7367 1.07354 34.1077L20.8696 2.82322C21.6406 1.60483 23.0087 0.862305 24.4825 0.862305ZM79.8419 14.8003V23.5597H61.7343V29.6329C74.4518 30.2819 83.9934 32.9475 84.0642 36.1425L84.0638 42.803C83.993 45.998 74.4518 48.6635 61.7343 49.3125V64.2168H49.7105V49.3125C36.9929 48.6635 27.4513 45.998 27.3805 42.803L27.381 36.1425C27.4517 32.9475 36.9929 30.2819 49.7105 29.6329V23.5597H31.6028V14.8003H79.8419ZM55.7224 44.7367C69.2943 44.7367 80.6382 42.4827 83.4143 39.4727C81.0601 36.9202 72.5448 34.9114 61.7343 34.3597V40.7183C59.7966 40.8172 57.7852 40.8693 55.7224 40.8693C53.6595 40.8693 51.6481 40.8172 49.7105 40.7183V34.3597C38.8999 34.9114 30.3846 36.9202 28.0304 39.4727C30.8066 42.4827 42.1504 44.7367 55.7224 44.7367Z' fill='%23009393'/%3E%3C/svg%3E`,
    tags: ['rainbow'],
    extensions: {
      website: '',
      explorer: 'https://nearblocks.io/address/usdt.tether-token.near',
      coingeckoId: 'tether',
    },
  },
];
