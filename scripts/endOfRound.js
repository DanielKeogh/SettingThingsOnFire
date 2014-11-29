function nextRoundProtocol()
{
  increaseFunds(housesAlive * costs.houseDestructionCost);
  increaseDifficulty();
  init();
}

function losersProtocol()
{
  welcome();
  stage.removeChild(bombArc);
}

// Determine what to do when a round has ended
function endOfRound()
{
  stage.clear();
  if(housesAlive > 0 && burningTrees == 0 && player.funds >= 0)
  {
    // The player won, go to next round
    nextRoundProtocol();
  } else
  {
    losersProtocol();
  }
}
