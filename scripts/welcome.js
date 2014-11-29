function welcomeTick()
{
  stage.update();
}

function welcome()
{
  stage.clear();

  stage.addChild(blackBackground);
  stage.addChild(titleContainer);

  currentContext = "welcome";
}
