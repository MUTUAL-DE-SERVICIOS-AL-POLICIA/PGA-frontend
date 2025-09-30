//import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './styles.css'
import { DevBar } from './components/DevBar.tsx';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createPalette } from './utils/createPalette.ts';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1440
    }
  },
  palette: createPalette(),
  typography: {
    fontFamily: 'poppins',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px', // Establece el radio de los bordes para todos los botones
        },
      },
    },
  },
});
// Carga la fuente personalizada
const fontStyle = new FontFace('poppins', `url(./src/assets/fonts/Poppins-Regular.woff2)`);
// Aplica la fuente personalizada
fontStyle.load().then(() => {
  document.fonts.add(fontStyle);
});


const isProd = import.meta.env.VITE_STATE_PROD === 'true';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    {!isProd && <DevBar />}
    <App />
  </ThemeProvider>
  // </React.StrictMode>
)
