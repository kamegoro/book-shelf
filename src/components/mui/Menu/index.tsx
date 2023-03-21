import MuiMenu, { MenuProps } from '@mui/material/Menu';

export type MenuPropsType = MenuProps;

const Menu = (props: MenuPropsType): JSX.Element => <MuiMenu {...props}>{props.children}</MuiMenu>;

export default Menu;
