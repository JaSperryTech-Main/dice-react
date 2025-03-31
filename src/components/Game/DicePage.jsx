import { usePlayer } from '../../context/PlayerContext';
import { useDice } from '../../context/DiceContext.jsx';
import Roll from 'roll';
import { useState, useRef, useEffect } from 'react';

const roll = new Roll();

const DicePage = () => {
  const { player, addGold } = usePlayer();
  const { dice } = useDice();
  const [isRolling, setIsRolling] = useState(false);
  const [lastRollTotal, setLastRollTotal] = useState(0);
  const diceRefs = useRef([]);

  // Reset refs when dice change
  useEffect(() => {
    diceRefs.current = diceRefs.current.slice(0, player.dices.length);
  }, [player.dices]);

  const onRoll = async () => {
    if (isRolling || player.dices.length === 0) return;
    setIsRolling(true);
    setLastRollTotal(0);

    // Capture current dice state to avoid changes during roll
    const currentDices = [...player.dices];
    const currentRollSpeed = player.upgrades.rollSpeed || 0;

    // Generate results based on current dice
    const randomResults = currentDices.map((diceType) => {
      const diceConfig = dice[diceType] || { sides: 6, multiplier: 1 };
      const result = roll.roll(`1d${diceConfig.sides}`).result;
      return {
        diceType,
        result,
        finalResult: result * diceConfig.multiplier,
      };
    });

    // Calculate total gold once
    const totalGold = randomResults.reduce(
      (sum, { finalResult }) => sum + finalResult,
      0
    );

    // Animate each die
    const animationPromises = currentDices.map((_, index) => {
      return new Promise((resolve) => {
        if (!diceRefs.current[index]) return resolve();

        const diceElement = diceRefs.current[index].querySelector('.dice-text');
        const multiplierElement =
          diceRefs.current[index].querySelector('.dice-multiplier');
        let currentRoll = 1;

        // Add rolling animation class
        diceRefs.current[index].classList.add('rolling');

        const interval = setInterval(() => {
          currentRoll = Math.floor(Math.random() * 6) + 1;
          diceElement.textContent = currentRoll;
        }, 50);

        // Calculate duration with safe minimum
        const baseDuration = Math.random() * (5 - 2) + 2;
        const speedReduction = 100 * currentRollSpeed;
        const duration = Math.max(500, baseDuration * 1000 - speedReduction);

        setTimeout(() => {
          clearInterval(interval);
          diceElement.textContent = randomResults[index].result;
          multiplierElement.textContent = `x${randomResults[index].finalResult}`;

          // Remove rolling animation class
          diceRefs.current[index].classList.remove('rolling');
          diceRefs.current[index].classList.add('rolled');

          setTimeout(() => {
            diceRefs.current[index].classList.remove('rolled');
          }, 1000);

          resolve();
        }, duration);
      });
    });

    // Wait for all animations to complete
    await Promise.all(animationPromises);
    addGold(totalGold);
    setLastRollTotal(totalGold);
    setIsRolling(false);
  };

  const rarityColors = {
    common: {
      border: 'border-gray-400',
      text: 'text-gray-600',
      bg: 'bg-gray-50',
      shadow: 'shadow-gray-400/30',
    },
    uncommon: {
      border: 'border-green-500',
      text: 'text-green-600',
      bg: 'bg-green-50',
      shadow: 'shadow-green-500/30',
    },
    rare: {
      border: 'border-blue-500',
      text: 'text-blue-600',
      bg: 'bg-blue-50',
      shadow: 'shadow-blue-500/30',
    },
    epic: {
      border: 'border-purple-500',
      text: 'text-purple-600',
      bg: 'bg-purple-50',
      shadow: 'shadow-purple-500/30',
    },
    legendary: {
      border: 'border-yellow-500',
      text: 'text-yellow-600',
      bg: 'bg-yellow-50',
      shadow: 'shadow-yellow-500/30',
    },
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-[66vw] relative bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Roll result display */}
      {lastRollTotal > 0 && (
        <div className="absolute top-8 animate-bounce">
          <div className="bg-amber-500 text-white px-6 py-3 rounded-full shadow-lg font-bold text-xl">
            +{lastRollTotal} Gold!
          </div>
        </div>
      )}

      {/* Dice grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full max-w-4xl px-6 py-8 overflow-y-auto">
        {player.dices.map((diceType, index) => {
          const diceConfig = dice[diceType] || { multiplier: 1, id: 'common' };
          const rarity = diceConfig.id || 'common';
          console.log(rarity);

          return (
            <div
              key={`dice-${diceType}-${index}`}
              ref={(el) => (diceRefs.current[index] = el)}
              className={`dice w-24 h-24 ${rarityColors[rarity].bg} ${rarityColors[rarity].border} border-2 flex flex-col justify-center items-center text-4xl font-bold rounded-xl shadow-lg ${rarityColors[rarity].shadow} transition-all duration-300 relative group`}
            >
              <p className="dice-text transition-transform duration-100">1</p>
              <div
                className={`absolute bottom-2 right-2 text-sm font-semibold ${rarityColors[rarity].text}`}
              >
                x{diceConfig.multiplier}
              </div>
              <div
                className={`dice-multiplier absolute top-0 left-0 w-full h-full flex items-center justify-center ${rarityColors[rarity].text} opacity-0 transition-opacity duration-300`}
              >
                {/* This will show the final multiplied result during animation */}
              </div>
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none">
                <div
                  className={`w-full h-full ${rarityColors[rarity].bg.replace(
                    '50',
                    '100'
                  )} rounded-xl`}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Roll button */}
      <button
        onClick={onRoll}
        disabled={isRolling || player.dices.length === 0}
        className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 px-12 py-4 text-xl font-bold cursor-pointer rounded-full transition-all duration-300 ease-in-out shadow-lg ${
          isRolling
            ? 'bg-gray-400 cursor-not-allowed'
            : player.dices.length === 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white hover:shadow-xl hover:scale-105'
        }`}
      >
        {isRolling ? (
          <span className="flex items-center gap-2">
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Rolling...
          </span>
        ) : (
          'Roll Dice'
        )}
      </button>

      {/* Empty state */}
      {player.dices.length === 0 && (
        <div className="text-center p-8 bg-white rounded-xl shadow-md max-w-md mx-auto">
          <h3 className="text-xl font-bold text-gray-700 mb-2">
            No Dice Available
          </h3>
          <p className="text-gray-500">Open packs from the shop to get dice!</p>
        </div>
      )}
    </div>
  );
};

export default DicePage;
