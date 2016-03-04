$(document).ready(function() {	
	console.log("ready!");

		/*data validation*/
	$("printX, #printY, #workX, #workY").keyup(function(){
		
		});

	$("#calculate").click(function(){
		$("#results").children("p").remove();
		/*int inches increment constant*/
		const sixteenths = (1 / 16);
		/*int print size variables*/
		var printX = Number($("#printX").val());
		var printY = Number($("#printY").val());
		console.log(printX + " " + printY);

		/*int paper size variables*/
		var workX = Number($("#workX").val());
		var workY = Number($("#workY").val());
		console.log(workX + " " + workY);

		/*int work size array*/
		var workSizes = [];


		/*function finds proportion of known x and y*/
		var findProportion = function(x,y) {
			return y / x;
		};
		var prop = findProportion(printX, printY);
		console.log(prop);
		
		/*function uses proportion to find work size values*/
		
		function findWorkSizes(minX,minY,maxX,maxY) {
			console.log("finding sizes...");
			for(var x = minX, y = minY; x <= maxX; x += sixteenths) {
				var y = x * prop;
				if (y < maxY) {
					workSizes.push([x, y]);
				}else {
					break;
				}
			}
		}
		function deviationControl(sizesArray)  {
			for(var i = 0; i < sizesArray.length; i++){
				if (sizesArray[i][1] % sixteenths != 0) {
					console.log("DUMPED: " + sizesArray[i][1]);
					sizesArray.splice(i,1);
					i--;
				} else {
					console.log("PASS: " + sizesArray[i][1]);
				}
			}
		}
		findWorkSizes(printX, printY, workX, workY);
		deviationControl(workSizes);
		appendResults();

		/*append DOM with results*/
		function appendResults() {
			for (var i = 0; i < workSizes.length; i++) {
				$("#results").append(
					"<p>" + workSizes[i][0] + " x " + workSizes[i][1] + "</p>"
					);
				console.log(workSizes[i]);
			}
		}
	});
	// set option to interval by .0625 (1/16) or 0.125 (1/8) use CONST
	// start with newY and multiply by prop. 
	// check if newX < workX
	// round to nearest 8th
	// store to array
});