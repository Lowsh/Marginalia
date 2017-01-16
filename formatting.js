$(document).ready(function() {
	initialize();
	$("#calc").keyup(initialize);
});

var initialize = function() {
	$("#resultsList li").remove();
	Input.init();
	Layouts.init();
	Output.init();
};

//int inches increment constant
const sixteenths = (1 / 16);
//need data validation

//Input Values object - Stores and retrieves
var Input = {
	init: function() {
		this.retrieveInput();
	},
	retrieveInput: function (){
		var pDim = Input.PrintDims;
		var cDim = Input.CanvasDims;
		pDim.xVal = +$("#printX").val();
		pDim.yVal = +$("#printY").val();
		cDim.xVal = +$("#canvasX").val();
	    cDim.yVal = +$("#canvasY").val();
	},
	PrintDims: {
		xVal: undefined,
		yVal: undefined,
		ratio: function() {
			var r = this.yVal / this.xVal;
			return r;
			console.log("ratio is " + r);
		}
	},
	CanvasDims: {
		xVal: undefined,
		yVal: undefined
	}
};

var Layouts = {
	init: function() {
		this.findSchemes(Input.PrintDims, Input.CanvasDims);
		this.removeNonSixteenths(this.schemeArr);
	},
	Scheme: function (x,y) {
		this.dimensions = [x,y]
		this.liveMargins = []
		this.dimFrac = [];
	},
	schemeArr: [],
	findSchemes: function (print, canvas) {
		console.log("finding sizes...");
		Layouts.schemeArr = []; // reset array
		for(var x = print.xVal; x <= canvas.xVal; x += sixteenths) {
			var y = x * print.ratio();
			if (y < canvas.yVal) {
				console.log("x: " + x + " y: " + y);
				this.schemeArr.push(new this.Scheme(x,y));
			}else {
				break;
			}
		}
		console.log("found schemes: " + Layouts.schemeArr);
	}, 
	removeNonSixteenths: function(schemes)  {
		for(var i = 0, len = schemes.length; i < len; i++){
			if (schemes[i].dimensions[1] % sixteenths != 0) {
				//console.log("DUMPED: " + sizesObj[prop].dimensions);
				schemes.splice(i,1);
				len = schemes.length;
				i--;
			} else {
				//console.log("PASS: " + sizesObj[prop].dimensions);
			}
		}
	}
};


//Layout.Scheme Methods
Layouts.Scheme.prototype.toFraction = function() {
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
};
	
var Output = {
	init: function(){
		this.SchemeText.appendSchemeArr(Layouts.schemeArr);
	},
	SchemeText: {
		appendSchemeArr: function(schemes) {
			console.log("output.appendResults called");
			for (var i = 0, len = schemes.length; i < len; i++ ){
				var size = schemes[i].dimensions;
				$("ul#resultsList").append(
					"<li class=\"result-box\" id=\"layout" + i + "\"><button>" + size[0] + " x " + size[1] + "</button></li>"
					);	
			}
		},
		appendScheme: function(){}
	},
	SchemeVisual: {

	}
};
	//on click dimObj triggers visual info
	$('li.result-box button').on('click', function(){
		$("li.result-box button").removeClass("highlight");
		var resultKey = $(this).closest("li").attr("id");
		$(this).addClass("highlight");	
		console.log("element id: " + resultKey);	
		console.log("object dimensions: " + WorkSizes[resultKey].dimensions);
		console.log("object dimensions(frac): " + WorkSizes[resultKey].dimFrac);
	});
