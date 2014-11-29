var difficulty = { houseNumber: 2, treeNumber: 200, startingFireCount: 2 };
var costs = { fireManCost: 600, cutTreeCost: 50, cutTreeCostFactor: 2, waterBombCost: 1000, houseCost: 1000 };
var player = { debug: false, funds: 10000, roundNumber: 1, preparationTime: 3 };
var wind = {
	type : "wind",
	speed : 0,
	direction : 0
};

function increaseDifficulty() {
  player.roundNumber++;
  difficulty.houseNumber++;
  difficulty.treeNumber += 75;
  difficulty.startingFireCount = (player.roundNumber * 2) - 1;
  costs.fireManCost += 50;
  costs.cutTreeCost += 20;
  costs.waterBombCost += 150;
  
}
