import MuiFab, { FabProps } from '@mui/material/Fab';

export type FabPropsType<T extends React.ElementType = 'span'> = FabProps<T, { component?: T }>;

const Fab = <T extends React.ElementType = 'p'>(props: FabPropsType<T>) => (
  <MuiFab {...props}>{props.children}</MuiFab>
);

export default Fab;
