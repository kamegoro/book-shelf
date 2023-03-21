import { useState } from 'react';

import { useRouter } from 'next/router';

import Avatar from '@/components/atoms/Avatar';
import { useSnackbar } from '@/components/contexts/SnackbarContext';
import Button from '@/components/mui/Button';
import Menu from '@/components/mui/Menu';
import MenuItem from '@/components/mui/Menu/MenuItem';
import Typography from '@/components/mui/Typography';
import UserService from '@/core/domains/user/UserService';

const AppHeaderMenu = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { showError, showSuccess } = useSnackbar();
  const userService = new UserService();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSettings = async () => {
    await router.push('/settings');
    handleClose();
  };

  const onLogout = () => {
    userService
      .signOut()
      .then(async () => {
        await router.push('/signin');
        showSuccess('ログアウトしました');
      })
      .catch(() => {
        showError('ログアウトに失敗しました');
      })
      .finally(() => {
        handleClose();
      });
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar
          alt="ユーザーアイコン"
          sx={{ width: 26, height: 26 }}
        />
        <Typography sx={{ fontSize: 16, color: 'gray.text', ml: 2 }}>ユーザー名</Typography>
      </Button>
      <Menu
        sx={{
          '.MuiPaper-root': {
            width: 160,
          },
          '.MuiList-root': {
            px: 1,
          },
        }}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 45,
          horizontal: 'right',
        }}
        id="basic-menu"
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={onSettings}>設定</MenuItem>
        <MenuItem onClick={onLogout}>ログアウト</MenuItem>
      </Menu>
    </>
  );
};

export default AppHeaderMenu;
