$(document).ready(function() {	
	console.log("ready!");

		//data validation
	$("printX, #printY, #workX, #workY").keyup(function(){
		
		});

	$("#calculate").click(function(){
		$("#resultsList li").remove();
		
		//int inches increment constant
		const sixteenths = (1 / 16);
		
		//int print size variables
		var printX = Number($("#printX").val());
		var printY = Number($("#printY").val());
		console.log(printX + " " + printY);

		//int paper size variables
		var workX = Number($("#workX").val());
		var workY = Number($("#workY").val());
		console.log(workX + " " + workY);


		//int WorkSizes object
		var WorkSizes = {};

		//LayoutScheme Object Constructor
		function LayoutScheme(x,y) {
			this.dimensions = [x,y]
			this.liveMargins = ""
		}

		//LayoutScheme Methods
		LayoutScheme.prototype.toFraction = function(x,y) {
				
		}

		//function finds proportion of known x and y
		var findProportion = function(x,y) {
			return y / x;
		};
		
		var prop = findProportion(printX, printY);
		console.log(prop);
		
		//function uses proportion to find work size values
		
		function findWorkSizes(minX,minY,maxX,maxY) {
			console.log("finding sizes...");
			for(var x = minX, y = minY; x <= maxX; x += sixteenths) {
				var y = x * prop;
				if (y < maxY) {
					var name = x + "x" + y;
					WorkSizes[name] = new LayoutScheme(x,y);
					console.log(WorkSizes[name].dimensions);
				}else {
					break;
				}
			}

		}		
		function deviationControl(sizesObj)  {
			for(prop in sizesObj){
				if (sizesObj[prop].dimensions[1] % sixteenths != 0) {

					console.log("DUMPED: " + sizesObj[prop].dimensions);
					delete sizesObj[prop];
				} else {
					console.log("PASS: " + sizesObj[prop].dimensions);
				}
			}
		}		
		findWorkSizes(printX, printY, workX, workY);
		deviationControl(WorkSizes);
		appendResults(WorkSizes);

		function appendResults(sizesObj) {
			for (prop in sizesObj){
				var size = sizesObj[prop].dimensions;
				$("ul#resultsList").append(
					"<li class=\"resultObj\" id=\"" + prop + "\"><button>" + size[0] + " x " + size[1] + "</button></li>"
					);	
			}
		}

		//on click dimObj triggers visual info
		$('li.resultObj button').on('click', function(){
			$("li.resultObj button").removeClass("highlight");
			var resultKey = $(this).closest("li").attr("id");
			$(this).addClass("highlight");	
			console.log(resultKey);	
		});
	});
});