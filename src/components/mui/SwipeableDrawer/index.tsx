import MuiSwipeableDrawer, { SwipeableDrawerProps } from '@mui/material/SwipeableDrawer';

export type SwipeableDrawerPropsType = SwipeableDrawerProps;

const SwipeableDrawer = (props: SwipeableDrawerPropsType): JSX.Element => (
  <MuiSwipeableDrawer {...props}>{props.children}</MuiSwipeableDrawer>
);

export default SwipeableDrawer;
