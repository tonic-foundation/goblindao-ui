import tw from 'twin.macro';

const Tile = {
  Label: tw.div`
    font-semibold
    text-base
  `,
  SubLabel: tw.div`font-semibold text-xs opacity-50 dark:opacity-70`,
  Value: tw.div`font-bold text-2xl font-brand`,
  Button: tw.button`py-2 rounded text-base font-semibold text-center transition hover:bg-opacity-[15%]`,
};

export default Tile;
