import Card from '@/components/common/Card';
import Typography from '@/components/Typography';
import { VotesProgressBar } from '@/components/Votes/VoteProgressBar';
import React, { FC } from 'react';
import { toCapitalize } from '@/lib/util';

const VoteResults: FC<{
  yesWidth: number;
  yesCount: number;
  noWidth: number;
  noCount: number;
  groupName: string;
}> = ({ groupName, yesWidth, yesCount, noWidth, noCount }) => {
  return (
    <Card hasBody>
      <Card.Header tw="border-b-[1px] dark:border-neutral-700 border-neutral-200">
        {toCapitalize(groupName)}
      </Card.Header>
      <div tw="p-5 flex flex-col gap-4">
        <div tw="flex flex-col gap-2">
          <div tw="flex justify-between">
            <span>Yes {yesCount ? `- ${yesCount}` : ''}</span>
            <Typography.Currency value={yesWidth} precision={2} percentage />
          </div>
          <VotesProgressBar yes width={yesWidth} />
        </div>
        <div tw="flex flex-col gap-2">
          <div tw="flex justify-between">
            <span>No {noCount ? `- ${noCount}` : ''}</span>
            <Typography.Currency value={noWidth} precision={2} percentage />
          </div>
          <VotesProgressBar width={noWidth} />
        </div>
      </div>
    </Card>
  );
};

export default VoteResults;
