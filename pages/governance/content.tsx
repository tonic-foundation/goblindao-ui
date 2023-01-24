import { NextPage } from 'next';
import React from 'react';
import Button from '@/components/common/Button';
import { useRouter } from 'next/router';
import { Proposal } from '@/components/Proposals';
import Card from '@/components/common/Card';
import Empty from '@/components/common/Empty';
import { useWalletSelector } from '@/state/containers/WalletSelectorContainer';
import Typography from '@/components/Typography';
import { useGoblinDaoFunds, useGoblinDaoProposals } from '@/hooks/useGoblinDao';

const Content: NextPage = () => {
  const router = useRouter();
  const { accountId } = useWalletSelector();

  const handleClickProposal = (id: number | string) => {
    router.push(`/vote/${id}`);
  };

  const { data: funds } = useGoblinDaoFunds();
  const { data: proposals } = useGoblinDaoProposals();

  return (
    <React.Fragment>
      <div tw="flex flex-col gap-2">
        <Typography.Heading tw="text-neutral-500">
          Governance
        </Typography.Heading>
        <Typography.Title tw="mb-5">Tonic GoblinDAO</Typography.Title>
        <Typography.Body>
          Goblin govern Goblin DAO. Goblins can vote on proposals or delegate
          their vote to a third party. A minimum of 2 Tonic is required to
          submit proposals.
        </Typography.Body>
        <Card tw="mb-5 mt-2 px-6 flex justify-between" hasBody>
          <div tw="flex flex-col gap-2 items-center justify-center w-3/5">
            <Typography.Heading tw="text-neutral-500 text-left w-full">
              Treasury
            </Typography.Heading>
            <div tw="gap-3 flex w-full justify-start">
              {/* TODO if needed an UI similar to ASTRO DAO, check below code */}
              {/*<Card tw="flex flex-col items-stretch">*/}
              {/*  <div tw="gap-6 flex items-center justify-between w-full">*/}
              {/*    <Icon.Near tw="w-5 h-5" />*/}
              {/*    <div>*/}
              {/*      <Tile.Value>*/}
              {/*        <Typography.Currency*/}
              {/*          unit={'NEAR'}*/}
              {/*          value={29000}*/}
              {/*          unitAfter*/}
              {/*        />*/}
              {/*      </Tile.Value>*/}
              {/*      <Tile.SubLabel tw="whitespace-nowrap">*/}
              {/*        <Typography.Currency value={29000} />*/}
              {/*      </Tile.SubLabel>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</Card>*/}
              <Typography.Currency
                tw="flex gap-2 text-2xl font-bold items-center"
                value={funds}
                unitAfter
                unit="USD"
                fallback={'--'}
              />
            </div>
          </div>
          <div tw="flex items-center gap-3 border-l px-6 py-5 w-2/5">
            This treasury exists for Goblin DAO participants to allocate
            resources for the long-term growth and prosperity of the Tonic
            project.
          </div>
        </Card>
      </div>
      <div tw="flex justify-between items-center py-6 mb-3">
        <Typography.Heading>Proposals</Typography.Heading>
        <div tw="flex items-center gap-4">
          {!accountId && (
            <Typography.Body tw="text-neutral-500 text-sm">
              Connect wallet to make a proposal.
            </Typography.Body>
          )}
          <Button
            variant={accountId ? 'confirm' : 'default'}
            onClick={() => router.push('/create-proposal')}
            size="lg"
            disabled={!accountId}
          >
            Submit Proposal
          </Button>
        </div>
      </div>
      <div tw="flex flex-col gap-5">
        {proposals?.length ? (
          proposals.map((proposal, index) => (
            <Proposal
              index={index + 1}
              proposal={proposal}
              key={proposal.id}
              onClick={() => handleClickProposal(proposal.id)}
            />
          ))
        ) : (
          <Empty>No Proposals</Empty>
        )}
      </div>
    </React.Fragment>
  );
};

export default Content;
