// Imports



// Map Setup.

var wind = {type: "wind", speed: 200, direction: 270};

var fireManSize = 5;
var fireManRange = 40;

var mapInit = [
    //{type: "tree", x: 40, y: 40, radius: 15, health: 100, burning: 0},
    //{type: "house", x: 70, y: 70, width: 100, height: 100, health:100, burning: 0},
    //{type: "tony"}
];
 
var stage;

var flamables = [];

var firemen = [];

var clickMode = "noEvent";

var particleImage;

var fundText;

function loadAssets() {
    particleImage = new Image();
    particleImage.src = "images/particle_base.png";
}

function init() {
    var canvas = document.getElementById("fireCanvas");
    
    mapInit = generateMap(4, 300, canvas.width, canvas.height);
    
    // Add background   
    stage.addChild(createBackground());
    
    // Setup controls

    addModeButton("dropFireMan", "Firemen", 0, 0);
    addModeButton("dropWater", "Water Bomb", 110, 0);
    addModeButton("removeTree", "Chop Tree", 220, 0);
    addModeButton("addTree", "Add Tree", 330, 0);
    addModeButton("addHouse", "Add House", 440, 0);
    addModeButton("addFire", "Burn Things", 550, 0);
    addModeButton("getMap", "Get Map", 660, 0);
    //addModeButton("tonyAbbot", "Prime Minister", 600, 0);

    fundText = new createjs.Text("Funds: " + funds, "bold 15px Arial", "yellow");
    fundText.x = 5;
    fundText.y = stage.canvas.height - 15;

    stage.addChild(fundText);
    
    // Add objects
    for(i = 0; i < mapInit.length; i++) {
      if(mapInit[i].type == "tree")
      {
          addTree(mapInit[i]);
      }

      if(mapInit[i].type == "house")
      {
          addHouse(mapInit[i]);
      }
    }

    stage.on("click", handleStageClick);
    stage.update();

    createjs.Ticker.on("tick", tick);
    createjs.Ticker.setFPS(60);
}

function createBackground() {
  var background = new createjs.Shape();
    background.x = 0;
    background.y = 0;
    background.graphics.beginFill("#663300").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
  return background;
}

// Action Logic

function makeFlamableHandler(flamable) {
    return function(evt){
  if(clickMode == "removeTree") {
     removeTree(flamable);
  } else if (clickMode == "addFire") {
      flamable.burning += 100;
  }
    }
}

function removeTree(flamable) {
  if (decreaseFunds(cutTreeCost)) {
     removeFlamable(flamable);
  }
}

function removeFlamable(flamable){
    flamable.removeAllEventListeners();
    var index = flamables.indexOf(flamable);
    if(index > -1) {
  flamables.splice(index, 1);
    }
    stage.removeChild(flamable);
}

function addFlamable(base){
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
    
    house.addEventListener("click", function(evt) {
  if(clickMode == "removeTree") {
      removeFlamable(house);
  }
    });
  
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

function addModeButton(modeName, name, x, y) {
    var button = new createjs.Container();
    button.x = x;
    button.y = y;

    var buttonShape = new createjs.Shape();
    buttonShape.graphics.beginFill("pink").drawRect(0, 0, 100, 30);

    button.addEventListener("click", function(evt) {
  clickMode = modeName;
    });

    var text = new createjs.Text(name, "bold 15px Arial", "red");
    text.x = 5;
    text.y = 5;
    
    button.addChild(buttonShape);
    button.addChild(text);
    stage.addChild(button);
}

function handleDropFireMan(x, y) {
	if (decreaseFunds(fireManCost)) {
		var container = new createjs.Container();
    
		var fireman = new createjs.Shape();
		fireman.graphics.beginFill("yellow").drawCircle(0, 0, fireManSize);
		fireman.graphics.beginFill("red").drawCircle(0, 0, fireManSize/2);
    var arcShape = new createjs.Shape();
		arcShape.graphics.beginStroke("rgba(0, 0, 240, 1)").arc(0, 0, fireManRange, 0, Math.PI*2);
    arcShape.graphics.beginFill("rgba(0, 0, 240, 0.3)").drawCircle(0, 0, fireManRange);
		container.addChild(arcShape);
    container.addChild(fireman);
		container.x = x;
		container.y = y;
		
		
		firemen[firemen.length] = container;
		stage.addChild(container);
	}
}

function handleStageClick(evt) {
  if(evt.stageY < 30) {
    return;
  }
  var x = evt.stageX;
  var y = evt.stageY;

  switch(clickMode){
    case "dropFireMan":
      handleDropFireMan(x, y);  
      break;
    case "addTree":
      var randTreeRadius = Math.round(Math.random() * 10 + 2);
      addTree({x: x, y: y, radius: randTreeRadius});
      break;
    case "addHouse":
      var randomHouseWidth = Math.round(Math.random() * 4 + 3) * 5;
      var randomHouseHeight = Math.round(Math.random() * 3 + 3) * 5;
      addHouse({x: x, y: y, width: randomHouseWidth, height: randomHouseHeight});
      break;
    case "getMap":
      var mapLog = "var map = [";
      for(i = 0; i < flamables.length; i++)
      {
        var flamable = flamables[i];
        if(flamable.type == "tree")
        {
          mapLog = mapLog.concat("{type: \"tree\", x: " + flamable.x + ", y: " + flamable.y + " , radius: " + flamable.radius +  ", health:100, burning: 0},");
        }
        else if (flamable.type == "house")
        {
          mapLog = mapLog.concat("{type: \"house\", x: " + flamable.x + ", y: " + flamable.y + ", width: " + flamable.width + " , height: " + flamable.height + " , health:100, burning: 0},");
        }
      }

      mapLog = mapLog.concat("];");
      console.log(mapLog);
      break;
  }
}

// Game Logic



// Rendering

function updateGraphics(flamable) {
    if(flamable.type == "tree") {
    var circle = flamable.getChildAt(0);
    var treeSize = flamable.radius - (1 - (flamable.health / flamable.startingHealth)) * flamable.radius;
    circle.graphics.clear();
    
    var treeColour = "green";
    if(flamable.burning > 99) {
      treeColour = "red";
    }

    circle.graphics.beginFill(treeColour).drawCircle(0, 0, treeSize);
    }
  else if (flamable.type == "house") {
    var rectangle = flamable.getChildAt(0);
    rectangle.graphics.clear();
  
    var houseColour = "blue";
    if(flamable.burning > 99) {
      houseColour = "brown";
    }
    if(flamable.health <= 0) {
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

function rgb(r, g, b){
  r = Math.floor(r);
  g = Math.floor(g);
  b = Math.floor(b);
  return ["rgb(",r,",",g,",",b,")"].join("");
}

// Game Loop

var cachedEmitter;

function updateBurning(flamable) {
    if (flamable.burning > 99) {
  if(cachedEmitter == null)
  {
      cachedEmitter = makeParticleEmitter(0, 0);
  }
  
  if(flamable.emitter == null)
  {
      flamable.addChild(cachedEmitter);
      flamable.emitter = cachedEmitter;
  }
  
  flamable.health -= flamable.burning / 100; // Consider, using log to suppress fire.
    }
}

function considerDying(flamable) {
    if(!flamable.died && flamable.health < 0) {			
		if(flamable.type == "house"){
			flamable.died = decreaseFunds(1000, true);
		}
		else{			
			removeFlamable(flamable);
		}
	}
}

function tick(event) {
    spreadFire(flamables, wind, event);
    
    for(var i = 0; i < flamables.length; i++) {
  var flamable = flamables[i];

  if(roll) {
      flamable.x = (flamable.x + (event.delta)/1000*100) % stage.canvas.width;
  }
  
  updateBurning(flamable);
  updateGraphics(flamable, event);
  considerDying(flamable, event);
    }    

    fundText.text = "Funds: " + funds;
    stage.update(event);
}

var roll = false;
function toggleRoll() {
    roll = !roll;
}
