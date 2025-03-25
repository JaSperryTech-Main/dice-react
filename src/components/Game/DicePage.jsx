import { usePlayer } from '../../context/PlayerContext';
import { useDice } from '../../context/DiceContext.jsx';
import Roll from 'roll';
import { useState } from 'react';

const roll = new Roll();

const DicePage = () => {
  const { player, addGold } = usePlayer();
  const { dice } = useDice();
  const [isRolling, setIsRolling] = useState(false);

  const onRoll = () => {
    if (isRolling) true;
    setIsRolling(true);

    const diceElements = document.querySelectorAll('.dice');

    const randomResults = player.dices.map((diceType) => {
      const { sides, multiplier } = dice[diceType];
      const result = roll.roll(`1d${sides}`).result;
      return { diceType, result, finalResult: result * multiplier };
    });

    diceElements.forEach((dice, index) => {
      let currentRoll = 1;

      const interval = setInterval(() => {
        dice.textContent = currentRoll;
        currentRoll = Math.floor(Math.random() * 6) + 1;
      }, 50);

      setTimeout(() => {
        clearInterval(interval);
        const resultForDice = randomResults[index % randomResults.length];
        dice.textContent = resultForDice.result;
        addGold(resultForDice.finalResult);
      }, 2000);
    });

    setTimeout(() => {
      setIsRolling(false);
    }, 2000);
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
        {player.dices.map((diceType, index) => (
          <div
            key={`dice${index}`}
            className={`dice w-[120px] h-[120px] bg-white border-2 ${
              rarityColors[dice[diceType]?.id || 'common']
            } flex justify-center items-center text-[50px] font-bold rounded-[15px] shadow-[0_4px_8px_rgba(0,0,0,0.2)] transition-transform duration-200 ease-in-out transform hover:scale-105 cursor-pointer`}
          >
            1 Add multiplier at the bottom right corner
          </div>
        ))}
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
        {isRolling ? 'Rolling...' : 'Roll Dice'}
      </button>
    </div>
  );
};

export default DicePage;
