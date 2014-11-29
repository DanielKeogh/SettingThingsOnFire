
var funds = 5000;
var fireManCost = 400;
var cutTreeCost = 750;

function decreaseFunds(amountToDecrease, forceNegative) {
	var success = false
	if (funds - amountToDecrease > 0 || forceNegative) {
		funds -= amountToDecrease;
		success = true;
	}
	else {
		success = false;
	}
	return success;
}

function increaseFunds(amountToIncrease) {
	funds += amountToIncrease;
}

