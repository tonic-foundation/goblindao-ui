import { NextPage } from 'next';
import React from 'react';
import Typography from '@/components/Typography';
import Button from '@/components/common/Button';
import { useRouter } from 'next/router';
import { mock_proposals } from '@/components/Proposals/mock_data';
import { Proposal } from '@/components/Proposals';
import Card from '@/components/common/Card';
import Icon from '@/components/common/Icon';

const Content: NextPage = () => {
  const router = useRouter();

  const handleClickProposal = (id: number | string) => {
    router.push(`/vote/${id}`);
  };

  return (
    <React.Fragment>
      <div tw="flex flex-col gap-2">
        <Typography.Subheading tw="text-neutral-500">
          Governance
        </Typography.Subheading>
        <Typography.Title tw="mb-5">Tonic GoblinDAO</Typography.Title>
        <Typography.Body>
          Goblin govern Goblin DAO. Goblins can vote on proposals or delegate
          their vote to a third party. A minimum of 2 Tonic is required to
          submit proposals.
        </Typography.Body>
        <Card tw="mb-5 mt-2 px-6 flex justify-between" hasBody hover="pointer">
          <div tw="flex flex-col gap-2 items-center justify-center w-3/5">
            <Typography.Subheading tw="text-neutral-500 text-left w-full">
              Treasury
            </Typography.Subheading>
            <div tw="gap-3 flex w-full justify-start">
              <Typography.Currency
                tw="flex gap-2 text-2xl font-bold items-center"
                unit={<Icon.Near tw="w-5 h-5" />}
                precision={0}
                value={29000}
              />
              <Typography.Currency
                tw="border-l-2 inline-block px-3 font-bold text-2xl text-neutral-400"
                value={29000 * 2}
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
          <Typography.Body tw="text-neutral-500 text-sm">
            Connect wallet to make a proposal.
          </Typography.Body>
          <Button size="lg" disabled>
            Submit Proposal
          </Button>
        </div>
      </div>
      <div tw="flex flex-col gap-5">
        {mock_proposals.map((proposal) => (
          <Proposal
            proposal={proposal}
            key={proposal.id}
            onClick={() => handleClickProposal(proposal.id)}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default Content;
