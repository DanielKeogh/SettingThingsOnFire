var difficulty = { houseNumber: 2, treeNumber: 200, fireManCost: 600, cutTreeCost: 400, waterBombCost: 1000 };
var player = { funds: 10000 };

function increaseDifficulty() {
  difficulty.houseNumber++;
  difficulty.treeNumber += 50;
  difficulty.fireManCost += 25;
  difficulty.cutTreeCost += 20;
  difficulty.waterBombCost += 100;
}