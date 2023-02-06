import tw from 'twin.macro';

const FieldRoot = tw.div`flex flex-col items-stretch gap-2`;
const FieldRight = tw.span`absolute right-0 top-0 bottom-0 flex items-center`;
const FieldLabel = tw.p`text-sm font-medium opacity-80`;

const Field = Object.assign(FieldRoot, {
  Label: FieldLabel,
  Right: FieldRight,
});

export default Field;
