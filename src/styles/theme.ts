import { createTheme } from '@mui/material';
import {
  BrandColors,
  BrandColorOptions,
  GrayColors,
  GrayColorOptions,
} from '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
  interface BrandColors {
    primary: string;
    white: string;
  }

  interface BrandColorOptions {
    primary?: string;
    white?: string;
  }

  interface GrayColors {
    text: string;
    background: string;
  }

  interface GrayColorOptions {
    text?: string;
    background: string;
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    brand: BrandColors;
    gray: GrayColors;
  }

  interface PaletteOptions {
    brand: BrandColorOptions;
    gray: GrayColorOptions;
  }
}

export default createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // NOTE: ボタンテキストのアルファベットが自動で大文字になる設定をOFF
          textTransform: 'none',
        },
      },
    },
  },
  palette: {
    brand: {
      primary: '#1565C0',
      white: '#FFFFFF',
    },
    gray: {
      text: '#262626',
      background: '#fafafa',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 768,
      lg: 1025,
      xl: 1536,
    },
  },
});