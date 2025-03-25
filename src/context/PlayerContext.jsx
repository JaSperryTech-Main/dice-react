import { useContext } from 'react';
import { createContext } from 'react';
import { useState } from 'react';

const PlayerContext = createContext();

export const usePlayer = () => {
  return useContext(PlayerContext);
};

const createPlayer = (initialState = {}) => ({
  ...{
    dices: ['Normal_D6'],
    totalRolls: 0,
    gold: 0,
    upgradeLevel: {
      normal: 0,
      golden: 0,
    },
  },
  ...initialState,
});

export const PlayerProvider = ({ children }) => {
  const [player, setPlayer] = useState(createPlayer());

  const addGold = (amount) => {
    setPlayer((prev) => ({
      ...prev,
      gold: prev.gold + amount,
    }));
  };

  const addDice = (id) => {
    setPlayer((prev) => ({
      ...prev,
      dices: [...prev.dices, id],
    }));
  };

  const removeDice = (id) => {
    setPlayer((prev) => ({
      ...prev,
      dices: prev.dices.filter((dice) => dice !== id),
    }));
  };

  return (
    <PlayerContext.Provider
      value={{
        player,
        addGold,
        addDice,
        removeDice,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
