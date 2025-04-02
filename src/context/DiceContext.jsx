import { useContext } from 'react';
import { createContext } from 'react';
import { useState } from 'react';

const DiceContext = createContext();

const createDice = (initialState = {}) => ({
  ...{
    // Common
    Normal_D1: { id: 'normal', sides: 1, multiplier: 1 },
    Normal_D2: { id: 'normal', sides: 2, multiplier: 1 },
    Normal_D3: { id: 'normal', sides: 3, multiplier: 1 },
    Normal_D4: { id: 'normal', sides: 4, multiplier: 1 },
    Normal_D5: { id: 'normal', sides: 5, multiplier: 1 },
    Normal_D6: { id: 'normal', sides: 6, multiplier: 1 },

    // Uncommon (existing)
    Uncommon_D1: { id: 'uncommon', sides: 1, multiplier: 1.5 },
    Uncommon_D2: { id: 'uncommon', sides: 2, multiplier: 1.5 },
    Uncommon_D3: { id: 'uncommon', sides: 3, multiplier: 1.5 },
    Uncommon_D4: { id: 'uncommon', sides: 4, multiplier: 1.5 },
    Uncommon_D5: { id: 'uncommon', sides: 5, multiplier: 1.5 },
    Uncommon_D6: { id: 'uncommon', sides: 6, multiplier: 1.5 },

    // Rare (25% better than Uncommon)
    Rare_D1: { id: 'rare', sides: 1, multiplier: 1.8 },
    Rare_D2: { id: 'rare', sides: 2, multiplier: 1.8 },
    Rare_D3: { id: 'rare', sides: 3, multiplier: 1.8 },
    Rare_D4: { id: 'rare', sides: 4, multiplier: 1.8 },
    Rare_D5: { id: 'rare', sides: 5, multiplier: 1.8 },
    Rare_D6: { id: 'rare', sides: 6, multiplier: 1.8 },

    // Epic (50% better than Uncommon)
    Epic_D1: { id: 'epic', sides: 1, multiplier: 2.0 },
    Epic_D2: { id: 'epic', sides: 2, multiplier: 2.0 },
    Epic_D3: { id: 'epic', sides: 3, multiplier: 2.0 },
    Epic_D4: { id: 'epic', sides: 4, multiplier: 2.0 },
    Epic_D5: { id: 'epic', sides: 5, multiplier: 2.0 },
    Epic_D6: { id: 'epic', sides: 6, multiplier: 2.0 },

    // Legendary (100% better than Uncommon)
    Legendary_D1: { id: 'legendary', sides: 1, multiplier: 2.5 },
    Legendary_D2: { id: 'legendary', sides: 2, multiplier: 2.5 },
    Legendary_D3: { id: 'legendary', sides: 3, multiplier: 2.5 },
    Legendary_D4: { id: 'legendary', sides: 4, multiplier: 2.5 },
    Legendary_D5: { id: 'legendary', sides: 5, multiplier: 2.5 },
    Legendary_D6: { id: 'legendary', sides: 6, multiplier: 2.5 },
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
