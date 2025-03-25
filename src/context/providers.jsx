import { PlayerProvider } from './PlayerContext';
import { DiceProvider } from './DiceContext';
import { PackProvider } from './PackContext';
import { UpgradeProvider } from './UpgradeContext';

export const AllProviders = ({ children }) => (
  <PlayerProvider>
    <UpgradeProvider>
      <PackProvider>
        <DiceProvider>{children}</DiceProvider>
      </PackProvider>
    </UpgradeProvider>
  </PlayerProvider>
);
