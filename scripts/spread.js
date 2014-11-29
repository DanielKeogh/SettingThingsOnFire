// Difficulty configuration
var surroundingPenalty = 6;
var zone0Burn = 5;
var zone1Burn = 3;
var zone2Burn = 1;
var decayRate = 10;
var burnHalfWidth = 30;

// Test data
var testTree0 = { name: "0", x: 3, y: 3, radius: 1, burning: 100, health: 100, type: "tree" };
var testTree1 = { name: "1", x: 3, y: 8, radius: 2, burning: 0, health: 100, type: "tree" };
var testTree2 = { name: "2", x: 6, y: 5, radius: 1, burning: 0, health: 100, type: "tree" };
var testTree3 = { name: "3", x: 6, y: 1, radius: 1, burning: 0, health: 100, type: "tree" };
var testTree4 = { name: "4", x: 10, y: 5, radius: 3, burning: 0, health: 100, type: "tree" };
var testTrees = [testTree0, testTree1, testTree2, testTree3, testTree4];
var testWind = { angle: 90, speed: 0 };

// Determine if an element is in the surrounding area of a burner
function isInSurrounding(burner, element)
{
  // Determine the distance between the burner and the burnee. If it's too close it'll burn
  var distance = Math.sqrt((element.x - burner.x)^2 + (element.y - burner.y)^2);
  console.log("Distance from " + burner.name + " to " + element.name + ": " + distance + ", radius: " + burner.radius);
  if(distance > burner.radius * 2) return false;
  return true;
}

// Determine what'll be the damage done to the element being burnt
function determineZone(burner, element, wind)
{
  // Split the wind's velocity into three burning zones
  var zone0Limit = wind.speed / 3;
  var zone1Limit = wind.speed * 2 / 3;
  var zone2Limit = wind.speed;

  // Determine the distance between the burner and the burnee.
  var distance = Math.sqrt((element.x - burner.x)^2 + (element.y - burner.y)^2);

  // Calculate the angle the point has w.r.t. the reference
  var pointsAngle = Math.acos((element.x - burner.x) / distance);

  if(pointsAngle - (wind.angle - burnHalfWidth) < wind.angle + burnHalfWidth &&
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
  for(j = 0; j < elements.length; ++ j)
  {
    // No need to burn an element that's already burning
    if(elements[j].burning >= 100) continue;

    var zone = determineZone(burner, elements[j], wind);

    switch(zone)
    {
      case -1:
        break;
      case 0:
        elements[j].burning += zone0Burn * delta;
        break;
      case 1:
        elements[j].burning += zone1Burn * delta;
        break;
      case 2:
        elements[j].burning += zone2Burn * delta;
        break;
      default:
        break;
    }

    if(isInSurrounding(burner, elements[i]))
    {
      elements[i].burning += surroundingPenalty * delta;
    }
  }
}

// Performs the spreading of the fire when a whole bunch of trees are burning
function spreadFire(flamables, wind, applicationEvent)
{
  for(i = 0; i < flamables.length; ++ i)
  {
    console.log("tree[" + i + "]: burning: " + flamables[i].burning + ", health: " + flamables[i].health);
    // Determine the set trees that are burning
    if(flamables[i].type == "tree" &&
       flamables[i].burning >= 100 &&
       flamables[i].health > 0)
    {
      // Burn the surroundings and apply the decay
      console.log("tree[" + i + "] is burning");
      burnSurrounding(flamables[i], flamables, wind, applicationEvent.delta);
    }
  }
}
