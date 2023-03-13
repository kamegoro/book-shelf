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
        設定
      </Typography>
    </Box>
  );
}
