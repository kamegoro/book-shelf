import MuiTypography, { TypographyProps } from '@mui/material/Typography';

export type TypographyPropsType = TypographyProps;

const Typography = (props: TypographyPropsType) => {
  return <MuiTypography {...props}>{props.children}</MuiTypography>;
};

export default Typography;
