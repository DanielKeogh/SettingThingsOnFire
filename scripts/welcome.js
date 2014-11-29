function init()
{
  var stage = new createjs.Stage("fireCanvas");
  var rectangle = new createjs.Shape();
  rectangle.graphics.beginFill("black").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
  stage.addChild(rectangle);

  var title = new createjs.Text("Fire fire fire!", "bold 50px Arial", "yellow");
  var titleBounds = title.getBounds();
  title.x = 0;
  title.y = 0;

  var chooseMapButton = new createjs.Container();
  var buttonBackground = new createjs.Shape();
  buttonBackground.graphics.beginFill("pink").drawRect(0, 0, 200, 60);

  chooseMapButton.on("click", function(evt){
    console.log("Clicked the button");
  });

  var chooseMapText = new createjs.Text("Choose map", "bold 30px Arial", "black");
  chooseMapText.x = 10;
  chooseMapText.y = 15;

  chooseMapButton.addChild(buttonBackground);
  chooseMapButton.addChild(chooseMapText);
  var buttonBounds = chooseMapButton.getBounds();
  chooseMapButton.x = titleBounds.width / 2 - buttonBounds.width / 2;
  chooseMapButton.y = titleBounds.height + 30;

  var titleContainer = new createjs.Container();
  titleContainer.height = titleBounds.height + 30 + buttonBounds.height;
  titleContainer.width = titleBounds.width;
  titleContainer.addChild(title);
  titleContainer.addChild(chooseMapButton);

  titleContainer.x = stage.canvas.width / 2 - titleContainer.width / 2;
  titleContainer.y = stage.canvas.height / 2 - titleContainer.width / 2;

  stage.addChild(titleContainer);

  stage.update();
}
