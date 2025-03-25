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
