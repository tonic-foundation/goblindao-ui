import {
  CreateProposalFunctionCall,
  CreateProposalTransfer,
} from '@/lib/services/goblinDao/types';
import { tgasAmount } from '@tonic-foundation/utils';
import { TONIC_CONTRACT_ID } from '@/config';

/**
 * Create Proposal FunctionCall Type
 * @name createProposalFunctionCall
 * @param {
 *   description,
 *   method,
 *   depositAmount,
 *   depositToken,
 *   contractId = TONIC_CONTRACT_ID,
 *   tGas = 150,
 * }
 */
export function createProposalFunctionCall({
  description,
  method,
  depositAmount,
  contractId = TONIC_CONTRACT_ID,
  tGas = 150,
  json,
}: CreateProposalFunctionCall) {
  return {
    Arguments: {
      proposal: {
        description,
        kind: {
          FunctionCall: {
            receiver_id: contractId,
            actions: [
              {
                method_name: method,
                args: json,
                deposit: depositAmount,
                gas: tgasAmount(tGas),
              },
            ],
          },
        },
      },
    },
  };
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
