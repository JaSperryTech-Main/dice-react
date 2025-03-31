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
    <aside className="w-[33vw] h-screen p-5 box-border bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col text-center shadow-lg border-l border-gray-300">
      {/* Gold + Tabs */}
      <div className="w-full flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-amber-600">
            {player.gold}
          </span>
          <span className="text-lg font-semibold text-gray-700">Gold</span>
        </div>
        <div className="flex gap-2 bg-gray-200 p-1 rounded-lg">
          <button
            onClick={() => setActivePage('upgrades')}
            className={`px-4 py-1 rounded-md transition-all ${
              activePage === 'upgrades'
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 hover:bg-gray-300 text-gray-700'
            }`}
          >
            Upgrades
          </button>
          <button
            onClick={() => setActivePage('packs')}
            className={`px-4 py-1 rounded-md transition-all ${
              activePage === 'packs'
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 hover:bg-gray-300 text-gray-700'
            }`}
          >
            Packs
          </button>
        </div>
      </div>

      {activePage === 'upgrades' && (
        <div className="flex flex-col h-full overflow-hidden">
          {/* Owned Upgrades - Horizontal Scroll */}
          <div className="mb-6">
            <h3 className="text-left text-gray-600 font-medium mb-2">
              Your Upgrades
            </h3>
            <div className="relative">
              <div className="overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                <div className="flex gap-4">
                  {Object.entries(upgradesState)
                    .filter(([_, count]) => count > 0)
                    .map(([upgradeId, count]) => {
                      const upgrade = upgrades.find((u) => u.id === upgradeId);
                      if (!upgrade) return null;

                      return (
                        <div
                          key={upgradeId}
                          className="flex-shrink-0 w-28 bg-white rounded-lg p-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                        >
                          <div className="flex flex-col items-center">
                            <img
                              src={upgrade.image}
                              alt={upgrade.title}
                              className="w-12 h-12 mb-2 object-contain"
                            />
                            <span className="font-bold text-sm text-gray-800 truncate w-full">
                              {upgrade.title}
                            </span>
                            <span className="text-xs text-gray-500 mt-1">
                              Lv. {count}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>

          {/* Available Upgrades - Vertical List */}
          <div className="flex-1 overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            <h3 className="text-left text-gray-600 font-medium mb-3">
              Available Upgrades
            </h3>
            <div className="space-y-4">
              {upgrades.map((upgrade) => {
                const currentCount = upgradesState[upgrade.id] || 0;
                const nextCost = upgrade.cost * (currentCount + 1);
                const canAfford = player.gold >= nextCost;

                return (
                  <div
                    key={upgrade.id}
                    className="grid grid-cols-2 gap-3 p-4 rounded-lg bg-white shadow-sm border border-gray-200 hover:shadow-md transition-all"
                  >
                    <div className="col-span-2 flex items-start gap-3">
                      <div className="bg-gray-100 p-2 rounded-lg">
                        <img
                          src={upgrade.image}
                          alt={upgrade.title}
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                      <div className="text-left">
                        <h2 className="font-bold text-gray-800">
                          {upgrade.title}{' '}
                          {currentCount > 0 && (
                            <span className="text-sm font-normal text-gray-500">
                              (Level {currentCount})
                            </span>
                          )}
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                          {upgrade.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span
                        className={`text-sm font-medium ${
                          canAfford ? 'text-green-600' : 'text-red-500'
                        }`}
                      >
                        {nextCost} Gold
                      </span>
                    </div>
                    <button
                      onClick={() => handleBuyUpgrade(upgrade.id)}
                      className={`py-2 px-4 rounded-md font-medium transition-all ${
                        canAfford
                          ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-sm'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!canAfford}
                    >
                      {currentCount > 0 ? 'Upgrade' : 'Purchase'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Packs Section */}
      {activePage === 'packs' && (
        <div className="flex-1 overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          <h3 className="text-left text-gray-600 font-medium mb-3">
            Available Packs
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {Object.entries(Packs).map(([packName, packInstance]) => {
              const canAfford = player.gold >= packInstance.cost;
              const isDisabled = disabledPack === packName;

              return (
                <div
                  key={packName}
                  className="p-4 rounded-lg bg-white shadow-sm border border-gray-200 hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-bold text-gray-800">
                      {packName}
                    </h2>
                    <span
                      className={`text-sm font-medium ${
                        canAfford ? 'text-green-600' : 'text-red-500'
                      }`}
                    >
                      {packInstance.cost} Gold
                    </span>
                  </div>
                  <button
                    className={`w-full py-2 px-4 rounded-md font-medium transition-all ${
                      isDisabled
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : canAfford
                        ? 'bg-green-500 hover:bg-green-600 text-white shadow-sm'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                    onClick={() => handleOpenPack(packName, packInstance)}
                    disabled={isDisabled || !canAfford}
                  >
                    {isDisabled ? 'Opening...' : `Open ${packName}`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
};

export default DisplayBar;
