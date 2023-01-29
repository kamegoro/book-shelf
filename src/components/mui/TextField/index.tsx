import MuiTextField, { TextFieldProps } from "@mui/material/TextField";

export type TextFieldPropsType = TextFieldProps;

const TextField = (props: TextFieldPropsType): JSX.Element => {
  return <MuiTextField {...props} />;
};

export default TextField;
