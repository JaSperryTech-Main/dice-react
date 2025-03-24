import { useGame } from '../context/GameContext';

const Home = () => {
  const { player, lootTables, upgradesList } = useGame();
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export default Home;
