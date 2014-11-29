// Imports



// Map Setup.

var wind = {type: "wind", speed: 90, direction: 270};

var fireManSize = 5;

var mapInit = [
    //{type: "tree", x: 40, y: 40, radius: 15, health: 100, burning: 0},
    //{type: "house", x: 70, y: 70, width: 100, height: 100, health:100, burning: 0},
    //{type: "tony"}
];
 
var stage;

var flamables = [];

var firemen = [];

var clickMode = "dropFireMan";

function initMap() {
    var canvas = document.getElementById("fireCanvas");
	
    stage = new createjs.Stage(canvas);
    
    mapInit = map2;

    // Add background
    var background = new createjs.Shape();
    background.x = 0;
    background.y = 0;
    background.graphics.beginFill("yellow").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
    stage.addChild(background);
    
    // Setup controls

    addModeButton("dropFireMan", "Firemen", 0, 0);
    addModeButton("dropWater", "Water Bomb", 110, 0);
    addModeButton("removeTree", "Chop Tree", 220, 0);
    addModeButton("addTree", "Add Tree", 330, 0);
    addModeButton("addHouse", "Add House", 440, 0);
    addModeButton("addFire", "Burn Things", 550, 0);
    addModeButton("getMap", "Get Map", 660, 0);
    //addModeButton("tonyAbbot", "Prime Minister", 600, 0);

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

// Action Logic

function makeFlamableHandler(flamable) {
    return function(evt){
	if(clickMode == "removeTree") {
	    removeFlamable(flamable);
	} else if (clickMode == "addFire") {
	    flamable.burning += 100;
	}
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

function addHouse(housebase) {
    var house = new createjs.Shape();
    house.graphics.beginFill("blue").drawRect(0, 0, housebase.width, housebase.height);

    house.type = "house";
    house.x = housebase.x;
    house.y = housebase.y;

    house.width = housebase.width;
    house.height = housebase.height;

    house.burning = 0;
    house.startingHealth = 500;
    house.health = 500;
    
    house.addEventListener("click", function(evt) {
	if(clickMode == "removeTree") {
	    removeFlamable(house);
	}
    });
   
    stage.addChild(house);
    flamables[flamables.length] = house;
}

function addTree(treebase) {
    var tree = new createjs.Container();
    
    tree.x = treebase.x;
    tree.y = treebase.y;
    
    tree.radius = treebase.radius;
    tree.type = "tree";
    
    tree.burning = 0;
    tree.startingHealth = 500;
    tree.health = 500;

    var circle = new createjs.Shape();
    circle.graphics.beginFill("green").drawCircle(0, 0, tree.radius);
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

function handleStageClick(evt) {
    if(evt.stageY < 30) {
	return;
    }
    var x = evt.stageX;
    var y = evt.stageY;
    
    if(clickMode == "dropFireMan")
    {
	var fireman = new createjs.Shape();
	fireman.graphics.beginFill("yellow").drawCircle(0, 0, fireManSize);
	fireman.x = x;
	fireman.y = y;
	
	firemen[firemen.length] = fireman;
	stage.addChild(fireman);
    }
    else if(clickMode == "addTree")
    {
	var randTreeRadius = Math.round(Math.random() * 10 + 2);
	addTree({x: x, y: y, radius: randTreeRadius});
    }
    else if(clickMode == "addHouse")
    {
	var randomHouseWidth = Math.round(Math.random() * 4 + 3) * 5;
	var randomHouseHeight = Math.round(Math.random() * 3 + 3) * 5;
	addHouse({x: x, y: y, width: randomHouseWidth, height: randomHouseHeight});
    }
    else if(clickMode == "getMap")
    {
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
}


// Game Loop

function updateBurning(flamable) {
    if (flamable.burning > 99) {
	flamable.health -= flamable.burning / 100; // Consider, using log to suppress fire.
    }
}

function considerDying(flamable) {
    if(flamable.health < 0) {
	removeFlamable(flamable);
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
    
    stage.update(event);
}

var roll = false;
function toggleRoll() {
    roll = !roll;
}
