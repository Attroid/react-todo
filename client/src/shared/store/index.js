import { createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RootStore from './RootStore';

export const { stores } = new RootStore();

const StoresContext = createContext();

export const useStores = () => {
  return useContext(StoresContext);
};

export const StoreProvider = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // HACK to provide navigate function to mobx store
    stores.view.setNavigate(navigate);
  }, [navigate]);

  return (
    <StoresContext.Provider value={stores}>{children}</StoresContext.Provider>
  );
};
