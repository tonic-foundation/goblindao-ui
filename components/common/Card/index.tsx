import tw, { styled } from 'twin.macro';

export interface CardStyleProps {
  hover?: 'ring' | 'pointer';
}

export const cardStyles = ({ hover }: CardStyleProps) => [
  tw`rounded-2xl p-4 border border-slate-100 bg-white`,
  tw`dark:(border-neutral-700 bg-neutral-800)`,
  hover === 'ring'
    ? // todo: dark styles
      tw`cursor-pointer transition hover:(ring-2 ring-slate-200)`
    : hover === 'pointer'
    ? tw`cursor-pointer`
    : undefined,
];

const CardRoot = styled.div<CardStyleProps & { hasBody?: boolean }>(
  ({ hasBody }) => [cardStyles, hasBody && tw`p-0`]
);

const Card = Object.assign(CardRoot, {
  Header: tw.header`p-4`,
  Body: tw.div`p-4`,
});

export default Card;
