import { createMuiTheme } from '@material-ui/core/styles';

// https://material-ui.com/customization/typography/#self-hosted-fonts
const lora = {
  fontFamily: 'Lora',
  fontStyle: 'normal',
  fontDisplay: 'swap' as const,
  fontWeight: 400,
  // https://fonts.googleapis.com/css2?family=Lora:wght@400;700&display=swap
  src: `
    url(https://fonts.gstatic.com/s/lora/v17/0QIvMX1D_JOuMwf7I_FMl_GW8g.woff2) format('woff2')
  `,
  unicodeRange: 'U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F',
};

export const theme = createMuiTheme({
  typography: {
    fontFamily: ['Lora', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
    fontSize: 16,
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [lora],
      },
    },
  },
  palette: {
    primary: {
      main: '#125bd3',
    },
    secondary: {
      main: '#e67200',
    },
  },
});