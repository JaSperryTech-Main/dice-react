import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react';

const UpgradeContext = createContext();

const createUpgrade = (initialState = {}) => ({
  ...{
    upgradeName: {
      id: 1,
      title: 'Title',
      cost: 100,
      description: 'Description',
    },
  },
  ...initialState,
});

export const UpgradeProvider = ({ children }) => {
  const [upgrades] = useState(createUpgrade());

  return (
    <UpgradeContext.Provider value={{ upgrades }}>
      {children}
    </UpgradeContext.Provider>
  );
};

export const useUpgrade = () => useContext(UpgradeContext);
