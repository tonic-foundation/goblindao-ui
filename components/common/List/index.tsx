import tw from 'twin.macro';

const List = {
  Ul: tw.ul`py-6 flex flex-col items-stretch overflow-hidden`,
  Item: tw.li`
  flex items-center gap-x-3 p-2.5
  hover:bg-neutral-100
  hover:dark:bg-neutral-500
`,
};

export default List;
