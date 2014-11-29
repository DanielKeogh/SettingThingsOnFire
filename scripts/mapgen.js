// genrate map

function houseCollidesWithExistingHouse(base, flamables) {
    for(var i = 0; i < flamables.length; i++) {
	var flamable = flamables[i];
	if(base.x + base.width > flamable.x && base.x < flamable.x + flamable.width)
	{
	    if(base.y + base.height > flamable.y && base.y < flamable.y + flamable.height)
	    {
		return true;
	    }
	}
    }

    return false;
}

function treeCollidesWithExisting(base, flamables) {
    for(var i = 0; i < flamables.length; i++) {
	var flamable = flamables[i];
	if(flamable.type == "house")
	{
	    if(base.x + base.radius > flamable.x - 10 && base.x < flamable.x + flamable.width + 10)
	    {
		if(base.y + base.radius > flamable.y - 10 && base.y < flamable.y + flamable.height + 10)
		{
		    return true;
		}
	    }
	}

	var randomOverlapChance = Math.random() * 5;
	if (flamable.type == "tree" && randomOverlapChance > 1)
	{
	    if(Math.abs(base.x - flamable.x) < flamable.radius + base.radius)
	    {
		if(Math.abs(base.y - flamable.y) < flamable.radius + base.radius)
		{
		    return true;
		}
	    }
	}
    }

    return false;
}

function generateMap(housecount, treecount, stagewidth, stageheight) {
    // Make the houses
    var mapInit = [];
    var houses = [];

    for(var i = 0; i < housecount; i++) {
	var randwidth = Math.round(Math.random() * 6 + 8) * 5;
	var randheight = Math.round(Math.random() * 5 + 7) * 5;
	var randx = Math.random() * (stagewidth - randwidth);
	var randy = Math.random() * (stageheight - randheight - 30) + 30;
	var housebase = {type: "house", x: randx, y : randy, width: randwidth, height: randheight};

	if(!houseCollidesWithExistingHouse(housebase, mapInit)) {
	    mapInit[mapInit.length] = housebase;
	}
	else
	{
	    i--;
	}
    }
    
    //For sexyness, insert road here.


    for(var i = 0; i < treecount; i++)
    {
	var randradius = Math.round(Math.random() * 13 + 4);
	var randx = Math.random() * (stage.canvas.width - randradius * 2) + randradius;
	var randy = Math.random() * (stage.canvas.height - randradius * 2 - 30) + 30 + randradius;
	
	var treebase = {type: "tree", x: randx, y: randy, radius: randradius};
	if(!treeCollidesWithExisting(treebase, mapInit))
	{
	    mapInit[mapInit.length] = treebase;
	}
	else
	{
	    i--;
	}
    }

    return mapInit;
}
