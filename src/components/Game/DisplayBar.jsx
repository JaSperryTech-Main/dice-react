import { useState } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import { useUpgrade } from '../../context/UpgradeContext.jsx';
import { usePacks } from '../../context/PackContext.jsx';

const DisplayBar = () => {
  const { player, removeGold, addDice } = usePlayer();
  const { upgrades } = useUpgrade();
  const { Packs } = usePacks();
  const [activePage, setActivePage] = useState('upgrades');
  const [disabledPack, setDisabledPack] = useState(null);

  const handleBuyUpgrade = (id) => {
    const upgrade = Object.values(upgrades).find((u) => u.id === id);
    if (player.gold >= upgrade.cost) {
      removeGold(upgrade.cost);
    } else {
      console.log('Not enough gold');
    }
  };

  const handleOpenPack = (packName, packInstance) => {
    if (player.gold >= packInstance.cost) {
      const item = packInstance.chooseItem();
      addDice(item);
      setDisabledPack(packName);

      setTimeout(() => {
        setDisabledPack(null);
      }, 1000);
    } else {
      console.log('Not Enough Gold');
    }
  };

  return (
    <aside className="w-[33vw] h-screen border border-black p-5 box-border bg-[#f8f8f8] flex flex-col text-center">
      <div className="w-full flex justify-between items-center mb-4">
        <p className="text-lg font-semibold">Gold: {player.gold}</p>
        <div className="flex gap-2">
          <button
            onClick={() => setActivePage('upgrades')}
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
          >
            Upgrades
          </button>
          <button
            onClick={() => setActivePage('packs')}
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
          >
            Packs
          </button>
        </div>
      </div>

      {activePage === 'upgrades' && (
        <div className="flex flex-col gap-4">
          {Object.values(upgrades).map((upgrade) => (
            <div
              key={upgrade.id}
              className="grid grid-cols-2 grid-rows-2 gap-2 p-4 border rounded bg-white shadow"
            >
              <h2 className="col-start-1 row-start-1 self-start justify-self-start text-xl font-bold">
                {upgrade.title}
              </h2>
              <h4 className="col-start-2 row-start-1 self-start justify-self-end text-md">
                Cost: {upgrade.cost}
              </h4>
              <p className="col-start-1 row-start-2 self-end justify-self-start text-sm">
                {upgrade.description}
              </p>
              <button
                onClick={() => handleBuyUpgrade(upgrade.id)}
                className="col-start-2 row-start-2 self-end justify-self-end bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
              >
                Buy
              </button>
            </div>
          ))}
        </div>
      )}

      {activePage === 'packs' && (
        <div className="flex flex-col gap-4">
          {Object.entries(Packs).map(([packName, packInstance]) => (
            <div
              key={packName}
              className="grid grid-cols-1 gap-2 p-4 border rounded bg-white shadow"
            >
              <h2 className="text-xl font-bold">{packName}</h2>
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                onClick={() => handleOpenPack(packName, packInstance)}
                disabled={disabledPack === packName}
              >
                {disabledPack === packName ? 'Opened' : `Open ${packName}`}
              </button>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
};

export default DisplayBar;
