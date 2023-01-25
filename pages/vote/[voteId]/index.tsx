import React from 'react';

import Content from './content';
import AppLayout from '@/layouts';

const Page: React.FC = () => {
  return (
    <AppLayout>
      <Content />
    </AppLayout>
  );
};

// For Server-Side rendering

// export const getStaticPaths: GetStaticPaths = async () => {
//   const proposals = await getDaoProposals(
//     `/proposals?offset=0&limit=1000&sort=createdAt,DESC`
//   );
//
//   return {
//     paths: proposals.map((p) => ({ params: { voteId: p.id } })),
//     fallback: false, // can also be true or 'blocking'
//   };
// };
//
// export const getStaticProps: GetStaticProps = async (context) => {
//   const voteId = context.params!.voteId as string;
//
//   // Async fetcher goes here...
//
//   const proposal = await getDaoProposal(voteId);
//
//   return {
//     props: {
//       proposal: { ...proposal } || null,
//     },
//   };
// };

export default Page;
