import { useGame } from '../context/GameContext';
import DicePage from '../components/Game/DicePage';
import DisplayBar from '../components/Game/DisplayBar';

const Home = () => {
  const { player } = useGame();
  return (
    <main className="bg-[#e0f7fa] m-0 flex content-center items-center min-h-screen h-full">
      <DisplayBar player={player} />
      <DicePage player={player} />
    </main>
  );
};

export default Home;
