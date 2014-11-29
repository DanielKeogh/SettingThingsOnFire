// Imports



// Map Setup.

var wind = {type: "wind", speed: 3, direction: 270};

var tree = {type: "tree", x: 40, y: 40, radius: 15, health: 100, burning: 0};

var house = {type: "house", x: 70, y: 70, width: 100, height: 100, health:100, burning: 0};

var fireManSize = 5;

var mapInit = [tree, house];

var stage;

var flamables = [];

var firemen = [];

var clickMode = "dropFireMan";

// Game Logic



// Rendering

function handleStageClick(evt) {
    if(clickMode == "dropFireMan")
    {
	var x = evt.stageX;
	var y = evt.stageY;
	var fireman = new createjs.Shape();
	fireman.graphics.beginFill("yellow").drawCircle(0, 0, fireManSize);
	fireman.x = x;
	fireman.y = y;

	firemen[firemen.length] = fireman;
	stage.addChild(fireman);
    }
}

// Game Loop

function init() {
    var canvas = document.getElementById("fireCanvas");
    stage = new createjs.Stage(canvas);
    
    // Add background
    var background = new createjs.Shape();
    background.x = 0;
    background.y = 0;
    background.graphics.beginFill("black").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
    stage.addChild(background);
    
    // Add objects
    for(i = 0; i < mapInit.length; i++){
	if(mapInit[i].type == "tree")
	{
	    var circle = new createjs.Shape();
	    //circle.type = mapInit[i].type;
	    circle.graphics.beginFill("green").drawCircle(0, 0, mapInit[i].radius);
	    circle.x = mapInit[i].x;
	    circle.y = mapInit[i].y;

	    stage.addChild(circle);
	    flamables[flamables.length] = circle;
	}

	if(mapInit[i].type == "house")
	{
	    var house = new createjs.Shape();
	    //house.type = mapInit[i].type;
	    house.graphics.beginFill("blue").drawRect(0, 0, mapInit[i].width, mapInit[i].height);
	    house.x = mapInit[i].x;
	    house.y = mapInit[i].y;
	    
	    stage.addChild(house);
	    flamables[flamables.length] = house;
	}
    }

    stage.on("click", handleStageClick);
    stage.update();

    createjs.Ticker.on("tick", tick);
    createjs.Ticker.setFPS(60);
}

function tick(event) {
//    spreadFire(mapInit, wind, event);
    
    for(i = 0; i < flamables.length; i++) {
	flamables[i].x = (flamables[i].x + (event.delta)/1000*100) % stage.canvas.width;
    }


    stage.update(event);
}

