// context/providers.jsx
import { PlayerProvider } from './PlayerContext';
import { DiceProvider } from './DiceContext';
import { PackProvider } from './PackContext';

export const AllProviders = ({ children }) => (
  <PlayerProvider>
    <DiceProvider>
      <PackProvider>{children}</PackProvider>
    </DiceProvider>
  </PlayerProvider>
);
