import MuiButton, { ButtonProps } from '@mui/material/Button';

export type ButtonPropsType<T extends React.ElementType = 'span'> = ButtonProps<
  T,
  { component?: T }
>;

const Button = <T extends React.ElementType = 'button'>(props: ButtonPropsType<T>) => (
  <MuiButton {...props}>{props.children}</MuiButton>
);

export default Button;
