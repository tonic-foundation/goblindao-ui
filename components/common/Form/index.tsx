import tw, { styled } from 'twin.macro';
// import Typography from '@/components/Typography';
// import { cardStyles } from '@/components/common/Card';

const FormBody = tw.div`flex flex-col items-stretch gap-4 p-4`;
// const FormTitle = Typography.Heading;
const FormLabel = tw.p`font-semibold text-base`;
const FormRoot = styled.form(tw`p-0 w-full`);
const Form = Object.assign(FormRoot, {
  Body: FormBody,
  Root: FormRoot,
  // Title: FormTitle,
  Label: FormLabel,
});

export default Form;
