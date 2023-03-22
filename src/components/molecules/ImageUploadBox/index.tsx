import Image from 'next/image';

import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import { Theme, SxProps } from '@mui/material';

import Box, { BoxPropsType } from '@/components/mui/Box';
import Typography from '@/components/mui/Typography';

export type ImageUploadBoxPropsType = Pick<BoxPropsType, 'sx'> & {
  src: string | null;
};

const ImageUploadBox = ({ src, sx = undefined }: ImageUploadBoxPropsType) => (
  <Box
    sx={
      [
        {
          display: 'flex',
          flexDirection: 'column',
          width: 200,
          height: 200,
        },
        ...(Array.isArray(sx) ? (sx as SxProps<Theme>[]) : ([sx] as SxProps<Theme>[])),
      ] as SxProps<Theme>
    }
  >
    <Box
      sx={(theme) => ({
        height: 200,
        width: 200,
        borderRadius: 4,
        border: !src ? `4px ${theme.palette.brand.primary} dotted` : undefined,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      })}
    >
      {src ? (
        <Image
          alt="本の画像"
          src={src}
          height={200}
          width={200}
          style={{ borderRadius: '8px' }}
        />
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 2,
          }}
        >
          <PhotoSizeSelectActualIcon sx={{ height: 40, width: 40, color: 'icon.blue', mb: 1 }} />
          <Typography sx={{ color: 'gray.text', fontSize: 10, opacity: 0.6 }}>
            画像をアップロードしてください
          </Typography>
        </Box>
      )}
    </Box>
  </Box>
);

export default ImageUploadBox;
