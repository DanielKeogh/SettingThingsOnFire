function welcomeTick()
{
  stage.update();
}
function welcome()
{
  stage = new createjs.Stage("fireCanvas");
  var rectangle = new createjs.Shape();
  rectangle.graphics.beginFill("black").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
  stage.addChild(rectangle);

  var title = new createjs.Text("Fire fire fire!", "bold 50px Arial", "yellow");
  var titleBounds = title.getBounds();
  title.x = 0;
  title.y = 0;

  var playButton = new createjs.Container();
  var buttonBackground = new createjs.Shape();
  buttonBackground.graphics.beginFill("pink").drawRect(0, 0, 180, 60);

  playButton.on("click", function(evt){
    createjs.Ticker.off("tick", welcomeTick);
    stage.clear();
    init();
  });

  var playText = new createjs.Text("Start game", "bold 30px Arial", "black");
  playText.x = 10;
  playText.y = 15;

  playButton.addChild(buttonBackground);
  playButton.addChild(playText);
  var buttonBounds = playButton.getBounds();

  playButton.addChild(makeParticleEmitter(0, 0));
  playButton.addChild(makeParticleEmitter(180, 0));
  playButton.addChild(makeParticleEmitter(0, 60));
  playButton.addChild(makeParticleEmitter(180, 60));
  playButton.x = titleBounds.width / 2 - buttonBounds.width / 2;
  playButton.y = titleBounds.height + 30;

  var titleContainer = new createjs.Container();
  titleContainer.height = titleBounds.height + 30 + buttonBounds.height;
  titleContainer.width = titleBounds.width;

  titleContainer.addChild(title);
  titleContainer.addChild(playButton);

  titleContainer.x = stage.canvas.width / 2 - titleContainer.width / 2;
  titleContainer.y = stage.canvas.height / 2 - titleContainer.width / 2;

  stage.addChild(titleContainer);

  stage.update();
  createjs.Ticker.setFPS(30);
  createjs.Ticker.on("tick", welcomeTick);
}
