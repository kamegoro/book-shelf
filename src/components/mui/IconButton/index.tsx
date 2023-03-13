import MuiIconButton, { IconButtonProps } from '@mui/material/IconButton';

export type IconButtonPropsType = IconButtonProps;

const IconButton = (props: IconButtonPropsType): JSX.Element => (
  <MuiIconButton {...props}>{props.children}</MuiIconButton>
);

export default IconButton;
