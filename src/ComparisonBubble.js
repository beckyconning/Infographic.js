// A 2D view that displays two values as overlapping circles in a
// Raphael.js Paper (drawing context).
var ComparisonBubble = function(paper, values, axisMaxValue) {
	// inheritance
	var self = Infographic(paper);
	
	// validation
	if(typeof values === "undefined") { 
		return true; 
	}
	else {
		if(values.length < 2 || values.length > 2) { 
			return true; 
		}
	}
	
	// private
	var highestValue = function() {
		return Math.max.apply(Math, values);
	}

	var draw = function() {
		self.elements.length = 0;
			
		self.elements.push(
			paper.circle(centerX, centerY, (minDimensionSize / 2))
		);
			
		values.forEach(function(value) {
			var diameter = (value / axisMaxValue) * minDimensionSize;
			self.elements.push(
				paper.circle(centerX, centerY, (diameter / 2))
			);
		});
	};
	
	// init
	var centerX, centerY, paperDimensions, minDimensionsSize;
	if(typeof axisMaxValue === "undefined") { 
		axisMaxValue = highestValue();
	}
	
	centerX = self.paperWidth() / 2;
	centerY = self.paperHeight() / 2;
	paperDimensions = [self.paperWidth(), self.paperHeight()];
	minDimensionSize = Math.min.apply(Math, paperDimensions);
	draw();

	// public
	self.toString = function() { 
		return "[object ComparisonBubble]"; 
	};
	
	self.axisMaxValue = function() { 
		return axisMaxValue; 
	};
	
	self.draw = draw;
	
  return self;
};