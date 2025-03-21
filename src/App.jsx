import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home } from './pages';
import DefaultLayout from './layout/DefaultLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
