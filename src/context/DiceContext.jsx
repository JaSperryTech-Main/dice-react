const Dices = {
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
