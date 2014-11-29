var waterBombRadius = 80;
var bombArc;

function handleDropWaterClick(x, y, flamables)
{
  for(var i = 0; i < flamables.length; ++ i)
  {
    if(getDistance({x: x, y: y}, flamables[i]) < waterBombRadius)
    {
      flamables[i].burning = Math.max(flamables[i].burning - 150, 0);
    }
  }
}

function handleDropWaterHover()
{
  bombArc = new createjs.Shape();
  bombArc.graphics.beginStroke("blue").arc(stage.mouseX, stage.mouseY, waterBombRadius, 0, Math.PI*2);
  stage.addChild(bombArc);
}
