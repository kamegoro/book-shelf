import MuiBox, { BoxProps } from '@mui/material/Box';

export type BoxPropsType = BoxProps;

const Box = (props: BoxPropsType): JSX.Element => <MuiBox {...props}>{props.children}</MuiBox>;

export default Box;
