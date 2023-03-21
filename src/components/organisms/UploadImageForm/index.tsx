import { PhotoCamera } from '@mui/icons-material';
import { Theme, SxProps } from '@mui/material';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import ImageUploadBox, { ImageUploadBoxPropsType } from '@/components/molecules/ImageUploadBox';
import Box, { BoxPropsType } from '@/components/mui/Box';
import Button from '@/components/mui/Button';

import Stack from '@/components/mui/Stack';
import TextField from '@/components/mui/TextField';

type InputProps = {
  title: string;
  description: string;
};

export type ImageUploadFormPropsType = Pick<BoxPropsType, 'sx'> & ImageUploadBoxPropsType;

const UploadImageForm = ({ src, sx = undefined }: ImageUploadFormPropsType) => {
  const { control, handleSubmit } = useForm<InputProps>({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSubmit: SubmitHandler<InputProps> = (value) => {
    console.log(value);
  };

  return (
    <Box
      sx={
        [
          { display: 'flex' },
          ...(Array.isArray(sx) ? (sx as SxProps<Theme>[]) : ([sx] as SxProps<Theme>[])),
        ] as SxProps<Theme>
      }
    >
      <Box sx={{ mr: 8 }}>
        <ImageUploadBox
          src={src}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          sx={{ width: 200 }}
        >
          <PhotoCamera sx={{ height: 18, width: 18, mr: 1 }} />
          アップロード
          <input
            hidden
            accept="image/*"
            type="file"
          />
        </Button>
      </Box>
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
      >
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              label="タイトル"
              required
              placeholder="本のタイトルを入力してください"
              value={field.value}
              name={field.name}
              onChange={field.onChange}
              onBlur={field.onBlur}
              type="text"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                sx: {
                  fontSize: {
                    xs: 10,
                    sm: 14,
                  },
                },
              }}
              sx={{
                mb: {
                  xs: 2,
                  sm: 3,
                },
              }}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              label="詳細"
              required
              placeholder="本の詳細を入力してください"
              value={field.value}
              name={field.name}
              onChange={field.onChange}
              onBlur={field.onBlur}
              type="text"
              multiline
              InputLabelProps={{ shrink: true }}
              InputProps={{
                rows: 4,
                sx: {
                  fontSize: {
                    xs: 10,
                    sm: 14,
                  },
                },
              }}
              sx={{
                mb: {
                  xs: 2,
                  sm: 3,
                },
              }}
            />
          )}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{ width: 200 }}
        >
          登録
        </Button>
      </Stack>
    </Box>
  );
};

export default UploadImageForm;
