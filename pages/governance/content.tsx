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
import Loading from '@/components/common/Loading';
import { GOBLIN_DAO_ID } from '@/config';

const Content: NextPage = () => {
  const router = useRouter();
  const { accountId } = useWalletSelector();

  const handleClickProposal = (id: number | string) => {
    router.push(`/proposal/${id}`);
  };

  const { data: funds } = useGoblinDaoFunds();
  const { data: proposals } = useGoblinDaoProposals(GOBLIN_DAO_ID);

  return (
    <React.Fragment>
      <div tw="flex flex-col gap-2">
        <Typography.Heading tw="text-neutral-500">
          Governance
        </Typography.Heading>
        <Typography.Title tw="mb-5">Tonic GoblinDAO</Typography.Title>
        <Card
          tw="mb-5 mt-2 md:px-6 px-0 flex md:flex-row flex-col justify-between"
          hasBody
        >
          <div tw="flex flex-col gap-2 items-center justify-center md:w-3/5 w-full md:px-0 px-6 md:py-0 py-3">
            <Typography.Heading tw="text-neutral-500 text-left w-full">
              Treasury
            </Typography.Heading>
            <div tw="gap-3 flex w-full justify-start">
              {/* TODO if needed an UI similar to the ASTRO DAO, check below code */}
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
          <div tw="flex items-center gap-3 md:border-l px-6 py-5 md:w-2/5 w-full">
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
        {!proposals ? (
          <div tw="w-full flex justify-center items-center">
            <Loading.Pulse tw="h-20 w-20 rounded-full" />
          </div>
        ) : proposals.length ? (
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
