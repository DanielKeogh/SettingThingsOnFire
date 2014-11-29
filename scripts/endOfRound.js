function nextRoundProtocol()
{
  increaseDifficulty();
  init();
}

function losersProtocol()
{
  welcome();
}

// Determine what to do when a round has ended
function endOfRound()
{
  createjs.Ticker.setPaused(true);
  stage.clear();
  createjs.Ticker.off("tick", tick);
  if(housesAlive > 0 && burningTrees == 0 && player.funds >= 0)
  {
    // The player won, go to next round
    nextRoundProtocol();
  } else
  {
    losersProtocol();
  }
}
