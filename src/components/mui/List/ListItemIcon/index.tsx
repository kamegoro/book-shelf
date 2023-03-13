import MuiListItemIcon, { ListItemIconProps } from '@mui/material/ListItemIcon';

export type ListItemIconPropsType = ListItemIconProps;

const ListItemIcon = (props: ListItemIconPropsType): JSX.Element => (
  <MuiListItemIcon {...props}>{props.children}</MuiListItemIcon>
);

export default ListItemIcon;
