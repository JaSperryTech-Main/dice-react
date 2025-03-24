import { createContext, useState, useContext } from 'react';

const PlayerContext = createContext();

export const usePlayer = () => {
  return useContext(PlayerContext);
};

export const PlayerProvider = ({ children }) => {
  const [playerData, setPlayerData] = useState({
    dices: ['Normal_D6'],
    totalRolls: 0,
    gold: 0,
    upgradeLevel: {
      normal: 0,
      golden: 0,
    },
  });

  const updatePlayer = (newData) => {
    setPlayerData((prevData) => ({ ...prevData, newData }));
  };

  return (
    <PlayerContext.Provider value={{ playerData, updatePlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};
