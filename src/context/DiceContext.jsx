import { useContext } from 'react';
import { createContext } from 'react';
import { useState } from 'react';

const DiceContext = createContext();

const createDice = (initialState = {}) => ({
  ...{
    Normal_D6: { id: 'normal', sides: 6, multiplier: 1 },
    Uncommon_D6: { id: 'uncommon', sides: 6, multiplier: 1.5 },
    Rare_D6: { id: 'rare', sides: 6, multiplier: 2 },
    Epic_D6: { id: 'epic', sides: 6, multiplier: 2.5 },
    Legendary_D6: { id: 'legendary', sides: 6, multiplier: 3 },
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
