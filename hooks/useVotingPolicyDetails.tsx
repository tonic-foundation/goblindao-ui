import { DAO } from '@/lib/services/goblinDao/types';
import { formatYoktoValue } from '@/lib/util';
import { NEAR_DECIMALS } from '@tonic-foundation/token';

export function useVotingPolicyDetails(dao?: DAO): {
  balance: string;
  threshold: string;
  quorum: string;
} {
  const holdersRole = dao
    ? dao.policy.roles.find(
        (role) => role.kind === 'Member' && role.name === 'TokenHolders'
      )
    : null;

  if (!holdersRole) {
    return {
      balance: '0',
      threshold: '0',
      quorum: '0',
    };
  }

  const policy = holdersRole.votePolicy?.vote || holdersRole.votePolicy['*.*'];

  // TODO make Decimal Dynamic
  return {
    threshold: formatYoktoValue(policy?.weight ?? '0', NEAR_DECIMALS),
    balance: formatYoktoValue(holdersRole.balance ?? '0', NEAR_DECIMALS),
    quorum: formatYoktoValue(policy?.quorum ?? '0', NEAR_DECIMALS),
  };
}
