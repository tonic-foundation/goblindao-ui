import { CreateProposalTransfer } from '@/lib/services/goblinDao/types';
import { tgasAmount } from '@tonic-foundation/utils';
import { StandardNearFunctionCall } from '@tonic-foundation/transaction/lib/shim';
import BN from 'bn.js';

/**
 * Create Proposal FunctionCall Type
 * @name createProposalFunctionCall
 * @param contractId {string}
 * @param methodName {string}
 * @param params {string}
 * @param amount {BN}
 * @param tGas {number}
 *   contractId: string,
 *   methodName: string,
 *   amount: BN,
 *   params: string,
 *   tGas: number
 * }
 */
export function createProposalFunctionCall(
  contractId: string,
  methodName: string,
  amount: BN,
  params: string,
  tGas: number
) {
  return new StandardNearFunctionCall({
    contractId,
    methodName,
    args: { params },
    gas: tgasAmount(tGas),
    attachedDeposit: amount,
  });
}

/**
 * Create Proposal Transfer Type
 * @name createProposalFunctionCall
 * @param {
 *   description: string;
 *   transferAmount: BN;
 *   target: string;
 *   tokenId?: string
 * }
 */
export function createProposalTransfer({
  description,
  transferAmount,
  target,
  tokenId = '',
}: CreateProposalTransfer) {
  return {
    Arguments: {
      proposal: {
        description,
        kind: {
          Transfer: {
            token_id: tokenId,
            receiver_id: target,
            amount: transferAmount,
          },
        },
      },
    },
  };
}
