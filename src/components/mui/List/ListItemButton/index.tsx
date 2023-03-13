import MuiListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton';

export type ListItemButtonPropsType = ListItemButtonProps;

const ListItemButton = (props: ListItemButtonPropsType): JSX.Element => (
  <MuiListItemButton {...props}>{props.children}</MuiListItemButton>
);

export default ListItemButton;
