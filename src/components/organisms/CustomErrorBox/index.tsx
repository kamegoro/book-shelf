import { ReactNode } from 'react';

import { useRouter } from 'next/router';

import Box from '@/components/mui/Box';
import Button from '@/components/mui/Button';
import Typography from '@/components/mui/Typography';

type CustomErrorBoxPropsType = {
  statusCode: '403' | '404' | '500';
  message: string;
  description: ReactNode;
};

const CustomErrorBox = ({ statusCode, message, description }: CustomErrorBoxPropsType) => {
  const router = useRouter();

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
          width: 700,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          pb: 6,
          boxShadow: '0px 0px 15px -5px #777777',
          borderRadius: '10px',
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontSize: 160,
            fontWeight: 'bold',
            color: '#262626',
            textAlign: 'center',
            transform: 'translate(0,18px)',
          }}
        >
          {statusCode.charAt(0)}
          <Typography
            component="span"
            sx={{
              color: '#1565C0',
              fontSize: 160,
              fontWeight: 'bold',
            }}
          >
            {statusCode.charAt(1)}
          </Typography>
          {statusCode.charAt(2)}
        </Typography>
        <Typography
          sx={{
            marginBottom: 1,
            fontSize: 20,
            fontWeight: 'bold',
            color: '#262626',
            textAlign: 'center',
          }}
        >
          {message}
        </Typography>
        <Typography
          sx={{
            fontSize: 14,
            opacity: 0.4,
            color: '#262626',
            textAlign: 'center',
            marginBottom: 4,
          }}
        >
          {description}
        </Typography>
        <Button
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            router.push(`/`);
          }}
          variant="contained"
          sx={{ width: 260, margin: '0 auto', fontWeight: 'bold' }}
          size="large"
        >
          TOPページへ
        </Button>
      </Box>
    </Box>
  );
};

export default CustomErrorBox;
