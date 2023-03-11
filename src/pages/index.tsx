import Box from '@/components/mui/Box';
import Button from '@/components/mui/Button';
import Typography from '@/components/mui/Typography';

export default function Home() {
  return (
    <Box sx={{ width: 960, minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          component="span"
          sx={{
            color: 'gray.text',
          }}
        >
          DashBoard
        </Typography>
        <Button>ユーザー名</Button>
      </Box>
      <Box sx={{ backgroundColor: 'brand.white', p: 4, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            component="span"
            sx={{
              color: 'gray.text',
            }}
          >
            Books
          </Typography>
          <Typography
            component="span"
            sx={{
              color: 'gray.text',
            }}
          >
            ３点リーダー
          </Typography>
        </Box>
        <Box>ここに本のリストが並ぶ</Box>
      </Box>
    </Box>
  );
}
