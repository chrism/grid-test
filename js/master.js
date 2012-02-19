$(document).ready(function() {
	
	redrawBoxes();
	
	$(window).resize(function() {
	  redrawBoxes();
	});

	$("body").keydown(function(event) {
	  if ( event.which == 38 ) {
		 $('#boxes').append('<li></li>');
		 redrawBoxes();
	   }
	   
 	  if ( event.which == 40 ) {
 		 $('#boxes li').last().remove();
		 redrawBoxes();
 	   }  
	  
	  console.log("Charcode for keydown() = : " + event.which);
	});
	

});

function redrawBoxes() {
	
	var screenWidth = $(window).width();
	var screenHeight = $(window).height();
	
	var tileCount = $("#boxes > li").size()
	var dimension = getTileSize(screenWidth, screenHeight, tileCount);
	
	var itemsInRow;
	$('#boxes li').each(function(index){
		
		rows = (index+1) * dimension / screenWidth;
		
		if (rows <= 1)
		{
			itemsInRow = index+1;
			x = index * dimension;
			y = 0;
		} else
		{
			rows = Math.floor((index)/itemsInRow);
			y = rows * dimension;
			x = (index * dimension) - (itemsInRow*rows*dimension);
		}
		console.log("index : " + index);
		console.log("y : " + y);
		console.log("x : " + x);
		console.log("rows : " + rows);
		console.log("items in row : " + itemsInRow);
		console.log("------------------");
		$(this).css("left",x).css("top",y);
		$(this).css("width", dimension).css("height", dimension);
		$(this).html("<p>item " + (index+1) + "</p>");
	});
	
}

function getTileSize (screenWidth, screenHeight, tileCount) {

	console.log('screenWidth : ' + screenWidth);
	//console.log('screenHeight : ' + screenHeight);
	//console.log('tileCount : ' + tileCount);
  
  
	var aspect = screenHeight/screenWidth;
	var xf = Math.sqrt(tileCount/aspect);
	var yf = xf*aspect;
  
	var x = Math.max(1.0, Math.floor(xf));
	var y = Math.max(1.0, Math.floor(yf));
  
	var xSize = Math.floor(screenWidth/x);
	var ySize = Math.floor(screenHeight/y);
  
	var tileSize = Math.min(xSize, ySize);
  
	// test values  
	x = Math.floor(screenWidth/tileSize);
	y = Math.floor(screenHeight/tileSize);
  
	if (x*y < tileCount) // if too high
	{
		if (((x+1)*y < tileCount) && (x*(y+1) < tileCount))
		{
			// upper bound correct, compute tileSize that results in (x+1)*(y+1) tiles
			xSize = Math.floor(screenWidth/(x+1));
			ySize = Math.floor(screenHeight/(y+1));
			tileSize = Math.min(xSize, ySize);
		}
		else
		{
			// solve final x & y dimensions and the compute tileSize that results in those dimensions
			var testX = Math.ceil(tileCount/y);
			var testY = Math.ceil(tileCount/x);
			xSize = Math.min(Math.floor(screenWidth/testX), Math.floor(screenHeight/y));
			ySize = Math.min(Math.floor(screenWidth/x), Math.floor(screenHeight/testY));
			tileSize = Math.max(xSize, ySize);
		}
	} 
	return tileSize;
}
