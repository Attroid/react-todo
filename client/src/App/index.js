import './bootstrapCustomization.scss';
import { StoreProvider } from 'shared/store';
import Toaster from './Toaster';
import Layout from './Layout';
import AppRoutes from './Routes';
import { BrowserRouter } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <StoreProvider>
      <Layout>
        <AppRoutes />
      </Layout>
      <Toaster position='bottom-end' />
    </StoreProvider>
  </BrowserRouter>
);

export default App;
