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
		var printX = +$("#printX").val();
		var printY = +$("#printY").val();
		console.log(printX + " " + printY);

		//int paper size variables
		var workX = +$("#workX").val();
		var workY = +$("#workY").val();
		console.log(workX + " " + workY);


		//int WorkSizes object
		var WorkSizes = {};

		//LayoutScheme Object Constructor
		function LayoutScheme(x,y) {
			this.dimensions = [x,y]
			this.liveMargins = ""
			this.dimFrac = [];
		}

		//LayoutScheme Methods
		LayoutScheme.prototype.toFraction = function() {
			for (var i = 0; i < this.dimensions.length; i++) {
				var dimString = String(this.dimensions[i]);
				if (dimString.indexOf('.') < 0) { //Checks if string-number is whole number
					this.dimFrac[i] = dimString; // Stores whole number dimension
				} else {
					var dec = '.' + dimString.split('.')[1]; // Parses Decimal from string 
					var whole = dimString.split('.')[0]; // Parses whole number from string
					var frac = function() {
						var numerator = +dec * 16;
						var denomArr = [[8,2],[4,4],[2,8],[1,16]];
						for (var n = 0; n < denomArr.length; n++) {
							if ((numerator % denomArr[n][0]) == 0) {
								return (numerator / denomArr[n][0]) + "/" + denomArr[n][1];
								break;
							}
						}
					};	
					this.dimFrac[i] = whole + " " + frac();
				}	
			}
			console.log(this.dimFrac);
		}

		//function finds proportion of known x and y
		var findProportion = function(x,y) {
			return y / x;
		};
		
		var propYX = findProportion(printX, printY);
		console.log(propYX);
		
		//function uses proportion to find work size values
		
		function findWorkSizes(minX,minY,maxX,maxY) {
			console.log("finding sizes...");
			for(var x = minX, y = minY; x <= maxX; x += sixteenths) {
				var y = x * propYX;
				if (y < maxY) {
					var name = x + "x" + y;
					WorkSizes[name] = new LayoutScheme(x,y);
					//console.log(WorkSizes[name].dimensions);
				}else {
					break;
				}
			}

		}		
		function deviationControl(sizesObj)  {
			for(prop in sizesObj){
				if (sizesObj[prop].dimensions[1] % sixteenths != 0) {
					//console.log("DUMPED: " + sizesObj[prop].dimensions);
					delete sizesObj[prop];
				} else {
					var objDim = sizesObj[prop].dimensions;
					sizesObj[prop].toFraction(objDim[0],objDim[1]);
					//console.log("PASS: " + sizesObj[prop].dimensions);
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
			console.log("element id: " + resultKey);	
			console.log("object dimensions: " + WorkSizes[resultKey].dimensions);
			console.log("object dimensions(frac): " + WorkSizes[resultKey].dimFrac);
		});
	});
});