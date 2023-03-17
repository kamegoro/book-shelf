import { memo, forwardRef, ReactNode, useState } from 'react';

import MailOutlineIcon from '@mui/icons-material/MailOutline';

import PersonIcon from '@mui/icons-material/Person';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { useSnackbar } from '@/components/contexts/SnackbarContext';
import RegistrationFormBox from '@/components/molecules/RegistrationFormBox';

import Button from '@/components/mui/Button';
import Stack from '@/components/mui/Stack';
import TextField, { TextFieldPropsType } from '@/components/mui/TextField';
import RegisterService from '@/core/domains/register/RegisterService';

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
  name: string;
  email: string;
};

const SignUp = () => {
  const { showError, showSuccess } = useSnackbar();
  const { control, handleSubmit, resetField } = useForm<InputProps>({
    defaultValues: {
      name: '',
      email: '',
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<InputProps> = (value) => {
    setIsLoading(true);
    const registerService = new RegisterService();

    registerService
      .addRegister({ name: value.name, email: value.email })
      .then(() => {
        showSuccess('確認メールを送信しました');
        resetField('email');
        resetField('name');
      })
      .catch(() => {
        showError('登録に失敗しました');
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
          name="name"
          control={control}
          render={({ field }) => (
            <TextFieldWithIcon
              {...field}
              label="ユーザー名"
              placeholder="ユーザー名を入力してください"
              disabled={isLoading}
              icon={<PersonIcon sx={{ color: '#1565C0', height: 20, wight: 20, marginRight: 1 }} />}
            />
          )}
        />
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
        {isLoading ? (
          <>Loading...</>
        ) : (
          <Button
            variant="contained"
            sx={{ marginTop: 2 }}
            disabled={isLoading}
            type="submit"
          >
            メールを送信する
          </Button>
        )}
      </Stack>
    </RegistrationFormBox>
  );
};

export default SignUp;
