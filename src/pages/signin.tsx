import { memo, forwardRef, ReactNode, useState } from 'react';

import { useRouter } from 'next/router';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LockIcon from '@mui/icons-material/Lock';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CircularProgress from '@mui/material/CircularProgress';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { useSnackbar } from '@/components/contexts/SnackbarContext';
import RegistrationFormBox from '@/components/molecules/RegistrationFormBox';

import Box from '@/components/mui/Box';
import Button from '@/components/mui/Button';
import Stack from '@/components/mui/Stack';
import TextField, { TextFieldPropsType } from '@/components/mui/TextField';
import UserService from '@/core/domains/user/UserService';

const TextFieldWithIcon = memo(
  forwardRef<
    HTMLDivElement,
    Pick<
      TextFieldPropsType,
      'label' | 'placeholder' | 'error' | 'helperText' | 'value' | 'onChange' | 'type' | 'disabled'
    > & {
      // NOTE: 呼びだれているのにも関わらずlint errorを返されるので仕方なしに
      // eslint-disable-next-line react/no-unused-prop-types
      icon: ReactNode;
    }
  >(({ label, placeholder, icon, value, type, onChange, disabled }, ref) => (
    <TextField
      ref={ref}
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
      value={value}
      onChange={onChange}
      type={type}
      disabled={disabled}
    />
  )),
);

type InputProps = {
  email: string;
  password: string;
};

const SignUp = () => {
  const router = useRouter();
  const { showError, showSuccess } = useSnackbar();
  const { control, handleSubmit } = useForm<InputProps>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<InputProps> = (value) => {
    setIsLoading(true);

    const userService = new UserService();

    userService
      .signIn({ email: value.email, password: value.password })
      .then(async () => {
        await router.push('/').then(() => {
          showSuccess('ログインに成功しました');
        });
      })
      .catch(() => {
        showError('ログインに失敗しました');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <RegistrationFormBox description="ユーザー情報を入力してください。">
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextFieldWithIcon
              {...field}
              label="メール"
              placeholder="メールを入力してください"
              type="email"
              disabled={isLoading}
              icon={
                <MailOutlineIcon
                  sx={{ color: 'icon.blue', height: 20, wight: 20, marginRight: 1 }}
                />
              }
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextFieldWithIcon
              {...field}
              label="パスワード"
              type="password"
              placeholder="パスワードを入力してください"
              disabled={isLoading}
              icon={<LockIcon sx={{ color: 'icon.blue', height: 20, wight: 20, marginRight: 1 }} />}
            />
          )}
        />
        {isLoading ? (
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <CircularProgress size={32} />
          </Box>
        ) : (
          <Button
            variant="contained"
            sx={{ marginTop: 2 }}
            disabled={isLoading}
            type="submit"
          >
            ログイン
          </Button>
        )}
      </Stack>
      <Box sx={{ mt: 1.5, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          sx={{ width: 'fit-content', fontSize: 12 }}
          variant="text"
          onClick={async () => {
            await router.push('/signup');
          }}
        >
          サインアップ
          <ArrowForwardIcon sx={{ color: 'icon.blue', height: 16, wight: 16 }} />
        </Button>
      </Box>
    </RegistrationFormBox>
  );
};

export default SignUp;
