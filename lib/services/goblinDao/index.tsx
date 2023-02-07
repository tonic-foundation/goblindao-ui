import axios from 'axios';
import {
  CreateProposalFunctionCall,
  CreateProposalTransfer,
  DaoFundsResponse,
  Proposal,
  ProposalsResponse,
} from './types';
import { TONIC_CONTRACT_ID } from '@/config';
import { tgasAmount } from '@tonic-foundation/utils';

const sputnik = axios.create({
  baseURL: 'https://api.app.astrodao.com/api/v1',
});

/**
 * DAO Funds
 * @name getDaoFunds
 * @desc Get goblin dao funds
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
 * @desc get goblin dao proposals list
 * @method GET
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
 * @desc get goblin dao proposal by id
 * @method GET
 * @return Proposal
 */
export async function getDaoProposal(proposalId: string) {
  const url = `/proposals/${proposalId}`;
  const response = await sputnik.get<Proposal>(url);

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
