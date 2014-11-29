function createArrow(direction, distance)
{
  var container = new createjs.Container();
  var line = new createjs.Shape();
  var circle = new createjs.Shape();

  var radians = direction / 360 * 2 * Math.PI;
  var x = Math.cos(radians) * distance / 5;
  var y = Math.sin(radians) * distance / 5;

  line.graphics.setStrokeStyle(2, "butt").beginStroke("#3ff");
  line.graphics.moveTo(0, 0);
  line.graphics.lineTo(x, y);

  circle.graphics.setStrokeStyle(2, "butt").beginStroke("#3ff");
  circle.graphics.drawCircle(0, 0, distance / 5  );

  container.addChild(line);
  container.addChild(circle);

  return container;
}
