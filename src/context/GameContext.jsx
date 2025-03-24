import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';

class Player {
  constructor() {
    this._state = {
      dices: ['Normal_D6'],
      totalRolls: 0,
      gold: 0,
      upgradeLevel: {
        normal: 0,
        golden: 0,
      },
    };
  }

  get dices() {
    return this._state.dices;
  }

  set dices(newDices) {
    this._state.dices = newDices;
    this.stateChanged();
  }

  addDice(id) {
    const newDices = [...this._state.dices, id];
    this.dices = newDices;
  }

  removeDice(id) {
    const newDices = this._state.dices.filter((dice) => dice !== id);
    this.dices = newDices;
  }

  getDiceDetails(dicesDetailsMap) {
    return this._state.dices.map((id) => dicesDetailsMap[id]);
  }

  applyUpgrade(upgrade) {
    if (this._state.gold >= upgrade.cost) {
      this._state.gold -= upgrade.cost;
      this._state.upgradeLevel[upgrade.type] += 1;
      console.log(`Applied upgrade: ${upgrade.name}`);
      this.stateChanged();
    } else {
      console.log('Not enough gold for upgrade!');
    }
  }

  stateChanged() {
    console.log('Player state updated:', this._state);
  }
}

class LootTable {
  constructor(table = []) {
    this._table = table; // Use _table consistently
  }

  addItem(item, weight = 1, quantity = Number.POSITIVE_INFINITY) {
    // Ensure weight is a valid number and quantity is non-negative
    weight = isNaN(Number(weight)) || weight <= 0 ? 1 : Number(weight);
    quantity = isNaN(Number(quantity))
      ? Number.POSITIVE_INFINITY
      : Math.max(0, Number(quantity));

    // Add item to the table with weight and quantity
    this._table.push({ item, weight, quantity });
  }

  chooseItem() {
    if (this._table.length === 0) return null; // Return null if the table is empty

    // Calculate total weight based on the remaining items' quantities
    let totalWeight = this._table.reduce(
      (sum, entry) => sum + (entry.quantity > 0 ? entry.weight : 0),
      0
    );
    if (totalWeight === 0) return null; // If total weight is zero, no more items can be chosen

    let randomNumber = Math.random() * totalWeight;
    let accumulatedWeight = 0;

    for (const entry of this._table) {
      if (entry.quantity <= 0) continue; // Skip items with no quantity left

      accumulatedWeight += entry.weight;
      if (randomNumber < accumulatedWeight) {
        entry.quantity--; // Decrement the quantity for the chosen item
        return entry.item;
      }
    }

    return null; // Return null if no item is chosen
  }

  clearItems() {
    this._table = []; // Clear the loot table
  }
}

const packs = {
  'Normal D6 Pack': new LootTable(),
  'Uncommon D6 Pack': new LootTable(),
};

packs['Normal D6 Pack'].addItem('Normal_D6', 800);
packs['Normal D6 Pack'].addItem('Uncommon_D6', 300);
packs['Normal D6 Pack'].addItem('Rare_D6', 100);
packs['Normal D6 Pack'].addItem('Epic_D6', 25);
packs['Normal D6 Pack'].addItem('Legendary_D6', 5);

const dices = {
  Normal_D6: { id: 'Normal', sides: 6, multiplier: 1 },
  Uncommon_D6: { id: 'Uncommon', sides: 6, multiplier: 1.5 },
  Rare_D6: { id: 'Rare', sides: 6, multiplier: 2 },
  Epic_D6: { id: 'Epic', sides: 6, multiplier: 2.5 },
  Legendary_D6: { id: 'Legendary', sides: 6, multiplier: 3 },
};

const upgrades = {
  normalUpgrade: {
    name: 'Normal Dice Upgrade',
    type: 'Normal',
    multiplierIncrease: 1,
    cost: 50,
  },
  goldenUpgrade: {
    name: 'Golden Dice Upgrade',
    type: 'Golden',
    multiplierIncrease: 2,
    cost: 100,
  },
};

const GameContext = createContext();

export const useGame = () => {
  return useContext(GameContext);
};

export const GameProvider = ({ children }) => {
  const [player] = useState(new Player());
  const [lootTables] = useState(packs);
  const [upgradesList] = useState(upgrades);

  return (
    <GameContext.Provider
      value={{
        player,
        lootTables,
        upgradesList,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
