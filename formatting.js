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


var Convert = { // conversion methods eg. inches to pixels
	toFraction: function(number) { 
		var numString = String(number);
		if (numString.indexOf('.') < 0) { //Checks if string-number is whole number
			return numString; // just returns whole number as string
		} else { // start dec to fraction conversion
			var dec = '.' + numString.split('.')[1]; // Parses Decimal from string (index 1 of new split array)
			var whole = numString.split('.')[0]; // Parses whole number from string (index 0 of new split array)
			var Frac = {};
				Frac.denom = Math.pow(10, (dec.length-1));
				Frac.numer = +dec * Frac.denom;
			var cDiv = false; // is common denominator found
			var d = Frac.denom; // divisor starts at denominator
			while ((!cDiv) && (d > 1)) { 
				if ((Frac.numer % d == 0) && (Frac.denom % d == 0)) { // if both numerator and denominator are divisible by d then d is found
					cDiv = true;
				} else { 
					d-- 
				}
			}
			if (cDiv) {
				while (Frac.numer % d === 0) {
					Frac.numer = Frac.numer / d;// divide numerator and denominator until both 
					Frac.denom = Frac.denom / d;
				}
				console.log(Frac.numer + " " + Frac.denom + ", " + d);
			}
			return `${whole} ${Frac.numer}/${Frac.denom}`;
		}
	},
	toPixels: function () {

	}
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
