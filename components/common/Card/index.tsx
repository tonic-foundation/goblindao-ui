import tw, { styled } from 'twin.macro';

export interface CardStyleProps {
  hover?: 'ring' | 'pointer' | 'default';
  focused?: boolean;
}

export const cardStyles = ({
  hover = 'default',
  focused = false,
}: CardStyleProps) => [
  tw`rounded-2xl p-4 border bg-white border-neutral-200 dark:(bg-neutral-900 border-neutral-700)`,
  focused
    ? tw`border-black dark:(border-lime-400 bg-neutral-800)`
    : tw`dark:(border-neutral-700 bg-neutral-800)`,
  hover === 'ring'
    ? tw`cursor-pointer transition hover:bg-neutral-100 dark:(hover:bg-neutral-700)`
    : hover === 'pointer'
    ? tw`cursor-pointer`
    : undefined,
];

const CardRoot = styled.div<CardStyleProps & { hasBody?: boolean }>(
  ({ hasBody }) => [cardStyles, hasBody && tw`p-0`]
);

const Card = Object.assign(CardRoot, {
  Header: tw.header`p-4 font-semibold`,
  Body: tw.div`p-4`,
});

export default Card;
