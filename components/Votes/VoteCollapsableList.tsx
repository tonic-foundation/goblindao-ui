import {
  GroupPolicyDetails,
  VoterDetail,
} from '@/lib/services/goblinDao/types';
import React, { FC, useMemo } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Collapsable } from '@/components/common/Collapsable';
import NoVotesResults from '@/components/Votes/NoVotesResults';
import { VoteCollapsableHeader } from '@/components/Votes/VoteCollapsableHeader';
import { VotersList } from '@/components/Votes/VotersList';

interface VoteCollapsableListProps {
  data: VoterDetail[];
  votingPolicyByGroup: Record<string, GroupPolicyDetails>;
  lastVoteId?: string;
}
interface VoteGroups {
  [key: string]: VoterDetail[];
}
const VoteCollapsableList: FC<VoteCollapsableListProps> = ({
  data,
  votingPolicyByGroup,
  lastVoteId,
}) => {
  const votesGroups = useMemo(
    () =>
      data.reduce<VoteGroups>((res, item) => {
        const { groups } = item;

        groups?.forEach((group) => {
          if (res[group]) {
            res[group].push(item);
          } else {
            res[group] = [item];
          }
        });

        return res;
      }, {}),
    [data]
  );

  if (isEmpty(data)) {
    return <NoVotesResults title="No votes here" />;
  }

  return (
    <ul>
      {Object.keys(votesGroups).map((votesGroupsKey) => {
        const list = votesGroups[votesGroupsKey];

        if (!list.length) {
          return null;
        }

        return (
          <li key={votesGroupsKey}>
            <Collapsable
              height="auto"
              initialOpenState
              renderHeading={(setToggle, state) => (
                <VoteCollapsableHeader
                  setToggle={setToggle}
                  state={state}
                  votes={list}
                  groupName={votesGroupsKey}
                  threshold={votingPolicyByGroup[votesGroupsKey]}
                />
              )}
            >
              <VotersList
                data={list}
                lastVoteId={lastVoteId}
                showTokensInfo={votesGroupsKey === 'TokenHolders'}
              />
            </Collapsable>
          </li>
        );
      })}
    </ul>
  );
};

export default VoteCollapsableList;
