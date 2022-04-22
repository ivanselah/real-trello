import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RecoilRoot } from 'recoil';
import GlobalStyles from './styles';
import { ThemeProvider } from 'styled-components';
import { initialTheme } from './theme';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={initialTheme}>
        <App />
        <GlobalStyles />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
);
