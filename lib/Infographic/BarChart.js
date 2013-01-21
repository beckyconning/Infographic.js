// A 2D view that renders values as a bar chart on a Raphael.js Paper (drawing context).

var BarChart = function(paper, values, options) {
	// inheritance
	var self = Graph(paper, values, options);
	
	// init
	if (typeof options === "undefined") {
		var options = [];
	}
	
	var paperWidth = paper.canvas.clientWidth;
	var paperHeight = paper.canvas.clientHeight;
	
	var barSpacingAsWidthMultiplier;
	if(typeof options.barSpacingAsWidthMultiplier === "undefined") { 
	  barSpacingAsWidthMultiplier = 0.1;
	}
	else {
		barSpacingAsWidthMultiplier = options.barSpacingAsWidthMultiplier;
	}

	var draw = function() {
		self.elements.length = 0;
		
		var barSpacingWidth = (barSpacingAsWidthMultiplier * paperWidth);
		var barWidthWithoutSpacing = paperWidth / values.length;
		var barWidthWithTrailingSpacing = barWidthWithoutSpacing - barSpacingWidth;
		var barWidth = barWidthWithTrailingSpacing + (barSpacingWidth / values.length);

		values.forEach(function(value, valueIndex) {
			var valueBarHeight = (values[valueIndex] / self.yAxisMaxValue) * paperHeight;
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
		
	self.draw = draw;
	self.barSpacingAsWidthMultiplier = barSpacingAsWidthMultiplier;
		
  return self;
};