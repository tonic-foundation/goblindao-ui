import { GOBLIN_DAO_ID } from '@/config';
import useSWR, { SWRConfiguration } from 'swr';
import {
  getDaoFunds,
  getDaoProposals,
  Proposal,
} from '@/lib/services/goblinDao';

export function useGoblinDaoFunds(swrOpts?: Partial<SWRConfiguration>) {
  return useSWR<number>([GOBLIN_DAO_ID], getDaoFunds, swrOpts);
}

export function useGoblinDaoProposals(swrOpts?: Partial<SWRConfiguration>) {
  return useSWR<Proposal[]>(
    `/proposals?offset=0&limit=1000&sort=createdAt,DESC`,
    getDaoProposals,
    swrOpts
  );
}
