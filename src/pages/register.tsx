import { memo, forwardRef, ReactNode, useState } from 'react';

import { GetServerSideProps } from 'next';

import MailOutlineIcon from '@mui/icons-material/MailOutline';

import PersonIcon from '@mui/icons-material/Person';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import RegistrationFormBox from '@/components/molecules/RegistrationFormBox';
import Button from '@/components/mui/Button';
import Stack from '@/components/mui/Stack';
import TextField, { TextFieldPropsType } from '@/components/mui/TextField';

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
      sx={{ mb: 3 }}
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
  )),
);

type InputProps = {
  password: string;
  passwordConfirm: string;
};

type PageProps = {
  name: string;
  email: string;
};

const Register = ({ name, email }: PageProps) => {
  const { control, handleSubmit } = useForm<InputProps>({
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<InputProps> = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <RegistrationFormBox description="パスワードを8文字以上で入力してください。">
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextFieldWithIcon
          label="ユーザー名"
          value={name}
          disabled
          icon={<PersonIcon sx={{ color: '#1565C0', height: 20, wight: 20, marginRight: 1 }} />}
        />

        <TextFieldWithIcon
          label="メール"
          type="email"
          value={email}
          disabled
          icon={
            <MailOutlineIcon sx={{ color: '#1565C0', height: 20, wight: 20, marginRight: 1 }} />
          }
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextFieldWithIcon
              {...field}
              label="パスワード"
              placeholder="パスワードを入力してください"
              type="password"
              disabled={isLoading}
              icon={
                <MailOutlineIcon sx={{ color: '#1565C0', height: 20, wight: 20, marginRight: 1 }} />
              }
            />
          )}
        />
        <Controller
          name="passwordConfirm"
          control={control}
          render={({ field }) => (
            <TextFieldWithIcon
              {...field}
              label="パスワード確認"
              placeholder="パスワードを再入力してください"
              type="password"
              disabled={isLoading}
              icon={
                <MailOutlineIcon sx={{ color: '#1565C0', height: 20, wight: 20, marginRight: 1 }} />
              }
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
            登録する
          </Button>
        )}
      </Stack>
    </RegistrationFormBox>
  );
};

export default Register;

export const getServerSideProps: GetServerSideProps = async () => {
  const props: PageProps = {
    name: '山本 太郎',
    email: 'tarou.yamamoto@gmail.com',
  };

  return {
    props,
  };
};
