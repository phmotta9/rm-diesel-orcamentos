import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'

import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import { CssBaseline } from '@mui/material';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <App />
    </ThemeProvider>
    
  </StrictMode>
)
