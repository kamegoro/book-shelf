import MuiAppBar, { AppBarProps } from '@mui/material/AppBar';

export type AppBarPropsType = AppBarProps;

const AppBar = (props: AppBarPropsType): JSX.Element => (
  <MuiAppBar {...props}>{props.children}</MuiAppBar>
);

export default AppBar;
