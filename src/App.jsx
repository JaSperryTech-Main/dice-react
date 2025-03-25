import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home } from './pages';
import { PlayerProvider } from './context/PlayerContext.jsx';
import DefaultLayout from './layout/DefaultLayout';

function App() {
  return (
    <Router>
      <PlayerProvider>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </PlayerProvider>
    </Router>
  );
}

export default App;
