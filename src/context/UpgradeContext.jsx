import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react';

const UpgradeContext = createContext();

const createUpgrade = (initialState = []) => [
  ...[
    {
      id: 'rollSpeed',
      title: 'Roll Speed',
      cost: 1,
      description: 'Desceases Roll Speed',
    },
  ],
  ...initialState,
];

export const UpgradeProvider = ({ children }) => {
  const [upgrades] = useState(createUpgrade());

  return (
    <UpgradeContext.Provider value={{ upgrades }}>
      {children}
    </UpgradeContext.Provider>
  );
};

export const useUpgrade = () => useContext(UpgradeContext);
