import React, { FC } from 'react';

import { VoterDetail } from '@/lib/services/goblinDao/types';
import VoterTile from '@/components/Votes/VoterTile';
import Card from '@/components/common/Card';
import { truncateToLocaleString } from '@/lib/util';

interface VotersListProps {
  data: VoterDetail[];
}

export const VotersList: FC<VotersListProps> = ({ data }) => {
  const voteLength = data?.filter((d) => d.vote).length;

  return (
    <Card hasBody tw="flex flex-col justify-between gap-4 pb-3">
      <Card.Header tw="border-b-[1px] dark:border-neutral-700 border-neutral-200 flex items-center gap-2">
        Votes{' '}
        <div tw="bg-neutral-300 dark:bg-neutral-500 rounded-lg px-2 py-0.5 text-xs font-normal">
          {truncateToLocaleString(data.filter((d) => d.vote).length, 0)}
        </div>
      </Card.Header>
      {voteLength ? (
        data
          .sort((a, b) => {
            if (!a.timestamp || !b.timestamp) {
              return 0;
            }

            if (a.timestamp > b.timestamp) {
              return -1;
            }

            if (a.timestamp < b.timestamp) {
              return 1;
            }

            return 0;
          })
          .map(
            (item) =>
              item.vote && (
                <VoterTile name={item.name} vote={item.vote} key={item.id} />
              )
          )
      ) : (
        <div tw="flex justify-center w-full p-3 text-sm opacity-70">
          No votes yet
        </div>
      )}
      {/*TODO implement infinite scroll*/}
      {/*<div tw="px-3">*/}
      {/*  <Button tw="w-full">See more</Button>*/}
      {/*</div>*/}
    </Card>
  );
};
