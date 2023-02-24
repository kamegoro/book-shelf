import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SnackbarProvider } from '@/components/contexts/SnackbarContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider>
      <Component {...pageProps} />
    </SnackbarProvider>
  );
}
