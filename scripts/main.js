//Map Constants & Vars
var fireManSize = 5;
var fps = 60;
var stage;
var canvas;
var flamables = [];
var buttons = [];
var firemen = [];
var selectedfireman = [];
var clickMode = "noEvent";
var particleImage;
var burningTrees;
var housesAlive;
var currentContext;
var fireManSpeed = 0.06;
var fireManQuench = 0.03;

function loadAssets() {
	particleImage = new Image();
	particleImage.src = "images/particle_base.png";
}

function resetGameState() {
  flamables = [];
  buttons = [];
  firemen = [];
  burningTrees = 0;
  housesAlive = 0;
}

function init() {
  resetGameState();
  clickMode = "noEvent";

	mapInit = generateMap(difficulty.houseNumber, difficulty.treeNumber, stage.canvas.width, stage.canvas.height);
  housesAlive = difficulty.houseNumber;
  burningTrees = difficulty.startingFireCount;

	// Add background
	stage.addChild(gameBackground);

	// Setup controls
  for(var i = 0; i < actionButtons.length; ++ i)
  {
    stage.addChild(actionButtons[i]);
  }
	
	fundText.text = "Funds: " + player.funds;
	stage.addChild(fundText);
  
  roundText.text = "Round: " + player.roundNumber;
	stage.addChild(roundText);

  var windLabel = new createjs.Text("Wind:", "bold 15px Arial", "cyan");
  var arrow = createArrow(wind.direction, wind.speed);
  arrow.x = stage.canvas.width - 30;
  arrow.y = 15;
  windLabel.x = stage.canvas.width - 90;
  windLabel.y = 5;
  stage.addChild(windLabel);
  stage.addChild(arrow);

  // Set the texts on the action buttons:
  for(var i = 0; i < actionButtons.length; ++ i)
  {
    var newText = "";
    switch(actionButtons[i].name)
    {
      case "dropFireMan":
        newText = "Firemen: " + costs.fireManCost;
        break;
      case "dropWater":
        newText = "Water bomb: " + costs.waterBombCost;
        break;
      case "removeTree":
        newText = "Chop tree: " + costs.cutTreeCost + " + " + costs.cutTreeCostFactor + "* size";
        break; 
    }
    actionButtons[i].contentText.text = newText;
  }

	// Add objects
	for (i = 0; i < mapInit.length; i++) {
		if (mapInit[i].type == "tree") {
			addTree(mapInit[i]);
		}

		if (mapInit[i].type == "house") {
			addHouse(mapInit[i]);
		}
	}

  changeVisibilityOfButtonOutlines();
	performCountdown(player.preparationTime, getStartTheFire(difficulty.startingFireCount));

  currentContext = "game";
}

// Action Logic

function makeFlamableHandler(flamable) {
	return function (evt) {
		if (clickMode == "removeTree" && flamable.burning < 99) {
			removeTree(flamable);
		} else if (clickMode == "addFire") {
			flamable.burning += 100;
		}
	}
}

function removeTree(flamable) {
	if (decreaseFunds((flamable.radius * costs.cutTreeCostFactor) + costs.cutTreeCost)) {
    if (flamable.burning > 0) {
      --burningTrees;
    }
		removeFlamable(flamable, true);
	}
}

function removeFlamable(flamable, removeFromStage) {
	flamable.removeAllEventListeners();
	var index = flamables.indexOf(flamable);
	if (index > -1) {
		flamables.splice(index, 1);
	}
  
  if (removeFromStage) {
    stage.removeChild(flamable);
  }
}

function addFlamable(base) {
	var container = new createjs.Container();
	container.x = base.x;
	container.y = base.y;

	container.burning = 0;
	container.startingHealth = 500;
	container.health = 500;
	container.emitter = null;
	container.died = false;

	return container;
}

function addHouse(housebase) {
	var house = addFlamable(housebase);

	house.type = "house";
	house.width = housebase.width;
	house.height = housebase.height;

	var rectangle = new createjs.Shape();
	rectangle.graphics.beginFill("blue").drawRect(0, 0, housebase.width, housebase.height);

	//house.addEventListener("click", function (evt) {
	//	if (clickMode == "removeTree") {
	//		removeFlamable(house, true);
	//	}
	//});

	house.addChild(rectangle);

	stage.addChild(house);
	flamables[flamables.length] = house;
}

function addTree(treebase) {
	var tree = addFlamable(treebase);

	tree.radius = treebase.radius;
	tree.type = "tree";

	var circle = new createjs.Shape();
	circle.graphics.beginFill("#335500").drawCircle(0, 0, tree.radius);
	tree.addChild(circle);

	tree.addEventListener("click", makeFlamableHandler(tree));

	stage.addChild(tree);
	flamables[flamables.length] = tree;
}

function handleDirectFiremen(x, y) {
  for(var i = 0; i < selectedfiremen.length; i++) {
    console.log(selectedfiremen);
    selectedfiremen[i].destx = x;
    selectedfiremen[i].desty = y;
  }
}

function handleStageClick(evt) {
	if (evt.stageY < 30) {
		return;
	}
	var x = evt.stageX;
	var y = evt.stageY;

	switch (clickMode) {
	case "dropFireMan":
		handleDropFireMan(x, y);
		break;
	case "addTree":
		var randTreeRadius = Math.round(Math.random() * 10 + 2);
		addTree({
			x : x,
			y : y,
			radius : randTreeRadius
		});
		break;
	case "addHouse":
		var randomHouseWidth = Math.round(Math.random() * 4 + 3) * 5;
		var randomHouseHeight = Math.round(Math.random() * 3 + 3) * 5;
		addHouse({
			x : x,
			y : y,
			width : randomHouseWidth,
			height : randomHouseHeight
		});
		break;
	case "getMap":
		var mapLog = "var map = [";
		for (i = 0; i < flamables.length; i++) {
			var flamable = flamables[i];
			if (flamable.type == "tree") {
				mapLog = mapLog.concat("{type: \"tree\", x: " + flamable.x + ", y: " + flamable.y + " , radius: " + flamable.radius + ", health:100, burning: 0},");
			} else if (flamable.type == "house") {
				mapLog = mapLog.concat("{type: \"house\", x: " + flamable.x + ", y: " + flamable.y + ", width: " + flamable.width + " , height: " + flamable.height + " , health:100, burning: 0},");
			}
		}

		mapLog = mapLog.concat("];");
		console.log(mapLog);
		break;
	case "dropWater":
		handleDropWaterClick(x, y, flamables);
		break;
  case "directFiremen":
      handleDirectFiremen(x, y);
    break;
  }
}

// Game Logic

function getStartTheFire(fires) {
	return function () {
		var firelen = fires;
		for (var i = 0; i < firelen; i++) {
			if (flamables[i].type == "tree") {
				flamables[i].burning += 100;
        flamables[i].addChild(cachedEmitter);
        flamables[i].emitter = cachedEmitter;
			} else {
				firelen++;
			}
		}
	}
}

// Rendering

function updateGraphics(flamable) {
  if (flamable.type == "tree") {
    var circle = flamable.getChildAt(0);
    var treeSize = flamable.radius - (1 - (flamable.health / flamable.startingHealth)) * flamable.radius;
    circle.graphics.clear();

    var treeColour = "";
    if (flamable.burning > 99) {
      treeColour = "red";
    } else {
      treeColour = rgb(Math.round(256 * flamable.burning / 100), 220, 0);
    }

    circle.graphics.beginFill(treeColour).drawCircle(0, 0, treeSize);
  } else if (flamable.type == "house") {
    var rectangle = flamable.getChildAt(0);
    rectangle.graphics.clear();

    var houseColour = "blue";
    if (flamable.burning > 99) {
      houseColour = "brown";
    }
    if (flamable.health <= 0) {
      houseColour = "black";
    }

    rectangle.graphics.beginFill(houseColour).drawRect(0, 0, flamable.width, flamable.height);
  }
}

function makeParticleEmitter(x, y) {
	emitter = new createjs.ParticleEmitter(particleImage);
	emitter.position = new createjs.Point(x, y);
	emitter.emitterType = createjs.ParticleEmitterType.Emit;
	emitter.emissionRate = 45;
	emitter.maxParticles = 60;
	emitter.life = 100;
	emitter.lifeVar = 2000;
	emitter.speed = wind.speed;
	emitter.speedVar = 0;
	emitter.positionVarX = 2;
	emitter.positionVarY = 0;
	emitter.accelerationX = 0;
	emitter.accelerationY = 0;
	emitter.radialAcceleration = 0;
	emitter.radialAccelerationVar = 0;
	emitter.tangentalAcceleration = 0;
	emitter.tangentalAccelerationVar = 0;
	emitter.angle = wind.direction;
	emitter.angleVar = 70;
	emitter.startSpin = 0;
	emitter.startSpinVar = 0;
	emitter.endSpin = null;
	emitter.endSpinVar = null;
	emitter.startColor = [255, 200, 0];
	emitter.startColorVar = [0, 0, 0];
	emitter.startOpacity = 1;
	emitter.endColor = [255, 0, 0];
	emitter.endColorVar = null;
	emitter.endOpacity = 0;
	emitter.startSize = 10;
	emitter.startSizeVar = 0;
	emitter.endSize = 20;
	emitter.endSizeVar = null;
	return emitter;
}

function rgb(r, g, b) {
	r = Math.floor(r);
	g = Math.floor(g);
	b = Math.floor(b);
	return ["rgb(", r, ",", g, ",", b, ")"].join("");
}

// Game Loop

var cachedEmitter;

function updateBurning(flamable) {
	if (flamable.burning > 99) {
		if (cachedEmitter == null) {
			cachedEmitter = makeParticleEmitter(0, 0);
		}

		if (flamable.emitter == null) {
			flamable.addChild(cachedEmitter);
			flamable.emitter = cachedEmitter;

      if(flamable.type == "tree")
      {
        ++burningTrees;
      }
		}

		flamable.health -= flamable.burning / 100; // Consider, using log to suppress fire.
	} else
  {
    if(flamable.emitter != null)
    {
      flamable.emitter = null;
      --burningTrees;
    }
  }
}

function considerDying(flamable) {
	if (!flamable.died && flamable.health < 0) {
		if (flamable.type == "house") {
      --housesAlive;
			flamable.died = decreaseFunds(costs.houseCost, true);
      removeFlamable(flamable, false);
		} else {
      --burningTrees;
			removeFlamable(flamable, true);
		}
	}
}

function tick(event) {
  switch(currentContext)
  {
    case "welcome":
      welcomeTick();
      break;
    case "game":
      gameTick(event);
      break;
    default:
      stage.update();
      break;
  }
}

function gameTick(event)
{
  if(housesAlive == 0 || burningTrees == 0)
  {
    endOfRound();
  }

	spreadFire(flamables, wind, event);

  for(var i = 0; i < firemen.length; i++)
  {
    var fireman = firemen[i];
    if(Math.round(fireman.x - fireman.destx) != 0 || Math.round(fireman.y - fireman.desty))
    {
      var targetX = fireman.destx - fireman.x;
      var targetY = fireman.desty - fireman.y;
      var angle = Math.atan2(targetY,targetX);
      var dx = Math.cos(angle) * fireManSpeed;
      var dy = Math.sin(angle) * fireManSpeed;
 
      fireman.x += dx * event.delta;
      fireman.y += dy * event.delta;
    }
  }

  for(var i = 0; i < flamables.length; i++)
  {
    flamables[i].numberOfBurnsThisRound = 1;
  }

  for (var i = 0; i < flamables.length; i++) {
    var flamable = flamables[i];
    
    for(var j = 0; j < firemen.length; j++)
    {
      if(flamable.type == "tree" && getDistance(firemen[j], flamable) < fireManRange + flamable.radius)
      {
        flamable.burning = Math.max(0, flamable.burning - fireManQuench * event.delta);
      }
    }

		if (roll) {
			flamable.x = (flamable.x + (event.delta) / 1000 * 100) % stage.canvas.width;
		}

		updateBurning(flamable);
		updateGraphics(flamable, event);
		considerDying(flamable);
	}

	stage.removeChild(bombArc);
  stage.removeChild(firemanArc);
	if (clickMode == "dropWater")
  {
		handleDropWaterHover();
  } else if (clickMode == "dropFireMan")
  {
    handleFiremanHover();
  }
	fundText.text = "Funds: " + player.funds;

	//Count down
	if (countdown != null) {
		countdown.seconds -= event.delta / 1000;
		countdown.text = Math.round(countdown.seconds) + 1;
		if (countdown.seconds < 0) {
			stage.removeChild(countdown);
			countdown.doAction();
			countdown = null;
		}
	}
	stage.update(event);
}

var roll = false;
function toggleRoll() {
	roll = !roll;
}

var countdown;
function performCountdown(seconds, action) {
	countdown = new createjs.Text(seconds + 1, "bold 70px Arial", "black");
	countdown.y = stage.canvas.height / 2;
	countdown.x = stage.canvas.width / 2;
	countdown.seconds = seconds;
	countdown.doAction = action;
	stage.addChild(countdown);
}
