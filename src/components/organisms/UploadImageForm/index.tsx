import { InputHTMLAttributes, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { Theme, SxProps } from '@mui/material';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { useSnackbar } from '@/components/contexts/SnackbarContext';

import ImageUploadBox, { ImageUploadBoxPropsType } from '@/components/molecules/ImageUploadBox';
import Box, { BoxPropsType } from '@/components/mui/Box';
import Button from '@/components/mui/Button';
import Fab from '@/components/mui/Fab';

import Stack from '@/components/mui/Stack';
import TextField from '@/components/mui/TextField';

import BookService from '@/core/domains/book/BookService';
import toBase64 from '@/utils/toBase64';

type InputProps = {
  title: string;
  description: string;
};

export type ImageUploadFormPropsType = Pick<BoxPropsType, 'sx'> & ImageUploadBoxPropsType;

const UploadImageForm = ({ sx = undefined }: ImageUploadFormPropsType) => {
  const [image, setImage] = useState<string | null>(null);
  const { control, handleSubmit, resetField } = useForm<InputProps>({
    defaultValues: {
      title: '',
      description: '',
    },
  });
  const { showError, showSuccess } = useSnackbar();
  const bookService = new BookService();

  const onSubmit: SubmitHandler<InputProps> = (value) => {
    bookService
      .createBook({ title: value.title, description: value.description, image: image || undefined })
      .then(() => {
        showSuccess('登録しました');
        resetField('description');
        resetField('title');
        setImage(null);
      })
      .catch(() => {
        showError('登録に失敗しました');
      });
  };

  const uploadImage: InputHTMLAttributes<HTMLInputElement>['onChange'] = (event): void => {
    const { files } = event.target;

    if (!files) {
      showError('アップロードに失敗しました');
      return;
    }

    toBase64(files[0])
      .then((base64) => {
        setImage(base64);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        showError('アップロードに失敗しました');
      });
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
          src={image}
          sx={{ mb: 2 }}
        />
        <label htmlFor="contained-button-file">
          <input
            id="contained-button-file"
            hidden
            multiple
            accept="image/*"
            type="file"
            onChange={uploadImage}
          />
          <Button
            variant="contained"
            component="span"
            sx={{ width: 200 }}
          >
            アップロード
          </Button>
        </label>
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
                  xs: 1,
                  sm: 1.5,
                },
              }}
            />
          )}
        />
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <Fab
            component="button"
            type="submit"
            sx={{ width: 36, height: 36 }}
          >
            <AddIcon />
          </Fab>
        </Box>
      </Stack>
    </Box>
  );
};

export default UploadImageForm;
