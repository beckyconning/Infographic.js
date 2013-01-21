// A 2D view that displays two values as overlapping circles in a
// Raphael.js Paper (drawing context).
var ComparisonBubble = function(paper, values, options) {
	// inheritance
	var self = Graph(paper, values, options);
	
	// private
	var draw = function() {
		self.elements.length = 0;
			
		self.elements.push(
			paper.circle(centerX, centerY, (minDimensionSize / 2))
		);
			
		values.forEach(function(value) {
			var radius = ((value / self.yAxisMaxValue) * minDimensionSize) / 2;
			self.elements.push(
				paper.circle(centerX, centerY, radius)
			);
		});
	};
	
	// init
	var centerX, centerY, paperDimensions, minDimensionsSize;
	
	centerX = self.paperWidth() / 2;
	centerY = self.paperHeight() / 2;
	paperDimensions = [self.paperWidth(), self.paperHeight()];
	minDimensionSize = Math.min.apply(Math, paperDimensions);
	draw();

	// public
	self.toString = function() { 
		return "[object ComparisonBubble]"; 
	};
	
	self.draw = draw;
	
  return self;
};