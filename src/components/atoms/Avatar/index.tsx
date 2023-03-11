import PersonIcon from '@mui/icons-material/Person';
import { SxProps, Theme } from '@mui/material';

import MuiAvatar, { AvatarPropsType as MuiAvatarPropsType } from '@/components/mui/Avatar';

export type AvatarPropsType = Pick<MuiAvatarPropsType, 'sx' | 'src'> & {
  alt: string;
};

const Avatar = ({ sx = undefined, alt, src = undefined }: AvatarPropsType) => {
  if (src) {
    <MuiAvatar
      sx={sx}
      alt={alt}
      src={src}
    />;
  } else {
    <MuiAvatar
      sx={
        [
          {
            backgroundColor: 'brand.primary',
          },
          ...(Array.isArray(sx) ? (sx as SxProps<Theme>[]) : ([sx] as SxProps<Theme>[])),
        ] as SxProps<Theme>
      }
      alt={alt}
    >
      <PersonIcon />
    </MuiAvatar>;
  }
};

export default Avatar;
