import { ReactNode } from 'react';

import Box from '@/components/mui/Box';
import Typography from '@/components/mui/Typography';

export type RegistrationFormBoxPropsType = {
  description: string;
  children: ReactNode;
};

const RegistrationFormBox = ({ description, children }: RegistrationFormBoxPropsType) => (
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
        {description}
      </Typography>
      {children}
    </Box>
  </Box>
);

export default RegistrationFormBox;
