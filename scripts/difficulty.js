var difficulty = { houseNumber: 2, treeNumber: 200, startingFireCount: 2 };
var costs = { fireManCost: 600, cutTreeCost: 50, cutTreeCostFactor: 2, waterBombCost: 1000 };
var player = { funds: 10000, roundNumber: 1, preparationTime: 20 };

function increaseDifficulty() {
  player.roundNumber++;
  difficulty.houseNumber++;
  difficulty.treeNumber += 50;
  costs.fireManCost += 25;
  costs.cutTreeCost += 10;
  costs.waterBombCost += 100;
}