import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home } from './pages';
import { GameProvider } from './context/GameContext.jsx';
import DefaultLayout from './layout/DefaultLayout';

function App() {
  return (
    <Router>
      <GameProvider>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </GameProvider>
    </Router>
  );
}

export default App;
