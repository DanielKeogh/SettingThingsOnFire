
function decreaseFunds(amountToDecrease, forceNegative) {
	var success = false
	if (player.funds - amountToDecrease >= 0 || forceNegative) {
		player.funds -= amountToDecrease;
		success = true;
	}
	else {
		success = false;
	}
	return success;
}

function increaseFunds(amountToIncrease) {
	player.funds += amountToIncrease;
}

