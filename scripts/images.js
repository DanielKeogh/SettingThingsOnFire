function attachImage(tree, image, radius)
{
  tree.removeChildAt(1);
  var bitmap = new createjs.Bitmap(image);
  var scale = radius * 2 / 477;
  bitmap.scaleX = bitmap.scaleY = scale;
  bitmap.x = -radius;
  bitmap.y = -radius;
  tree.addChild(bitmap); 
}
