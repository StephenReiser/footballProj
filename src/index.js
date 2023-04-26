import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Change this to your desired primary color
    },
    secondary: {
      main: '#dc004e', // Change this to your desired secondary color
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// ... (existing code)
