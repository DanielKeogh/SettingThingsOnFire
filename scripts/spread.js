// Difficulty configuration
var surroundingPenalty = 0.1;
var zone0Burn = 0.015;
var zone1Burn = 0.009;
var zone2Burn = 0.006;
var radiusFactor = 3;
var burnHalfWidth = 15;

function getDistance(point0, point1)
{
  return Math.sqrt(Math.pow(point0.x - point1.x, 2) + Math.pow(point0.y - point1.y, 2));
}

// Determine if an element is in the surrounding area of a burner
function isInSurrounding(burner, element)
{
  // Determine the distance between the burner and the burnee. If it's too close it'll burn
  var distance = getDistance(burner, element);
  return distance < burner.radius * radiusFactor;
}

// Determine what'll be the damage done to the element being burnt
function determineZone(burner, element, wind)
{
  // Split the wind's velocity into three burning zones
  var zone0Limit = wind.speed / 3;
  var zone1Limit = wind.speed * 2 / 3;
  var zone2Limit = wind.speed;

  // Determine the distance between the burner and the burnee.
  var distance = getDistance(burner, element);

  // Calculate the angle the point has w.r.t. the reference
  var pointsAngle = Math.acos((element.x - burner.x) / distance) * 360 / (2 * Math.PI);

  if(pointsAngle - (wind.direction - burnHalfWidth) < wind.direction + burnHalfWidth &&
     distance < zone2Limit)
  {
    // The tree is inside the burning zone
    if(distance < zone0Limit)
    {
      return 0;
    } else if(zone0Limit <= distance && distance < zone1Limit)
    {
      return 1;
    }else
    {
      return 2;
    }
  }
  return -1;
}

// Performs the burning of the trees in the vicinity of a burning tree
function burnSurrounding(burner, elements, wind, delta)
{
  for(var i = 0; i < elements.length; ++ i)
  {
    var element = elements[i];
    if(element == burner) continue;

    var zone = determineZone(burner, elements[i], wind);

    switch(zone)
    {
      case -1:
        break;
      case 0:
        addBurn(element, zone0Burn, delta);
        break;
      case 1:
        addBurn(element, zone1Burn, delta);
        break;
      case 2:
        addBurn(element, zone2Burn, delta);
        break;
      default:
        break;
    }
 
    if(isInSurrounding(burner, element))
    {
	addBurn(element, surroundingPenalty, delta);
    }
  }
}

function addBurn(element, amount, delta)
{
    element.burning += amount * delta / (element.numberOfBurnsThisRound * 3);
    element.numberOfBurnsThisRound++;
}

// Performs the spreading of the fire when a whole bunch of trees are burning
function spreadFire(flamables, wind, applicationEvent)
{
    for(var i = 0; i < flamables.length; ++ i)
    {
	// Determine the set trees that are burning
	if(flamables[i].type == "tree" &&
	   flamables[i].burning >= 100 &&
	   flamables[i].health > 0)
	{
	    // Burn the surroundings and apply the decay
	    burnSurrounding(flamables[i], flamables, wind, applicationEvent.delta);
	}
    }
}
