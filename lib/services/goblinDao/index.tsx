import axios from 'axios';
import { DaoFundsResponse, Proposal, ProposalsResponse } from './types';

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
