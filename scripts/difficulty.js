var difficulty = { houseNumber: 2, treeNumber: 200, fireManCost: 600, cutTreeCost: 50, cutTreeCostFactor: 2, waterBombCost: 1000 };
var player = { funds: 10000, roundNumber: 0 };

function increaseDifficulty() {
  player.roundNumber++;
  difficulty.houseNumber++;
  difficulty.treeNumber += 50;
  difficulty.fireManCost += 25;
  difficulty.cutTreeCost += 10;
  difficulty.waterBombCost += 100;
}