import { useRouter } from 'next/router';

import AppBar from '@/components/mui/AppBar';
import Toolbar from '@/components/mui/Toolbar';
import Typography from '@/components/mui/Typography';

import AppHeaderMenu from './AppHeaderMenu';

const AppHeader = () => {
  const router = useRouter();

  return (
    <AppBar
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        pr: 2,
        py: 1,
        backgroundColor: 'brand.white',
        height: 56,
        zIndex: 20,
      }}
    >
      <Toolbar>
        <Typography
          component="span"
          onClick={async () => {
            await router.push('/');
          }}
          sx={{ color: 'gray.text', fontWeight: 'bold', fontSize: 20, p: 0, cursor: 'pointer' }}
        >
          Book Shelf
        </Typography>
      </Toolbar>
      <AppHeaderMenu />
    </AppBar>
  );
};

export default AppHeader;
