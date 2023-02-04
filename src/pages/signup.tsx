import Box from '@/components/mui/Box';
import Typography from '@/components/mui/Typography';
import Button from '@/components/mui/Button';
import TextField, { TextFieldPropsType } from '@/components/mui/TextField';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonIcon from '@mui/icons-material/Person';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';

// Muiの型を継承できなかったためStackのみ直でImport
// TODO: 調査・修正予定
import { Stack } from '@mui/material';

import { memo, forwardRef } from 'react';

import { ReactNode } from 'react';

const TextFieldWithIcon = memo(
  forwardRef<
    HTMLDivElement,
    Pick<
      TextFieldPropsType,
      'label' | 'placeholder' | 'error' | 'helperText' | 'value' | 'onChange' | 'type'
    > & {
      icon: ReactNode;
    }
  >(({ label, placeholder, icon, error, helperText, value, type, onChange }, ref) => {
    return (
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
        error={error}
        helperText={helperText}
        value={value}
        onChange={onChange}
        type={type}
      />
    );
  }),
);

type InputProps = {
  name: string;
  email: string;
};

const signUp = () => {
  const { control, handleSubmit, register } = useForm<InputProps>();

  const onSubmit: SubmitHandler<InputProps> = (data) => {
    console.log(data);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f3fd',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          width: 500,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          p: 6,
          boxShadow: '0px 0px 15px -5px #777777',
          borderRadius: '10px',
        }}
      >
        <Typography
          sx={{ mb: 4, fontSize: 32, textAlign: 'center', marginBottom: 1, fontWeight: 'bold' }}
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
        <Stack
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="name"
            control={control}
            render={() => (
              <TextFieldWithIcon
                label="ユーザー名"
                placeholder="ユーザー名を入力してください"
                icon={
                  <>
                    <PersonIcon sx={{ color: '#1565C0', height: 20, wight: 20, marginRight: 1 }} />
                  </>
                }
                {...register('name')}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={() => (
              <TextFieldWithIcon
                label="メール"
                placeholder="メールを入力してください"
                type="email"
                icon={
                  <>
                    <MailOutlineIcon
                      sx={{ color: '#1565C0', height: 20, wight: 20, marginRight: 1 }}
                    />
                  </>
                }
                {...register('email')}
              />
            )}
          />
          <Button
            variant="contained"
            sx={{ marginTop: 2 }}
            type="submit"
          >
            メールを送信する
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default signUp;
