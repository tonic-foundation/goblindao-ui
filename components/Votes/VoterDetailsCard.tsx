import React, { FC } from 'react';
import { Vote } from '@/lib/services/goblinDao/types';
import Icon from '@/components/common/Icon';
import { formatTimestampAsDate } from '@/lib/util';

interface VoterDetailsCardProps {
  vote: Vote | null;
  name: string;
  groups?: string[];
  transactionHash: string | undefined;
  timestamp: string | null | undefined;
  isLastVote: boolean;
}

export const VoterDetailsCard: FC<VoterDetailsCardProps> = ({
  vote,
  name,
  transactionHash,
  timestamp,
  isLastVote,
}) => {
  return (
    <div>
      <div>
        {/*TODO render correct icon*/}
        <Icon.Like />
        {isLastVote && <Icon.Checked />}
      </div>
      <div>{name}</div>
      <div>
        &nbsp;
        {timestamp ? formatTimestampAsDate(timestamp) : null}
      </div>
    </div>
  );
};
