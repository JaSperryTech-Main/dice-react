import { useContext } from 'react';
import { createContext } from 'react';
import { useState } from 'react';

const DiceContext = createContext();

const createDice = (initialState = {}) => ({
  ...{
    Normal_D6: { id: 'Normal', sides: 6, multiplier: 1 },
    Uncommon_D6: { id: 'Uncommon', sides: 6, multiplier: 1.5 },
    Rare_D6: { id: 'Rare', sides: 6, multiplier: 2 },
    Epic_D6: { id: 'Epic', sides: 6, multiplier: 2.5 },
    Legendary_D6: { id: 'Legendary', sides: 6, multiplier: 3 },
  },
  ...initialState,
});

export const DiceProvider = ({ children }) => {
  const [dice] = useState(createDice());

  return (
    <DiceContext.Provider value={{ dice }}>{children}</DiceContext.Provider>
  );
};

export const useDice = () => useContext(DiceContext);
