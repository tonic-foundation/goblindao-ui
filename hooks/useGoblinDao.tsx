import { TONIC_DAO_ID } from '@/config';
import useSWR, { SWRConfiguration } from 'swr';
import {
  getDaoFunds,
  getDaoProposal,
  getDaoProposals,
} from '@/lib/services/goblinDao';
import { Proposal } from '@/lib/services/goblinDao/types';

export function useGoblinDaoFunds(swrOpts?: Partial<SWRConfiguration>) {
  return useSWR<number>([TONIC_DAO_ID], getDaoFunds, swrOpts);
}

export function useGoblinDaoProposals(
  proposalId?: string,
  swrOpts?: Partial<SWRConfiguration>
) {
  return useSWR<Proposal[]>(
    `/proposals?offset=0&limit=1000&sort=createdAt,DESC`,
    getDaoProposals,
    swrOpts
  );
}

export function useGoblinDaoProposal(
  proposalId: string,
  swrOpts?: Partial<SWRConfiguration>
) {
  return useSWR<Proposal>([proposalId], getDaoProposal, swrOpts);
}
