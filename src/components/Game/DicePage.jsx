import { usePlayer } from '../../context/PlayerContext';
import { useDice } from '../../context/DiceContext.jsx';
import Roll from 'roll';
import { useState, useRef, useEffect } from 'react';

const roll = new Roll();

const DicePage = () => {
  const { player, addGold } = usePlayer();
  const { dice } = useDice();
  const [isRolling, setIsRolling] = useState(false);
  const diceRefs = useRef([]);

  // Reset refs when dice change
  useEffect(() => {
    diceRefs.current = diceRefs.current.slice(0, player.dices.length);
  }, [player.dices]);

  const onRoll = async () => {
    if (isRolling) return;
    setIsRolling(true);

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
        let currentRoll = 1;

        const interval = setInterval(() => {
          diceElement.textContent = currentRoll;
          currentRoll = Math.floor(Math.random() * 6) + 1;
        }, 50);

        // Calculate duration with safe minimum
        const baseDuration = Math.random() * (5 - 2) + 2;
        const speedReduction = 100 * currentRollSpeed;
        console.log(speedReduction);
        const duration = Math.max(0, baseDuration * 1000 - speedReduction);
        console.log(duration);

        setTimeout(() => {
          clearInterval(interval);
          diceElement.textContent = randomResults[index].result;
          resolve();
        }, duration);
      });
    });

    // Wait for all animations to complete
    await Promise.all(animationPromises);
    addGold(totalGold);
    setIsRolling(false);
  };

  const rarityColors = {
    common: 'border-gray-400 text-gray-600',
    uncommon: 'border-green-500 text-green-500',
    rare: 'border-blue-500 text-blue-500',
    epic: 'border-purple-500 text-purple-500',
    legendary: 'border-yellow-500 text-yellow-500',
  };

  return (
    <div className="flex content-center items-center h-screen w-[66vw] flex-col relative">
      <div className="grid grid-cols-5 gap-x-[5vh] gap-y-[5vw] w-[85%] min-h-[66vh] justify-items-center mt-[5vh] mb-[15vh] overflow-y-auto p-2.5">
        {player.dices.map((diceType, index) => {
          const diceConfig = dice[diceType] || { multiplier: 1 };
          return (
            <div
              key={`dice-${diceType}-${index}`}
              ref={(el) => (diceRefs.current[index] = el)}
              className={`dice w-[120px] h-[120px] bg-white border-2 ${
                rarityColors[diceConfig.id || 'common']
              } flex justify-center items-center text-[50px] font-bold rounded-[15px] shadow-[0_4px_8px_rgba(0,0,0,0.2)] transition-transform duration-200 ease-in-out transform hover:scale-105 cursor-pointer relative`}
            >
              <p className="dice-text">1</p>
              <div className="absolute bottom-2 right-2 text-[16px] font-semibold text-gray-600">
                x{diceConfig.multiplier}
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={onRoll}
        disabled={isRolling}
        className={`absolute bottom-5 left-1/2 transform -translate-x-1/2 px-8 py-4 text-lg cursor-pointer border-none rounded-full transition-all duration-300 ease-in-out ${
          isRolling
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-500 hover:bg-green-600 text-white'
        }`}
      >
        {isRolling ? `Rolling...` : 'Roll Dice'}
      </button>
    </div>
  );
};

export default DicePage;
