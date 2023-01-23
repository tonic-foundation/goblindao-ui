import { GOBLIN_DAO_ID } from '@/config';
import useSWR, { SWRConfiguration } from 'swr';
import { getDaoFundStats } from '@/lib/services/treasury_stats';

export function useGoblinDaoFunds(swrOpts?: Partial<SWRConfiguration>) {
  return useSWR<number>([GOBLIN_DAO_ID], getDaoFundStats, swrOpts);
}
