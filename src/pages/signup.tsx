import Box from '@/components/mui/Box';
import Typography from '@/components/mui/Typography';
import Button from '@/components/mui/Button';
import TextField from '@/components/mui/TextField';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

import { ReactNode } from 'react';

const TextFieldWithIcon = ({
  label,
  placeholder,
  icon,
}: {
  label: string;
  placeholder: string;
  icon: ReactNode;
}) => {
  return (
    <TextField
      sx={{
        mb: {
          xs: 2,
          sm: 3,
        },
      }}
      label={label}
      required
      placeholder={placeholder}
      InputProps={{
        startAdornment: icon,
        sx: {
          fontSize: {
            xs: 10,
            sm: 14,
          },
        },
      }}
    />
  );
};

const signUp = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray.background',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          width: {
            xs: '100%',
            sm: 500,
          },
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'brand.white',
          p: {
            xs: 3,
            sm: 6,
          },
          boxShadow: '0px 0px 15px -5px #777777',
          borderRadius: '10px',
        }}
      >
        <Typography
          sx={{
            mb: 4,
            fontSize: {
              xs: 26,
              sm: 32,
            },
            textAlign: 'center',
            marginBottom: 1,
            fontWeight: 'bold',
          }}
          color="black"
        >
          Book Shelf
        </Typography>
        <Typography
          sx={{ mb: 4, fontSize: 14, textAlign: 'center', marginBottom: 4, opacity: 0.4 }}
          color="black"
        >
          ユーザー情報を入力してください。
        </Typography>
        <TextFieldWithIcon
          label="ユーザー名"
          placeholder="ユーザー名を入力してください"
          icon={
            <>
              <PersonIcon sx={{ color: 'brand.primary', height: 20, wight: 20, marginRight: 1 }} />
            </>
          }
        />
        <TextFieldWithIcon
          label="メール"
          placeholder="メールを入力してください"
          icon={
            <>
              <MailOutlineIcon
                sx={{ color: 'brand.primary', height: 20, wight: 20, marginRight: 1 }}
              />
            </>
          }
        />
        <TextFieldWithIcon
          label="パスワード"
          placeholder="8文字以上のパスワードを入力してください"
          icon={
            <>
              <LockIcon sx={{ color: 'brand.primary', height: 20, wight: 20, marginRight: 1 }} />
            </>
          }
        />
        <Button
          variant="contained"
          sx={{
            marginTop: {
              xs: 2,
              sm: 4,
            },
            fontSize: {
              xs: 10,
              sm: 14,
            },
          }}
        >
          作成する
        </Button>
      </Box>
    </Box>
  );
};

export default signUp;
