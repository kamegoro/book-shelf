import MuiLoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';

export type LoadingButtonPropsType = LoadingButtonProps;

const LoadingButton = (props: LoadingButtonPropsType): JSX.Element => {
  return <MuiLoadingButton {...props}>{props.children}</MuiLoadingButton>;
};

export default LoadingButton;
