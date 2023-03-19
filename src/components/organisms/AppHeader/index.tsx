import { useState } from 'react';

import { useRouter } from 'next/router';

import MenuIcon from '@mui/icons-material/Menu';

import Avatar from '@/components/atoms/Avatar';
import { useSnackbar } from '@/components/contexts/SnackbarContext';
import AppBar from '@/components/mui/AppBar';
import Button from '@/components/mui/Button';
import IconButton from '@/components/mui/IconButton';
import Toolbar from '@/components/mui/Toolbar';
import Typography from '@/components/mui/Typography';
import UserService from '@/core/domains/user/UserService';

import AppHeaderDrawer from './AppHeaderDrawer';

const AppHeader = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const userService = new UserService();
  const { showError } = useSnackbar();

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

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
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 1 }}
          onClick={onOpen}
        >
          <MenuIcon sx={{ color: 'gray.text' }} />
        </IconButton>
        <AppHeaderDrawer
          open={open}
          onOpen={onOpen}
          onClose={onClose}
          onClickOutSide={onClose}
          onKeyDown={onClose}
        />
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
      <Button>
        <Avatar
          alt="ユーザーアイコン"
          sx={{ width: 26, height: 26 }}
        />
        <Typography sx={{ fontSize: 16, color: 'gray.text', ml: 2 }}>ユーザー名</Typography>
      </Button>
      <Button
        onClick={() => {
          userService
            .signOut()
            .then(async () => {
              await router.push('/signin');
            })
            .catch(() => {
              showError('ログアウトに失敗しました。');
            });
        }}
      >
        ログアウト
      </Button>
    </AppBar>
  );
};

export default AppHeader;
