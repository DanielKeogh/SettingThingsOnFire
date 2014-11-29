var difficulty = { houseNumber: 2, treeNumber: 200, startingFireCount: 2, fireManRange: 35 };
var costs = { fireManCost: 600, cutTreeCost: 50, cutTreeCostFactor: 2, waterBombCost: 1000, houseDestructionCost: 1000 };
var player = { debug: false, funds: 10000, roundNumber: 1, preparationTime: 20 };
var wind = {
	type : "wind",
	speed : 200,
	direction : 270
};

function increaseDifficulty() {
  player.roundNumber++;
  difficulty.houseNumber++;
  difficulty.treeNumber += 50;
  difficulty.startingFireCount = (player.roundNumber * 2) - 1;
  costs.fireManCost += 25;
  costs.cutTreeCost += 10;
  costs.waterBombCost += 100;
  
}