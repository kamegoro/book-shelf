import BookCard from '@/components/molecules/BookCard';
import Box from '@/components/mui/Box';
import Typography from '@/components/mui/Typography';

export default function Home() {
  return (
    <Box sx={{ width: 960, minHeight: 'calc(100vh - 56px)', py: 6 }}>
      <Typography
        component="h2"
        sx={{
          color: 'gray.text',
          fontWeight: 'bold',
          fontSize: 26,
          mb: 4,
        }}
      >
        タイトル: 本の名前
      </Typography>
      <Box sx={{ backgroundColor: 'brand.white', p: 4, borderRadius: 3 }}>
        <BookCard
          src="https://loremflickr.com/640/480/abstract"
          title="本のタイトル"
          description="本の詳細です"
        />
      </Box>
    </Box>
  );
}
