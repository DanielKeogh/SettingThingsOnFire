
var funds = 10000;
var fireManCost = 600;
var cutTreeCost = 400;

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

