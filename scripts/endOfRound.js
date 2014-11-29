function nextRoundProtocol()
{
  increaseDifficulty();
  init();
}

function losersProtocol()
{
  welcome();
  stage.removeChild(bombArc);
  stage.removeChild(firemanArc);
}

// Determine what to do when a round has ended
function endOfRound()
{
  clickMode = "noEvent";
  stage.clear();
  player.funds += housesAlive * costs.houseCost;
  if(housesAlive > 0 && burningTrees == 0 && player.funds >= 0)
  {
    // The player won, go to next round
    nextRoundProtocol();
  } else
  {
    losersProtocol();
  }
}
