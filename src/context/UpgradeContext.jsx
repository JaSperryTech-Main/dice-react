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
    {
      id: 'upgarde2',
      title: 'Upgarde 2',
      cost: 1,
      description: 'upgarde2',
    },
    {
      id: 'upgarde3',
      title: 'upgarde3',
      cost: 1,
      description: 'upgarde3',
    },
    {
      id: 'upgarde4',
      title: 'upgarde4',
      cost: 1,
      description: 'upgarde4',
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
