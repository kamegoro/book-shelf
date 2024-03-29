import { memo, forwardRef, ReactNode, useState } from 'react';

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LockIcon from '@mui/icons-material/Lock';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonIcon from '@mui/icons-material/Person';
import CircularProgress from '@mui/material/CircularProgress';

import dayjs from 'dayjs';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { useSnackbar } from '@/components/contexts/SnackbarContext';

import RegistrationFormBox from '@/components/molecules/RegistrationFormBox';
import Box from '@/components/mui/Box';
import Button from '@/components/mui/Button';
import Stack from '@/components/mui/Stack';
import TextField, { TextFieldPropsType } from '@/components/mui/TextField';
import Typography from '@/components/mui/Typography';
import RegisterService from '@/core/domains/register/RegisterService';
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
      // eslint-disable-next-line react/no-unused-prop-types
      errorMessage?: string;
    }
  >(({ label, placeholder, icon, value, errorMessage, type, onChange, disabled }, ref) => (
    <>
      <TextField
        ref={ref}
        sx={{ mb: errorMessage ? 0.5 : 3 }}
        label={label}
        required
        placeholder={placeholder}
        InputProps={{
          startAdornment: icon,
          sx: {
            fontSize: 14,
          },
        }}
        value={value}
        onChange={onChange}
        type={type}
        disabled={disabled}
      />
      {errorMessage && (
        <Typography
          component="p"
          sx={{ color: 'brand.error', fontSize: 12, mb: 1 }}
        >
          {errorMessage}
        </Typography>
      )}
    </>
  )),
);

type InputProps = {
  password: string;
  passwordConfirm: string;
};

type PageProps = {
  name: string;
  email: string;
  token: string;
  errorMessage?:
    | 'トークンの有効期限が切れています。'
    | '存在しないトークンです。'
    | 'データの取得に失敗しました。';
};

const Register = ({ name, email, errorMessage }: PageProps) => {
  const userService = new UserService();
  const router = useRouter();
  const { showError, showSuccess } = useSnackbar();
  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<InputProps>({
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<InputProps> = (value) => {
    setIsLoading(true);
    userService
      .signUpUser({ name, email, password: value.password })
      .then(async () => {
        await router.push('/signin');
        showSuccess('アカウントを作成しました。');
      })
      .catch(() => {
        showError('アカウントの作成に失敗しました');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <RegistrationFormBox
      description="パスワードを8文字以上で入力してください。"
      errorMessage={errorMessage}
    >
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextFieldWithIcon
          label="ユーザー名"
          value={name}
          disabled
          icon={<PersonIcon sx={{ color: 'icon.blue', height: 20, wight: 20, marginRight: 1 }} />}
        />

        <TextFieldWithIcon
          label="メール"
          type="email"
          value={email}
          disabled
          icon={
            <MailOutlineIcon sx={{ color: 'icon.blue', height: 20, wight: 20, marginRight: 1 }} />
          }
        />
        <Controller
          {...register('password', {
            required: 'パスワードは必須です',
            validate: (value) => value.length > 8 || 'パスワードは8文字以上で入力してください',
          })}
          name="password"
          control={control}
          render={({ field }) => (
            <TextFieldWithIcon
              {...field}
              label="パスワード"
              placeholder="パスワードを入力してください"
              type="password"
              errorMessage={errors.password ? errors.password.message : undefined}
              disabled={isLoading || !!errorMessage}
              icon={<LockIcon sx={{ color: 'icon.blue', height: 20, wight: 20, marginRight: 1 }} />}
            />
          )}
        />
        <Controller
          {...register('passwordConfirm', {
            required: '確認のためパスワードを再入力してください。',
            validate: (value) => value === getValues('password') || 'パスワードが一致しません',
          })}
          name="passwordConfirm"
          control={control}
          render={({ field }) => (
            <TextFieldWithIcon
              {...field}
              label="パスワード確認"
              placeholder="パスワードを再入力してください"
              type="password"
              disabled={isLoading || !!errorMessage}
              errorMessage={errors.passwordConfirm ? errors.passwordConfirm.message : undefined}
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
            disabled={isLoading || !!errorMessage}
            type="submit"
          >
            登録する
          </Button>
        )}
      </Stack>
      <Box sx={{ mt: 1.5, display: 'flex', justifyContent: 'space-between' }}>
        <Button
          sx={{ width: 'fit-content', fontSize: 12 }}
          variant="text"
          onClick={async () => {
            await router.push('/signup');
          }}
        >
          <ArrowBackIcon sx={{ color: 'icon.blue', height: 16, wight: 16, mr: 1 }} />
          サインアップ
        </Button>
        <Button
          sx={{ width: 'fit-content', fontSize: 12 }}
          variant="text"
        >
          ログイン
          <ArrowForwardIcon sx={{ color: 'icon.blue', height: 16, wight: 16 }} />
        </Button>
      </Box>
    </RegistrationFormBox>
  );
};

export default Register;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { token } = query;

  if (!token || Array.isArray(token))
    return {
      redirect: {
        permanent: false,
        destination: '/signup',
      },
    };

  const registerService = new RegisterService();
  const props = registerService
    .getRegister({ token })
    .then((register) => {
      if (!register)
        return {
          name: '',
          email: '',
          errorMessage: '存在しないトークンです。',
        } as PageProps;

      const expired = dayjs(register.createdAt).add(2, 'd');
      const now = dayjs();
      if (expired.isBefore(now))
        return {
          name: '',
          email: '',
          errorMessage: 'トークンの有効期限が切れています。',
        } as PageProps;

      return {
        name: register.name,
        email: register.email,
        token: register.token,
      } as PageProps;
    })
    .catch(
      () =>
        ({
          name: '',
          email: '',
          errorMessage: 'データの取得に失敗しました。',
        } as PageProps),
    );

  return {
    props,
  };
};
