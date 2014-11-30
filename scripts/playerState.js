var initialFunds = 10000;
var difficulty = { houseNumber: 2, treeNumber: 200, startingFireCount: 2, fireManRange: 35, treeSize: 6 };
var costs = { fireManCost: 600, cutTreeCost: 50, cutTreeCostFactor: 2, waterBombCost: 1000, houseCost: 1000 };
var player = { debug: false, funds: initialFunds, roundNumber: 1, preparationTime: 3 };
var wind = {
	type : "wind",
	speed : 10,
	direction : 270
};

function increaseDifficulty() {
  player.roundNumber++;
  difficulty.houseNumber++;
  difficulty.treeNumber += 75;
  difficulty.startingFireCount = (player.roundNumber * 2) - 1;
  if(difficulty.treeSize > 0)
  {
    difficulty.treeSize -= 2;
  }
   costs.fireManCost += 50;
  costs.cutTreeCost += 20;
  costs.waterBombCost += 150;
  
}
