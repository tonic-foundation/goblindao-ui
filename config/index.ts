import { ConnectConfig, keyStores } from 'near-api-js';
import { getNearConfig as getBaseNearConfig } from '@tonic-foundation/config';
import { TokenInfo } from '@tonic-foundation/token-list';
import { NEAR_METADATA } from '@tonic-foundation/token';
import { ProposalType } from '@/lib/services/goblinDao/types/proposal';

export const DATA_SEPARATOR = '$$$$';
export const YOKTO_NEAR = 1000000000000000000000000;

export const APP_TO_CONTRACT_PROPOSAL_TYPE = {
  [ProposalType.ChangeConfig]: 'config',
  [ProposalType.ChangePolicy]: 'policy',
  [ProposalType.AddMemberToRole]: 'add_member_to_role',
  [ProposalType.RemoveMemberFromRole]: 'remove_member_from_role',
  [ProposalType.FunctionCall]: 'call',
  [ProposalType.UpgradeSelf]: 'upgrade_self',
  [ProposalType.UpgradeRemote]: 'upgrade_remote',
  [ProposalType.Transfer]: 'transfer',
  [ProposalType.SetStakingContract]: 'set_vote_token',
  [ProposalType.AddBounty]: 'add_bounty',
  [ProposalType.BountyDone]: 'bounty_done',
  [ProposalType.Vote]: 'vote',
};
export const IS_DEV = process.env.NODE_ENV === 'development';

type NearEnv = 'testnet' | 'mainnet';
export const NEAR_ENV: NearEnv = (process.env.NEXT_PUBLIC_NEAR_ENV ||
  'testnet') as NearEnv;

/**
 * List of token that don't require storage balance. Used in swap and
 * withdrawls.
 */
export const STORAGE_EXEMPT_TOKENS = ['usn', 'near'];

/**
 * Account ID to collect referral fees. Fees are deposited directly into this
 * account's exchange balances. The account must have a storage deposit with
 * the exchange to receive fees.
 */
export const TONIC_CONTRACT_ID = process.env
  .NEXT_PUBLIC_TONIC_CONTRACT_ID as string;

export const GOBLIN_IPFS_URL = process.env.NEXT_PUBLIC_GOBLINS_IPFS_URL;
export const GOBLIN_DAO_ID = process.env.NEXT_PUBLIC_GOBLIN_DAO_ID as string;
export const TONIC_DAO_ID = process.env.NEXT_PUBLIC_TONIC_DAO_ID as string;
export const GOBLIN_HREF = 'https://greedygoblins.enleap.app/';
export const DISCORD_DEVELOPERS_HREF = 'https://discord.gg/tscr95ufxx';
export const DISCORD_GENERAL_HREF = 'https://discord.gg/zedYdpyaTd';
export const DOCS_GENERAL_HREF = 'https://docs.tonic.foundation';
export const GITHUB_HREF = 'https://github.com/tonic-foundation/tonic-x';
export const TELEGRAM_HREF = 'https://t.me/tonicdex';
export const TWITTER_HREF = 'https://twitter.com/tonicdex';
export const FEEDBACK_HREF = undefined;
export const NEAR_HREF = 'https://near.org';

export const LP_TOKEN_DECIMALS = 18;
export const DOLLAR_DECIMALS = 6;
export const DEFAULT_PRECISION = 2;

export const getNearConfig = (): ConnectConfig => ({
  ...getBaseNearConfig(NEAR_ENV),
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
});

// token info for native near. Used in swap token selector
export const NEAR_TOKEN_INFO: TokenInfo = {
  address: 'NEAR',
  nearEnv: 'mainnet',
  logoURI: NEAR_METADATA.icon!, // oof
  ...NEAR_METADATA,
};

function getTestnetExplorerUrl(type: 'account' | 'transaction', id: string) {
  if (type === 'account') {
    return `https://explorer.testnet.near.org/accounts/${id}`;
  }
  if (type === 'transaction') {
    return `https://explorer.testnet.near.org/transactions/${id}`;
  }
  throw new Error('Error getting explorer URL: invalid resource type');
}

function getMainnetExplorerUrl(type: 'account' | 'transaction', id: string) {
  if (type === 'account') {
    return `https://nearblocks.io/address/${id}`;
  }
  if (type === 'transaction') {
    return `https://nearblocks.io/txns/${id}`;
  }
  throw new Error('Error getting explorer URL: invalid resource type');
}

export function getExplorerUrl(type: 'account' | 'transaction', id: string) {
  switch (NEAR_ENV) {
    case 'testnet': {
      return getTestnetExplorerUrl(type, id);
    }
    case 'mainnet': {
      return getMainnetExplorerUrl(type, id);
    }
    default: {
      throw new Error('Error getting explorer URL: unknown NEAR env');
    }
  }
}
