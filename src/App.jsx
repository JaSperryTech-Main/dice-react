import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home } from './pages';
import { AllProviders } from './context/providers';
import DefaultLayout from './layout/DefaultLayout';

function App() {
  return (
    <Router>
      <AllProviders>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </AllProviders>
    </Router>
  );
}

export default App;
