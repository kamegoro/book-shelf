import MuiListItemText, { ListItemTextProps } from '@mui/material/ListItemText';

export type ListItemTextPropsType = ListItemTextProps;

const ListItemText = (props: ListItemTextPropsType): JSX.Element => (
  <MuiListItemText {...props}>{props.children}</MuiListItemText>
);

export default ListItemText;
