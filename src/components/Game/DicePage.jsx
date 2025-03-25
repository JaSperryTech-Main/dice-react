import { usePlayer } from '../../context/PlayerContext';

const DicePage = () => {
  const { player, addGold } = usePlayer();
  const onRoll = () => {
    addGold(1);
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
