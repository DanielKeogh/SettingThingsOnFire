var tileContainer;
var blackBackground;
var actionButtons = [];
var gameBackground;
var fundText;
var roundText;

function changeVisibilityOfButtonOutlines() {
  for (i = 0; i < actionButtons.length; i++) {
			var button = actionButtons[i];
			var outline = button.getChildAt(1);
      outline.visible = false;
		}
}

function createActionButton(modeName, x, y, xSize) {
	var button = new createjs.Container();
	button.x = x;
	button.y = y;
  button.name = modeName;

	var buttonShape = new createjs.Shape();
	buttonShape.graphics.beginFill("pink").drawRect(0, 0, xSize, 30);
  
  var buttonOutline = new createjs.Shape();
	buttonOutline.graphics.setStrokeStyle(5).beginStroke("red").drawRect(0, 0, xSize, 30);
  buttonOutline.visible = false;

	button.addEventListener("click", function (evt) {
    if (clickMode != modeName) {
      clickMode = modeName;
    }
    else {
      clickMode = "noEvent";
    }
    var originalVisibility = buttonOutline.visible;    
    changeVisibilityOfButtonOutlines();    
    buttonOutline.visible = !originalVisibility;
	});

	var text = new createjs.Text("", "bold 15px Arial", "red");
	text.x = 5;
	text.y = 5;
    
  button.contentText = text;
	button.addChild(buttonShape);
  button.addChild(buttonOutline);
	button.addChild(text);
  actionButtons[actionButtons.length] = button;
}

function initializeCanvas()
{
  stage = new createjs.Stage("fireCanvas");

  /***********************************/
  /******** WELCOME SCREEN ***********/
  /***********************************/
  // Black background
  blackBackground = new createjs.Shape();
  blackBackground.graphics.beginFill("black").drawRect(0, 0, stage.canvas.width, stage.canvas.height);

  // Box containing the tile
  var title = new createjs.Text("Fire fire fire!", "bold 50px Arial", "yellow");
  var titleBounds = title.getBounds();
  title.x = 0;
  title.y = 0;

  var playButton = new createjs.Container();
  var buttonBackground = new createjs.Shape();
  buttonBackground.graphics.beginFill("pink").drawRect(0, 0, 180, 60);

  playButton.on("click", function(evt){
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

  titleContainer = new createjs.Container();
  titleContainer.height = titleBounds.height + 30 + buttonBounds.height;
  titleContainer.width = titleBounds.width;

  titleContainer.addChild(title);
  titleContainer.addChild(playButton);

  titleContainer.x = stage.canvas.width / 2 - titleContainer.width / 2;
  titleContainer.y = stage.canvas.height / 2 - titleContainer.width / 2;

  /***********************************/
  /********IN-GAME UI*****************/
  /***********************************/
  cachedEmitter = makeParticleEmitter(0, 0);

	gameBackground = new createjs.Shape();
	gameBackground.x = 0;
	gameBackground.y = 0;
	gameBackground.graphics.beginFill("#663300").drawRect(0, 0, stage.canvas.width, stage.canvas.height);

	createActionButton("dropFireMan", 0, 7, 200);
	createActionButton("dropWater", 225, 7, 200);
	createActionButton("removeTree", 450, 7, 200);
  
  if (player.debug) {
    var xLoc = stage.canvas.width - 100;
    createActionButton("addTree", "Add Tree", xLoc, 100, 100);
    createActionButton("addHouse", "Add House", xLoc, 140, 100);
    createActionButton("addFire", "Burn Things", xLoc, 180, 100);
    createActionButton("getMap", "Get Map", xLoc, 220, 100);
  }  

  clickMode = "noEvent";
	stage.on("click", handleStageClick);

	fundText = new createjs.Text("", "bold 15px Arial", "yellow");
	fundText.x = 5;
	fundText.y = stage.canvas.height - 15;

  roundText = new createjs.Text("Round: " + player.roundNumber, "bold 15px Arial", "yellow");
	roundText.x = fundText.x + 110;
	roundText.y = stage.canvas.height - 15;

  /***********************************/
  /***********TICKER******************/
  /***********************************/
  createjs.Ticker.setFPS(fps);
  createjs.Ticker.on("tick", tick);

  welcome();
}
