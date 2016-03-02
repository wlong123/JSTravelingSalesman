/**
	Will Long
	3/2/16
	Traveling Saleman Problem Runner
	Version 1.0
*/
$(document).ready( function() {
	 //arrays containing all the x and y points
	var xpoints = [];
	var ypoints = [];
	
	var canvas = $("#canvas").get(0);  //sets up the first canvas
	var ctx = canvas.getContext("2d");
	ctx.linewidth = 2;
	ctx.canvas.width = 400;
	ctx.canvas.height = 300;
	
	var canvas2 = $("#canvas2").get(0);  //sets up the second canvas
	var ctx2 = canvas2.getContext("2d");
	ctx2.linewidth = 2;
	ctx2.canvas.width = 400;
	ctx2.canvas.height = 300;
	
	//manually adds points to list
	$("#button1").click( function() {
		var x1 = $('#x1').val(); //inputted x value
		var y1 = $('#y1').val(); //inputted y value
		$newName = $("<div class=\"listElement\">" + x1 + ", " + y1 + "</div>");
		$("#list").append($newName);
		//adds points to list and puts dot on canvas
		xpoints.push(x1);  
		ypoints.push(y1);
		ctx.fillRect(x1,y1,2,2); //puts 2x2 pixel dot on screen
		ctx2.fillRect(x1,y1,2,2);
	});	
	
	//generates 100 random points
	$("#button4").click( function() {
		for(var i = 0; i < 500; i++)
		{
			var x = (Math.random() * 400); //random number
			var y = (Math.random() * 300);
			//adds points to list and puts dot on canvas
			xpoints.push(x);
			ypoints.push(y);
			ctx.fillRect(x,y,2,2);
			ctx2.fillRect(x,y,2,2);
		}
	
	});
	
	$("#canvas").click(function() {
		canvas = $("#canvas").get(0);
		ctx = canvas.getContext("2d");
		//event.x and event.y canvas.offsetTop canvas.offsetLeft
	});
	
	//runs nearest neighbor algorithm and draws graph
	$("#button2").click( function() {
		var newx = [xpoints[0], xpoints[1]]; //creates new arrays of x and y points
		var newy = [ypoints[0], ypoints[1]];
		for(var i = 2; i < xpoints.length; i++) //goes through all of the inputted points
		{
			var shortest = distance(newx[0], newy[0], xpoints[i], ypoints[i]);  //variable shortest is used to find the shortest distance from that point to another point on the tour
			var shorti = 0;  //variable shorti is the index of the point on the tour closest to the current point
			for(var j = 1; j < newx.length; j++)  //finds the currently on the tour that is closest to the point being evaluated
			{
				if(distance(newx[j], newy[j], xpoints[i], ypoints[i]) < shortest)
				{
					shortest = distance(newx[j], newy[j], xpoints[i], ypoints[i]);
					shorti = j;
				}
			}
			if(shorti == newx.length - 1) //point is going to be added to end of tour because it is closest to the last point on the tour
			{
				newx.push(xpoints[i]);
				newy.push(ypoints[i]);
			}
			else
			{
				newx.splice(shorti + 1 , 0, xpoints[i]); //splice adds a point to a specified index in an array
				newy.splice(shorti + 1, 0, ypoints[i]);
			}
		}
		for(var i = 0; i < newx.length - 1; i++)  //draws graph
		{
			ctx.moveTo(newx[i],newy[i]);
			ctx.lineTo(newx[i+1],newy[i+1]);
			ctx.stroke();
		}
	});
	
	//runs smallest increase algorithm and draws graph
	$("#button3").click( function() {
		var newx = [xpoints[0], xpoints[1]]; //creates new arrays of x and y points
		var newy = [ypoints[0], ypoints[1]];
		for(var x = 2; x < xpoints.length; x++) //goes through all of the inputted points
		{
			var tempx = newx.slice(0); //slice(0) makes a copy of an array
			var tempy = newy.slice(0);
			tempx.push(xpoints[x]); 
			tempy.push(ypoints[x]);
			var shortest = tourLength(tempx, tempy); //variable shortest is used to find the spot in the tour that will result in the shortest tour length
			var shorti = x; //variable shorti is the index of the spot in the tour that will result in the shortest tour length
			for(var y = 1; y < newx.length; y++) //goes through current tour and finds spot that will result in the shortest tour length
			{
				tempx = newx.slice(0); //copy of array 
				tempy = newy.slice(0);
				tempx.splice(y, 0, xpoints[x]); //adds points to temporary arrays to see what resultant tour length will be
				tempy.splice(y, 0, ypoints[x]);
				var length = tourLength(tempx, tempy);
				if(length < shortest)
				{
					shortest = length;
					shorti = y;
				}
			}
			if(shorti == newx.length - 1) //adds new point to the end of the tour if that results in the shortest tour length 
			{
				newx.push(xpoints[x]);
				newy.push(ypoints[x]);
			}
			else //adds new point to spot within the tour
			{
				newx.splice(shorti, 0, xpoints[x]);
				newy.splice(shorti, 0, ypoints[x]);
			}
		}
		for(var i = 0; i < newx.length - 1; i++) //draws graph
		{
			ctx2.moveTo(newx[i],newy[i]);
			ctx2.lineTo(newx[i+1],newy[i+1]);
			ctx2.stroke();
		}
	});
	
});

//gets distance between two inputted points
function distance(x1, y1, x2, y2){
	return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

//calculates the tour length (total distance) 
function tourLength(xarray, yarray){
	var length = 0;
	for(var i = 0; i < xarray.length - 1; i++)
	{
		length += distance(xarray[i], yarray[i], xarray[i+1], yarray[i+1]);
	}
	return length;
}