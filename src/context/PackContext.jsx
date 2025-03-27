import { createContext, useContext, useState } from 'react';

class Pack {
  constructor(table = [], cost) {
    this._table = table;
    this._cost = cost;
  }

  get cost() {
    return this._cost;
  }

  addItem(item, weight = 1, quantity = Number.POSITIVE_INFINITY) {
    weight = isNaN(Number(weight)) || weight <= 0 ? 1 : Number(weight);
    quantity = isNaN(Number(quantity))
      ? Number.POSITIVE_INFINITY
      : Math.max(0, Number(quantity));
    this._table.push({ item, weight, quantity });
  }

  chooseItem() {
    if (this._table.length === 0) return null;

    let totalWeight = this._table.reduce(
      (sum, entry) => sum + (entry.quantity > 0 ? entry.weight : 0),
      0
    );
    if (totalWeight === 0) return null;

    let randomNumber = Math.random() * totalWeight;
    let accumulatedWeight = 0;

    for (const entry of this._table) {
      if (entry.quantity <= 0) continue;

      accumulatedWeight += entry.weight;
      if (randomNumber < accumulatedWeight) {
        entry.quantity--;
        return entry.item;
      }
    }

    return null;
  }

  clearItems() {
    this._table = [];
  }
}

// Initialize packs:
const initialPacks = () => {
  const normalPack = new Pack([], 100);
  normalPack.addItem('Normal_D6', 800);
  normalPack.addItem('Uncommon_D6', 300);
  normalPack.addItem('Rare_D6', 100);
  normalPack.addItem('Epic_D6', 25);
  normalPack.addItem('Legendary_D6', 5);

  const uncommonPack = new Pack([], 1000);
  uncommonPack.addItem('Uncommon_D6', 600);
  uncommonPack.addItem('Rare_D6', 200);
  uncommonPack.addItem('Epic_D6', 50);
  uncommonPack.addItem('Legendary_D6', 10);

  return {
    'Normal D6 Pack': normalPack,
    'Uncommon D6 Pack': uncommonPack,
  };
};

// Create context:
const PackContext = createContext();

export const PackProvider = ({ children }) => {
  const [Packs] = useState(initialPacks());

  return (
    <PackContext.Provider value={{ Packs }}>{children}</PackContext.Provider>
  );
};

export const usePacks = () => useContext(PackContext);
