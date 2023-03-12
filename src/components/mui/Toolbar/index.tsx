import MuiToolbar, { ToolbarProps } from '@mui/material/Toolbar';

export type ToolbarPropsType = ToolbarProps;

const Toolbar = (props: ToolbarPropsType): JSX.Element => (
  <MuiToolbar {...props}>{props.children}</MuiToolbar>
);

export default Toolbar;
