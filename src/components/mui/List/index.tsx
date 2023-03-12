import MuiList, { ListProps } from '@mui/material/List';

export type ListPropsType = ListProps;

const List = (props: ListPropsType): JSX.Element => <MuiList {...props}>{props.children}</MuiList>;

export default List;
