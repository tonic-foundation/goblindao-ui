import { TONIC_DAO_ID } from '@/config';
import useSWR, { SWRConfiguration } from 'swr';
import {
  getDaoById,
  getDaoFunds,
  getDaoMembersStats,
  getDaoProposal,
  getDaoProposals,
} from '@/lib/services/goblinDao';
import {
  Proposal,
  ProposalFeedItem,
} from '@/lib/services/goblinDao/types/proposal';
import { DAO, MemberStats } from '@/lib/services/goblinDao/types/dao';
import { useEffect, useState } from 'react';

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
  return useSWR<ProposalFeedItem>([proposalId], getDaoProposal, swrOpts);
}

export function useGoblinDaoData(daoId: string) {
  const [dao, setDao] = useState<DAO>();
  const [membersStats, setMembersStats] = useState<MemberStats[]>([]);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    if (daoId) {
      (async () => {
        try {
          const [daoData, membersStatsData] = await Promise.all([
            getDaoById(daoId),
            getDaoMembersStats(daoId),
          ]);

          setDao(daoData);
          setMembersStats(membersStatsData);
        } catch (e: unknown) {
          setError(e);
        }
      })();
    }
  }, [daoId]);

  return {
    dao,
    membersStats,
    error,
  };
}
