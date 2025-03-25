import { usePlayer } from '../../context/PlayerContext';
import { useDice } from '../../context/DiceContext.jsx';
import Roll from 'roll';

const roll = new Roll();

const DicePage = () => {
  const { player, addGold } = usePlayer();
  const { dice } = useDice();

  const onRoll = () => {
    const diceElements = document.querySelectorAll('.dice');

    const randomResults = player.dices.map((diceType) => {
      const { sides, multiplier } = dice[diceType];

      let finalMultiplier = multiplier;

      // Roll the dice using the correct number of sides
      const result = roll.roll(`1d${sides}`).result;

      // Calculate the final result based on the multiplier
      const finalResult = result * finalMultiplier;

      return { diceType, multiplier: finalMultiplier, result, finalResult };
    });

    diceElements.forEach((dice, index) => {
      let currentRoll = 1; // Starting number for the dice

      // Roll the dice rapidly for 1 second
      let interval = setInterval(() => {
        dice.textContent = currentRoll; // Display the current roll
        currentRoll = Math.floor(Math.random() * 6) + 1; // Random roll (fix if different sides)
      }, 50); // Change the number every 50ms

      setTimeout(() => {
        clearInterval(interval); // Stop the rolling

        // Update dice text with final result
        const resultForDice = randomResults[index % randomResults.length];
        dice.textContent = resultForDice.finalResult; // Set the dice to the final result

        addGold(resultForDice.finalResult);
      }, 1000);
    });
  };

  return (
    <div className="flex content-center items-center h-screen w-[66vw] flex-col relative">
      <div className="grid grid-cols-5 gap-x-[5vh] gap-y-[5vw] w-[85%] min-h-[66vh] justify-items-center mt-[5vh] mb-[15vh] overflow-y-auto p-2.5">
        {player.dices.map((index) => (
          <div
            key={`dice${index}`}
            className="dice w-[120px] h-[120px] bg-white border-2 border-[#4caf50] flex justify-center items-center text-[50px] font-bold text-[#4caf50] rounded-[15px] shadow-[0_4px_8px_rgba(0,0,0,0.2)] transition-transform duration-200 ease-in-out transform hover:scale-105 cursor-pointer"
          >
            1
          </div>
        ))}
      </div>
      <button
        onClick={() => onRoll(player)}
        className="absolute bottom-5 left-1/2 transform -translate-x-1/2 px-8 py-4 text-lg cursor-pointer bg-green-500 text-white border-none rounded-full transition-all duration-300 ease-in-out hover:bg-green-600"
      >
        Roll Dice
      </button>
    </div>
  );
};

export default DicePage;
