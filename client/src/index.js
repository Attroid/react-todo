import { createRoot } from 'react-dom/client';
import App from './App';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @media (max-width: 575px) {
    html, body, #root {
      height: 100%;
    }

    .app {
      min-height: 100%;
    }
  }
`;

const root = createRoot(document.getElementById('root'));

root.render(
  <>
    <App />
    <GlobalStyle />
  </>
);
