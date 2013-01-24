// A 2D view that renders values as a bar chart on a Raphael.js Paper (drawing context).

var BarChart = function(paper, values, options) {
	// inheritance
	var self = Graph(paper, values, options);
	
	// init
	if(typeof options === "undefined") {
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
	
	var valueLabelsDecimalAccuracy;
	if(typeof options.valueLabelsDecimalAccuracy === "undefined") { 
	  valueLabelsDecimalAccuracy = 2;
	}
	else {
		valueLabelsDecimalAccuracy = options.valueLabelsDecimalAccuracy;
	}
	
	var orientation;
	if(typeof options.orientation === "undefined") { 
	  orientation = "column";
	}
	else {
		orientation = options.orientation;
	}
	
	var drawBars = function() {		
		var barSpacingWidth = (barSpacingAsWidthMultiplier * paperWidth);
		var barWidthWithoutSpacing = paperWidth / values.length;
		var barWidthWithTrailingSpacing = barWidthWithoutSpacing - barSpacingWidth;
		var barWidth = barWidthWithTrailingSpacing + (barSpacingWidth / values.length);
		
		barSpacingAsHeightMultiplier = options.barSpacingAsWidthMultiplier;
		barSpacingHeight = (barSpacingAsHeightMultiplier * paperHeight);
		barHeightWithoutSpacing = paperHeight / values.length;
		barHeightWithTrailingSpacing = barHeightWithoutSpacing - barSpacingHeight;
		barHeight = barHeightWithTrailingSpacing + (barSpacingHeight / values.length);

		values.forEach(function(value, valueIndex) {
			var rect;
			if(orientation == "column") {
				var valueBarHeight = (values[valueIndex] / self.yAxisMaxValue) * paperHeight;
				var valueBarXPosition = ((barWidth + barSpacingWidth) * valueIndex);
				var valueBarYPosition = paperHeight - valueBarHeight;
				
				rect = paper.rect(valueBarXPosition, valueBarYPosition, barWidth, valueBarHeight);
			}
			else if(orientation == "row") {
				var valueBarWidth = (values[valueIndex] / self.yAxisMaxValue) * paperWidth;
				var valueBarXPosition = 0;
				var valueBarYPosition = ((barHeight + barSpacingHeight) * valueIndex);

				rect = paper.rect(valueBarXPosition, valueBarYPosition, valueBarWidth, barHeight);
			}
			
			self.elements.push(rect);
		});		
	};
	
	var drawValueLabels = function() {
		var barSpacingWidth = (barSpacingAsWidthMultiplier * paperWidth);
		var barWidthWithoutSpacing = paperWidth / values.length;
		var barWidthWithTrailingSpacing = barWidthWithoutSpacing - barSpacingWidth;
		var barWidth = barWidthWithTrailingSpacing + (barSpacingWidth / values.length);

		values.forEach(function(value, valueIndex) {			
			var valueBarHeight, valueBarXPosition, valueBarYPosition;
			var valueLabelXPosition, valueLabelYPosition;
			if(orientation == "column") {
				valueBarHeight = (value / self.yAxisMaxValue) * paperHeight;
				valueBarXPosition = ((barWidth + barSpacingWidth) * valueIndex);
				valueBarYPosition = paperHeight - valueBarHeight;
				
				valueLabelXPosition = valueBarXPosition + (barWidth / 2);
				valueLabelYPosition = valueBarYPosition + (valueBarHeight / 2);
			}
			else if(orientation == "row") {
				valueBarWidth = (values[valueIndex] / self.yAxisMaxValue) * paperWidth;
				valueBarXPosition = 0;
				valueBarYPosition = ((barHeight + barSpacingHeight) * valueIndex);
				
				valueLabelXPosition = valueBarXPosition + (valueBarWidth / 2);
				valueLabelYPosition = valueBarYPosition + (barHeight / 2);
			}
						
			var valueBeforePoint = value.toString().split(".")[0];
			var labelPrecision = valueLabelsDecimalAccuracy + valueBeforePoint.length;
			var labelText = value.toPrecision(labelPrecision);
			
			var text = paper.text(valueLabelXPosition, valueLabelYPosition, labelText);
			self.elements.push(text);
		});
	};
	
	var draw = function() {
		self.elements.length = 0;
		drawBars();
		if(options.valueLabels) { drawValueLabels(); }
	};
	
	draw();

	// public interface
	self.toString = function() { 
		return "[object BarChart]"; 
	};
		
	self.draw = draw;
	self.drawValueLabels = drawValueLabels;
	self.drawBars = drawBars;
	self.barSpacingAsWidthMultiplier = barSpacingAsWidthMultiplier;
	self.valueLabelsDecimalAccuracy = valueLabelsDecimalAccuracy;
	self.orientation = orientation;
	
  return self;
};