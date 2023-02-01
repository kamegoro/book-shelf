import MuiButton, { ButtonProps } from '@mui/material/Button';

export type ButtonPropsType = ButtonProps;

const Button = (props: ButtonPropsType): JSX.Element => {
  return <MuiButton {...props}>{props.children}</MuiButton>;
};

export default Button;
