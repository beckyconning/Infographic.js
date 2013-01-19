// A 2D view that displays two values as overlapping circles in a
// Raphael.js Paper (drawing context).
var ComparisonBubble = function(paper, values, axisMaxValue) {
	// inheritance
	var self = Infographic(paper);
	
	// validation
	var valuesNotDefined = (typeof values === "undefined");
	if(valuesNotDefined) { 
		return true; 
	}
	
	var descOrderSortedValues = values.toString().split(",").sort().reverse();
	var valuesNotInDecendingOrder = (values.toString() != descOrderSortedValues.toString());
  if(valuesNotInDecendingOrder) {
		return true;
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
			var radius = ((value / axisMaxValue) * minDimensionSize) / 2;
			self.elements.push(
				paper.circle(centerX, centerY, radius)
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