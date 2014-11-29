var difficulty = { houseNumber: 2, treeNumber: 200, fireManCost: 600, cutTreeCost: 400, waterBombCost: 1000 };
var player = { funds: 10000, roundNumber: 0 };

function increaseDifficulty() {
  player.roundNumber++;
  difficulty.houseNumber++;
  difficulty.treeNumber += 50;
  difficulty.fireManCost += 25;
  difficulty.cutTreeCost += 20;
  difficulty.waterBombCost += 100;
}