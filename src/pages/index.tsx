import BookCard from '@/components/molecules/BookCard';
import Box from '@/components/mui/Box';
import Button from '@/components/mui/Button';
import Grid from '@/components/mui/Grid';
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
        DashBoard
      </Typography>
      <Box sx={{ backgroundColor: 'brand.white', p: 4, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            component="span"
            sx={{
              color: 'gray.text',
            }}
          >
            直近の本リスト
          </Typography>
          <Button variant="outlined">本棚へ</Button>
        </Box>
        <Grid
          container
          spacing={6}
        >
          {new Array(10).fill(0).map((_, i) => (
            <Grid
              item
              key={`${i + 1}`}
            >
              <BookCard
                src="https://loremflickr.com/640/480/abstract"
                title="本のタイトル"
                description="本の詳細です"
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
