import MuiDivider, { DividerProps } from '@mui/material/Divider';

export type DividerPropsType = DividerProps;

const Divider = (props: DividerPropsType): JSX.Element => (
  <MuiDivider {...props}>{props.children}</MuiDivider>
);

export default Divider;
