import MuiListItem, { ListItemProps } from '@mui/material/ListItem';

export type ListItemPropsType = ListItemProps;

const ListItem = (props: ListItemPropsType): JSX.Element => (
  <MuiListItem {...props}>{props.children}</MuiListItem>
);

export default ListItem;
