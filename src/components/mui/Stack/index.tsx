import MuiStack, { StackProps } from '@mui/material/Stack';

export type StackPropsType<T extends React.ElementType = 'div'> = StackProps<T, { component?: T }>;

const Stack = <T extends React.ElementType = 'div'>(props: StackPropsType<T>): JSX.Element => (
  <MuiStack {...props}>{props.children}</MuiStack>
);

export default Stack;
