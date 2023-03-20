import Box from '@/components/mui/Box';
import Typography from '@/components/mui/Typography';

const Settings = () => (
  <Box sx={{ width: 960, py: 6 }}>
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

export default Settings;
