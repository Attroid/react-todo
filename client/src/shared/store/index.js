import { createContext, useContext } from 'react';
import RootStore from './RootStore';

export const { stores } = new RootStore();

const StoresContext = createContext();

export const useStores = () => {
  return useContext(StoresContext);
};

export const StoreProvider = ({ children }) => (
  <StoresContext.Provider value={stores}>{children}</StoresContext.Provider>
);
