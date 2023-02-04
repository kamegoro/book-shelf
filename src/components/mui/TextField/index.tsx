import { forwardRef } from 'react';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';

export type TextFieldPropsType = TextFieldProps;

const TextField = forwardRef<HTMLDivElement, TextFieldPropsType>((props, ref) => {
  return (
    <MuiTextField
      {...props}
      ref={ref}
    />
  );
});

export default TextField;
