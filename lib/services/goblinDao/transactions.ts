import { decimalToBn, MAX_GAS } from '@tonic-foundation/utils';
import { StandardNearFunctionCall } from '@tonic-foundation/transaction/lib/shim';
import BN from 'bn.js';
import { NEAR_DECIMALS } from '@tonic-foundation/token';

function nearAmount(n: number) {
  return decimalToBn(n, NEAR_DECIMALS);
}

/**
 * Create Proposal FunctionCall Type
 * @name createProposalTransaction
 * @param daoContractId {string}
 * @param params {unknown}
 */
export function createProposalTransaction(
  daoContractId: string,
  params: object
) {
  return new StandardNearFunctionCall({
    contractId: daoContractId,
    methodName: 'add_proposal',
    args: params,
    gas: MAX_GAS.div(new BN(5)),
    attachedDeposit: nearAmount(0.1),
  });
}
