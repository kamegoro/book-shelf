import MuiAvatar, { AvatarProps } from '@mui/material/Avatar';

export type AvatarPropsType = AvatarProps;

const Avatar = (props: AvatarPropsType): JSX.Element => (
  <MuiAvatar {...props}>{props.children}</MuiAvatar>
);

export default Avatar;
