import MuiTypography, { TypographyProps } from '@mui/material/Typography';

export type TypographyPropsType<T extends React.ElementType = 'span'> = TypographyProps<
  T,
  { component?: T }
>;

const Typography = <T extends React.ElementType = 'p'>(props: TypographyPropsType<T>) => {
  return <MuiTypography {...props}>{props.children}</MuiTypography>;
};

export default Typography;
