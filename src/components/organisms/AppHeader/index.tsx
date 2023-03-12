import { useRouter } from 'next/router';

import Avatar from '@/components/atoms/Avatar';
import AppBar from '@/components/mui/AppBar';
import Button from '@/components/mui/Button';
import Typography from '@/components/mui/Typography';

const AppHeader = () => {
  const router = useRouter();

  return (
    <AppBar
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 2,
        py: 1,
        backgroundColor: 'brand.white',
        height: 56,
        zIndex: 20,
      }}
    >
      <Typography
        component="span"
        onClick={async () => {
          await router.push('/');
        }}
        sx={{ color: 'gray.text', fontWeight: 'bold', fontSize: 20, p: 0, cursor: 'pointer' }}
      >
        Book Shelf
      </Typography>
      <Button>
        <Avatar
          alt="ユーザーアイコン"
          sx={{ width: 26, height: 26 }}
        />
        <Typography sx={{ fontSize: 16, color: 'gray.text', ml: 2 }}>ユーザー名</Typography>
      </Button>
    </AppBar>
  );
};

export default AppHeader;
