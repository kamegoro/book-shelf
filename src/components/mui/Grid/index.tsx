import MuiGrid, { GridProps } from '@mui/material/Grid';

export type GridPropsType = GridProps;

const Grid = (props: GridPropsType): JSX.Element => <MuiGrid {...props}>{props.children}</MuiGrid>;

export default Grid;
