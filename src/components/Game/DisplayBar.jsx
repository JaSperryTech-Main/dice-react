import { useState, useEffect } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import { useUpgrade } from '../../context/UpgradeContext.jsx';
import { usePacks } from '../../context/PackContext.jsx';

const DisplayBar = () => {
  const { player, removeGold, addDice, getUpgrades, addUpgrade } = usePlayer();
  const { upgrades } = useUpgrade();
  const { Packs } = usePacks();
  const [activePage, setActivePage] = useState('upgrades');
  const [disabledPack, setDisabledPack] = useState(null);
  const [upgradesState, setUpgradesState] = useState({});

  const handleBuyUpgrade = (id, amount = 1) => {
    const upgrade = upgrades.find((u) => u.id === id);
    if (!upgrade) {
      console.error(`Upgrade ${id} not found.`);
      return;
    }

    const currentCount = upgradesState[id] || 0;
    const totalCost = upgrade.cost * (currentCount + 1);

    if (player.gold >= totalCost) {
      removeGold(totalCost);
      addUpgrade(id, amount);
      setUpgradesState((prev) => ({
        ...prev,
        [id]: currentCount + 1,
      }));
      setUpgradesState(getUpgrades());
    } else {
      console.log(`Need ${totalCost} gold (have ${player.gold})`);
    }
  };

  const handleOpenPack = (packName, packInstance) => {
    if (player.gold >= packInstance.cost) {
      removeGold(packInstance.cost);
      const item = packInstance.chooseItem();
      addDice(item);
      setDisabledPack(packName);
      setTimeout(() => setDisabledPack(null), 1000);
    } else {
      console.log('Not Enough Gold');
    }
  };

  useEffect(() => {
    setUpgradesState(getUpgrades());
  }, [player.upgrades]);

  return (
    <aside className="w-[33vw] h-screen border border-black p-5 box-border bg-[#f8f8f8] flex flex-col text-center">
      {/* Gold + Tabs */}
      <div className="w-full flex justify-between items-center mb-5">
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
        <div className="flex flex-col overflow-x-scroll">
          {/* Owned Upgrades - Horizontal Scroll */}
          <div className="relative mb-5">
            <div className="overflow-x-scroll whitespace-nowrap pb-3 ">
              <div className="flex gap-4 max-h-max mb-1">
                {Object.entries(upgradesState)
                  .filter(([_, count]) => count > 0)
                  .map(([upgradeId, count]) => {
                    const upgrade = upgrades.find((u) => u.id === upgradeId);
                    if (!upgrade) return null;

                    return (
                      <div
                        key={upgradeId}
                        className="flex-shrink-0 w-[calc(33.33%-1rem)]"
                      >
                        <div className="flex flex-col items-center p-2 bg-gray-100 rounded h-full">
                          <img
                            src={upgrade.image}
                            alt={upgrade.title}
                            className="w-16 h-16 mb-2"
                          />
                          <span className="font-bold">{upgrade.title}</span>
                          <span className="text-sm text-gray-600">
                            Owned: {count}
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Available Upgrades - Vertical List */}
          <div className="overflow-y-scroll">
            <div className="space-y-5 mr-5">
              {upgrades.map((upgrade) => {
                const currentCount = upgradesState[upgrade.id] || 0;
                const nextCost = upgrade.cost * (currentCount + 1);

                return (
                  <div
                    key={upgrade.id}
                    className="grid grid-cols-2 grid-rows-2 gap-2 p-4 border rounded bg-white shadow"
                  >
                    <h2 className="col-start-1 row-start-1 self-start justify-self-start text-xl font-bold">
                      {upgrade.title}{' '}
                      {currentCount > 0 && `(Lv. ${currentCount})`}
                    </h2>
                    <h4 className="col-start-2 row-start-1 self-start justify-self-end text-md">
                      Cost: {nextCost}
                    </h4>
                    <p className="col-start-1 row-start-2 self-end justify-self-start text-sm">
                      {upgrade.description}
                    </p>
                    <button
                      onClick={() => handleBuyUpgrade(upgrade.id)}
                      className="col-start-2 row-start-2 self-end justify-self-end bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                      disabled={player.gold < nextCost}
                    >
                      {currentCount > 0 ? 'Upgrade' : 'Buy'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Packs Section (unchanged) */}
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
