// genrate map

function collidesWithExistingHouse(base, flamables) {
    for(var i = 0; i < flamables; i++) {
	var flamable = flamables[i];
	if(flamable.type == "house")
	{
	    if(base.x + base.width > flamable.x && base.x < flamable.x + flamable.width)
	    {
		if(base.y + base.height > flamable.y && base.y < flamable.y + flamable.width)
		{
		    return true;
		}
	    }
	}
    }

    return false;
}

function treeCollidesWithExistingHouse(base, flamables) {
    for(var i = 0; i < flamables; i++) {
	var flamable = flamables[i];
	if(flamable.type == "house")
	{
	    if(base.x + base.radius > flamable.x && base.x < flamable.x + flamable.width)
	    {
		if(base.y + base.radius > flamable.y && base.y < flamable.y + flamable.width)
		{
		    return true;
		}
	    }
	}
    }

    return false;
}

function generateMap(housecount, treecount, stage) {
    // Make the houses
    for(var i = 0; i < housecount; i++) {
	var randwidth = Math.round(Math.random() * 4 + 3) * 5;
	var randheight = Math.round(Math.random() * 3 + 3) * 5;
	var randx = Math.random() * (stage.canvas.width - randwidth);
	var randy = Math.random() * (stage.canvas.height - randheight);
	var houseBase = {x: randx, randy: y, width: randwidth, height: randheight};

	if(!houseCollidesWithExistingHouse(houseBase, flamables)) {
	    addHouse(houseBase);
	}
	else
	{
	    i--;
	}
    }

    for(var i = 0; i < treecount; i++)
    {
	var randradius = Math.round(Math.random() * 10 + 2);
	var randx = Math.random() * (stage.canvas.width - randradius * 2) + randradius;
	var randy = Math.random() * (stage.canvas.height - randradius * 2) + randradius;
	
	var treebase = {x: randx, y: randy, radius: randradius};
	if(!treeCollidesWithExistingHouse(treebase))
	{
	    addTree(treebase);
	}
	else
	{
	    i--;
	}
    }
}
