import axios from 'axios';
import { TONIC_CONTRACT_ID } from '@/config';
import { tgasAmount } from '@tonic-foundation/utils';
import {
  CreateProposalFunctionCall,
  CreateProposalTransfer,
  ProposalFeedItem,
  ProposalFeedItemResponse,
  ProposalsResponse,
} from '@/lib/services/goblinDao/types/proposal';
import {
  DAO,
  DaoDelegation,
  DaoDTO,
  DaoFundsResponse,
  MemberStats,
} from '@/lib/services/goblinDao/types/dao';
import {
  mapDaoDTOtoDao,
  mapProposalFeedItemResponseToProposalFeedItem,
} from '@/lib/services/goblinDao/helpers';

const sputnik = axios.create({
  baseURL: 'https://api.testnet.app.astrodao.com/api/v1',
});

/**
 * DAO Funds
 * @name getDaoFunds
 * @method GET
 * @param daoId
 * @return number
 */
export async function getDaoFunds(daoId: string) {
  const url = `/stats/dao/${daoId}/funds`;
  const response = await sputnik.get<DaoFundsResponse[]>(url);

  return response.data?.length
    ? response.data[response.data.length - 1].value
    : 0;
}

/**
 * DAO Proposals
 * @name getDaoProposals
 * @method GET
 * @param url {string}
 * @return ProposalsResponse
 */
export async function getDaoProposals(url: string) {
  const response = await sputnik.get<ProposalsResponse>(url);

  // If needed get offset, limit here
  return response.data?.data.sort((a, b) =>
    a.createdAt > b.createdAt ? -11 : a.createdAt === b.createdAt ? 0 : 1
  );
}

/**
 * DAO Proposal by id
 * @name getDaoProposal
 * @method GET
 * @param proposalId {string}
 * @param accountId {string}
 * @return {ProposalFeedItem}
 */
export async function getDaoProposal(proposalId: string, accountId?: string) {
  const url = `/proposals/${proposalId}?accountId=${accountId || ''}`;
  const response = await sputnik.get<ProposalFeedItemResponse>(url);

  return mapProposalFeedItemResponseToProposalFeedItem(
    response.data
  ) as ProposalFeedItem;
}

/**
 * DAO Members Stats
 * @name getDaoMembersStats
 * @method GET
 * @param daoId {string}
 * @return {MemberStats[]}
 */
export async function getDaoMembersStats(daoId: string) {
  const url = `/daos/${daoId}/members`;
  const response = await sputnik.get<MemberStats[]>(url);

  return response.data;
}

/**
 * DAO
 * @name getDaoById
 * @method GET
 * @param daoId {string}
 * @return {DaoDTO}
 */
export async function getDaoById(daoId: string) {
  const url = `/daos/${daoId}`;
  const response = await sputnik.get<DaoDTO>(url);

  return mapDaoDTOtoDao(response.data) as DAO;
}

/**
 * DAO Delegations
 * @name getDaoDelegation
 * @method GET
 * @param daoId {string}
 * @return {DaoDelegation[]}
 */
export async function getDaoDelegation(
  daoId: string
): Promise<DaoDelegation[]> {
  const response = await sputnik.get<DaoDelegation[]>(
    `/daos/${daoId}/delegations`
  );

  return response.data;
}

/**
 * Create Proposal FunctionCalls Args
 * @name   createProposalFunctionCallArgs
 * @param  {
 *   description: sting,
 *   method_name: string,
 *   deposit: BN,
 *   args: string,
 *   gas: BN,
 *   receiver_id: string,
 * }
 */
export function createProposalFunctionCallArgs({
  description,
  method_name,
  deposit,
  args,
  gas = tgasAmount(150),
  receiver_id = TONIC_CONTRACT_ID,
}: CreateProposalFunctionCall) {
  return {
    proposal: {
      description,
      kind: {
        FunctionCall: {
          receiver_id,
          actions: [
            {
              method_name,
              args,
              deposit: deposit.toString(),
              gas: gas.toString(),
            },
          ],
        },
      },
    },
  };
}

/**
 * Create Proposal Transfer Args
 * @name   createProposalTransferArgs
 * @param  {
 *   description: string,
 *   transferAmount: BN,
 *   target: string,
 *   tokenId: string = '',
 * }
 */
export function createProposalTransferArgs({
  description,
  amount,
  receiver_id,
  token_id = '',
}: CreateProposalTransfer) {
  return {
    proposal: {
      description,
      kind: {
        Transfer: {
          token_id,
          receiver_id,
          amount: amount.toString(),
        },
      },
    },
  };
}
