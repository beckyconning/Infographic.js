// A 2D view that renders values as a bar chart on a Raphael.js Paper (drawing context).

var Graph = function(paper, values, options) {
	// inheritance
	var self = Infographic(paper, values);
	
	// init
	if (typeof options === "undefined") {
		var options = [];
	}

	var paperWidth = paper.canvas.clientWidth;
	var paperHeight = paper.canvas.clientHeight;
	var highestValue = function() {
		return Math.max.apply(Math, values);
	};

	if(typeof options.yAxisMaxValue === "undefined") { 
		yAxisMaxValue = highestValue();
	}
	else {
		yAxisMaxValue = options.yAxisMaxValue;
	}
	
	var drawYAxisGrid = function() {
		self.elements.length = 0;
			
		var highestIntegerOnAxis = Math.floor(options.yAxisMaxValue);
		var gridLineSpacing = paperHeight / options.yAxisMaxValue;
		
		for(var gridLineIndex = 0; gridLineIndex <= highestIntegerOnAxis; gridLineIndex ++) {
			var pathStartX = 0;
			var pathEndX = paperWidth;
			
			var pathY = paperHeight - (gridLineSpacing * gridLineIndex);
			
			var moveToStart = "M" + pathStartX + "," + pathY;
			var lineToEnd   = "L" + pathEndX + "," + pathY;
			
			var path = paper.path(moveToStart + lineToEnd);
			self.elements.push(path);
		}
		return self.elements;
	};
	
	var drawXAxisGrid = function() {
		self.elements.length = 0;
			
		var highestIntegerOnAxis = Math.floor(options.yAxisMaxValue);
		var gridLineSpacing = paperWidth / options.yAxisMaxValue;
		
		for(var gridLineIndex = 0; gridLineIndex <= highestIntegerOnAxis; gridLineIndex ++) {
			var pathX = paperWidth - (gridLineSpacing * gridLineIndex);
			
			var pathStartY = 0;
			var pathEndY = paperWidth;
						
			var moveToStart = "M" + pathX + "," + pathStartY;
			var lineToEnd   = "L" + pathX + "," + pathEndY;
			
			var path = paper.path(moveToStart + lineToEnd);
			self.elements.push(path);
		}
		return self.elements;
	};
	
	if(options.yAxisGrid) { 
		drawYAxisGrid();
	}
	
	if(options.xAxisGrid) { 
		drawXAxisGrid();
	}

	// public interface
	self.toString = function() { 
		return "[object Graph]"; 
	};
	
	self.yAxisMaxValue = yAxisMaxValue;
	
	self.drawYAxisGrid = drawYAxisGrid;
	self.drawXAxisGrid = drawXAxisGrid;
	
  return self;
};