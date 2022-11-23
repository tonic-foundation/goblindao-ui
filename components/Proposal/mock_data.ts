import { ProposalState } from '@/components/Proposal/types';
import { ProposalProps } from '@/components/Proposal/types';

export const mock_proposals: ProposalProps[] = [
  {
    id: '1',
    title: 'Proposal tracking by maty 1',
    status: ProposalState.ACTIVE,
    expire: true,
  },
  {
    id: '2',
    title: 'Proposal tracking by maty 2',
    status: ProposalState.CANCELLED,
    expire: true,
  },
  {
    id: '3',
    title: 'Fund Trustless USDC Payments Contract 3',
    status: ProposalState.DEFEATED,
  },
  {
    id: '4',
    title: 'Fund Trustless USDC Payments Contract',
    status: ProposalState.PENDING,
  },
  {
    id: '5',
    title: 'Fund Trustless USDC Payments Contract',
    status: ProposalState.QUEUED,
  },
  {
    id: '6',
    title: 'Fund Trustless USDC Payments Contract',
    status: ProposalState.EXPIRED,
  },
  {
    id: '7',
    title: 'Fund Trustless USDC Payments Contract',
    status: ProposalState.SUCCEEDED,
  },
  {
    id: '8',
    title: 'Fund Trustless USDC Payments Contract',
    status: ProposalState.EXECUTED,
  },
  {
    id: '9',
    title: 'Fund Trustless USDC Payments Contract',
    status: ProposalState.VETOED,
  },
];
