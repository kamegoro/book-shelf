import { memo, forwardRef, ReactNode, useState } from 'react';

import { useRouter } from 'next/router';

import LockIcon from '@mui/icons-material/Lock';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { useSnackbar } from '@/components/contexts/SnackbarContext';
import RegistrationFormBox from '@/components/molecules/RegistrationFormBox';

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
                <MailOutlineIcon sx={{ color: '#1565C0', height: 20, wight: 20, marginRight: 1 }} />
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
              icon={<LockIcon sx={{ color: '#1565C0', height: 20, wight: 20, marginRight: 1 }} />}
            />
          )}
        />
        {isLoading ? (
          <>Loading...</>
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
    </RegistrationFormBox>
  );
};

export default SignUp;
