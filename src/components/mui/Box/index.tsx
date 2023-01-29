import MuiBox, { BoxProps } from "@mui/material/Box";

export type BoxPropsType = BoxProps;

const Box = (props: BoxPropsType): JSX.Element => {
  return <MuiBox {...props}>{props.children}</MuiBox>;
};

export default Box;
