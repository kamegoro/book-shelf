import MuiAlert, { AlertPropsType as AlertProps } from '@/components/mui/Alert';

export type AlertPropsType = Pick<AlertProps, 'severity' | 'children'>;

const Alert = (props: AlertPropsType): JSX.Element => {
  return (
    <MuiAlert
      sx={{
        width: 160,
        boxShadow:
          'rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset',
      }}
      {...props}
    >
      {props.children}
    </MuiAlert>
  );
};

export default Alert;
