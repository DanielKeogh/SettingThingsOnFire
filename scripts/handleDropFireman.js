var fireManRange = 35;
var firemanArc;

function handleFiremanHover()
{
  firemanArc = new createjs.Shape();
  firemanArc.graphics.beginStroke("blue").arc(stage.mouseX, stage.mouseY, fireManRange, 0, Math.PI*2);
  stage.addChild(firemanArc);
}

function handleDropFireMan(x, y) {
	if (decreaseFunds(costs.fireManCost)) {
		var container = new createjs.Container();

		var fireman = new createjs.Shape();
		fireman.graphics.beginFill("yellow").drawCircle(0, 0, fireManSize);
		fireman.graphics.beginFill("red").drawCircle(0, 0, fireManSize / 2);
		var arcShape = new createjs.Shape();
		arcShape.graphics.beginStroke("rgba(0, 0, 240, 1)").arc(0, 0, fireManRange, 0, Math.PI * 2);
		arcShape.graphics.beginFill("rgba(0, 0, 240, 0.3)").drawCircle(0, 0, fireManRange);
		container.addChild(arcShape);
		container.addChild(fireman);
		container.x = x;
		container.y = y;

		firemen[firemen.length] = container;
		stage.addChild(container);
	}
}
