import MuiStack, { StackProps } from '@mui/material/Stack';

export type StackPropsType = StackProps;

const Stack = (props: StackPropsType): JSX.Element => (
  <MuiStack {...props}>{props.children}</MuiStack>
);

export default Stack;
