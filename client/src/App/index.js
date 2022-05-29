import { Toaster } from 'react-hot-toast';
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from 'shared/store';
import GlobalStyle from 'shared/components/GlobalStyle';
import ErrorBoundary from 'shared/components/ErrorBoundary';

const App = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <GlobalStyle />
      <StoreProvider>
        <Routes />
      </StoreProvider>
      <Toaster position='bottom-right' />
    </BrowserRouter>
  </ErrorBoundary>
);

export default App;
