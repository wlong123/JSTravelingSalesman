$(document).ready( function() {
	
	var xpoints = [];
	var ypoints = [];
	
	var canvas = $("#canvas").get(0);
	var ctx = canvas.getContext("2d");
	
	var canvas2 = $("#canvas2").get(0);
	var ctx2 = canvas2.getContext("2d");
	
	//adds points to list
	$("#button1").click( function() {
		var x1 = $('#x1').val();
		var y1 = $('#y1').val();
		$newName = $("<div class=\"listElement\">" + x1 + ", " + y1 + "</div>");
		$("#list").append($newName);
		xpoints.push(x1);
		ypoints.push(y1);
	});	
	
	//generates 100 random points
	$("#button4").click( function() {
		for(var i = 0; i < 100; i++)
		{
			var x = (Math.random() * 100);
			var y = (Math.random() * 100);
			xpoints.push(x);
			ypoints.push(y);
		}
	
	});
	
	//runs nearest neighbor algorithm and draws graph
	$("#button2").click( function() {
		var newx = [xpoints[0], ypoints[1]];
		var newy = [ypoints[0], ypoints[1]];
		for(var i = 2; i < xpoints.length; i++)
		{
			var shortest = distance(newx[0], newy[0], xpoints[i], ypoints[i]);
			var shorti = 0;
			for(var j = 1; j < newx.length; j++)
			{
				if(distance(newx[j], newy[j], xpoints[i], ypoints[i]) < shortest)
				{
					shortest = distance(newx[j], newy[j], xpoints[i], ypoints[i]);
					shorti = j;
				}
			}
			if(shorti == newx.length - 1)
			{
				newx.push(xpoints[i]);
				newy.push(ypoints[i]);
			}
			else
			{
				newx.splice(shorti + 1 , 0, xpoints[i]);
				newy.splice(shorti + 1, 0, ypoints[i]);
			}
		}
		for(var i = 0; i < newx.length - 1; i++)
		{
			ctx.moveTo(newx[i],newy[i]);
			ctx.lineTo(newx[i+1],newy[i+1]);
			ctx.stroke();
		}
	});
	
	//runs smallest increase algorithm and draws graph
	$("#button3").click( function() {
		var newx = [xpoints[0], xpoints[1]];
		var newy = [ypoints[0], ypoints[1]];
		for(var x = 2; x < xpoints.length; x++)
		{
			var tempx = newx;
			var tempy = newy;
			tempx.push(xpoints[x]);
			tempy.push(ypoints[x]);
			var shortest = tourLength(tempx, tempy);
			var shorti = x;
			for(var y = 1; y < newx.length; y++)
			{
				tempx = newx;
				tempy = newy;
				tempx.splice(y, 0, xpoints[x]);
				tempy.splice(y, 0, ypoints[y]);
				var length = tourLength(newx, newy);
				if(length < shortest)
				{
					shortest = length;
					shorti = y;
				}
			}
			if(shorti == newx.length - 1)
			{
				newx.push(xpoints[i]);
				newy.push(ypoints[i]);
			}
			else
			{
				newx.splice(shorti, 0, xpoints[i]);
				newy.splice(shorti, 0, ypoints[i]);
			}
		}
		for(var i = 0; i < newx.length - 1; i++)
		{
			ctx.moveTo(newx[i],newy[i]);
			ctx.lineTo(newx[i+1],newy[i+1]);
			ctx.stroke();
		}
	});
	
});

//gets distance between two inputted points
function distance(x1, y1, x2, y2){
	return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

function tourLength(xarray, yarray){
	var length = 0;
	for(var i = 0; i < xarray.length - 1; i++)
	{
		length += distance(xarray[i], yarray[i], xarray[i+1], yarray[i+1]);
	}
	return length;
}