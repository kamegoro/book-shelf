import Image, { ImageProps } from 'next/image';

import Box from '@/components/mui/Box';
import Typography from '@/components/mui/Typography';

export type BookCardPropsType = Pick<ImageProps, 'src'> & {
  title: string;
  description: string;
  onClickImage?: ImageProps['onClick'];
};

const BookCard = ({ src, title, description, onClickImage = undefined }: BookCardPropsType) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', pb: 2, width: 160 }}>
    <Box sx={{ mb: 1.5, width: 160, height: 160 }}>
      <Image
        alt="本の画像"
        src={src}
        height={160}
        width={160}
        style={{ borderRadius: '8px', cursor: onClickImage ? 'pointer' : 'auto' }}
        onClick={onClickImage}
      />
    </Box>
    <Typography
      component="p"
      sx={{ mb: 0.5, fontWeight: 'bold', fontSize: 16, color: 'gray.text' }}
    >
      {title}
    </Typography>
    <Typography
      component="p"
      sx={{ fontSize: 14, color: 'gray.text', opacity: 0.6 }}
    >
      {description}
    </Typography>
  </Box>
);

export default BookCard;
