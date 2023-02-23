import MuiAlert, { AlertProps } from '@mui/material/Alert';

export type AlertPropsType = AlertProps;

const Alert = (props: AlertPropsType): JSX.Element => {
  return <MuiAlert {...props}>{props.children}</MuiAlert>;
};

export default Alert;
