import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem';

export type MenuItemPropsType = MenuItemProps;

const MenuItem = (props: MenuItemPropsType): JSX.Element => (
  <MuiMenuItem {...props}>{props.children}</MuiMenuItem>
);

export default MenuItem;
