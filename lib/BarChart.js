// A 2D view that renders values as a bar chart on a Raphael.js Paper (drawing context).

var BarChart = function(paper, values, axisMaxValue, barSpacingAsWidthMultiplier) {
	// inheritance
	var self = Infographic(paper);
	
	// validation
	if(typeof values === "undefined") { 
		return true; 
	}
	
	// init
	var paperWidth = paper.canvas.clientWidth;
	var paperHeight = paper.canvas.clientHeight;
	var highestValue = function() {
		return Math.max.apply(Math, values);
	}

	if(typeof axisMaxValue === "undefined") { 
		axisMaxValue = highestValue();
	}
	
	if(typeof barSpacingAsWidthMultiplier === "undefined") { 
		barSpacingAsWidthMultiplier = 0.1;
	}

	var draw = function() {
		self.elements.length = 0;
			
		values.forEach(function(value, valueIndex) {
			barSpacingWidth = barSpacingAsWidthMultiplier * paperWidth;
			barWidthWithoutSpacing = paperWidth / values.length;
			barWidthWithTrailingSpacing = barWidthWithoutSpacing - barSpacingWidth;
			barWidth = barWidthWithTrailingSpacing + (barSpacingWidth / values.length);

			var valueBarHeight = (value / axisMaxValue) * paperHeight;
			var valueBarXPosition = ((barWidth + barSpacingWidth) * valueIndex);
			var valueBarYPosition = paperHeight - valueBarHeight;
			
			var rect = paper.rect(valueBarXPosition, valueBarYPosition, barWidth, valueBarHeight);
			self.elements.push(rect);
		});
	};
	
	draw();

	// public interface
	self.toString = function() { 
		return "[object BarChart]"; 
	};
	
	self.axisMaxValue = axisMaxValue;
	self.barSpacingAsWidthMultiplier = barSpacingAsWidthMultiplier;
	
	self.draw = draw;
	
  return self;
};