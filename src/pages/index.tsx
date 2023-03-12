import Box from '@/components/mui/Box';
import Button from '@/components/mui/Button';
import Typography from '@/components/mui/Typography';

export default function Home() {
  return (
    <Box sx={{ width: 960, minHeight: '100vh', py: 6 }}>
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
        <Box>ここに本のリストが並ぶ</Box>
      </Box>
    </Box>
  );
}
