describe("ComparisonBubble", function() {
  var comparisonBubble;
	var paper, values, options;

  beforeEach(function() {		
		paper = { 
			circle: function() {}, 
			canvas: { clientWidth: 250, clientHeight: 300 } 
		};
		values = [8, 6.3, 5.1, 3]; // e.g. [acheivement, goal]		
		options = { yAxisMaxValue: 10.3 }
		
		comparisonBubble = ComparisonBubble(paper, values, options);
  });

	describe("constructor", function() {
			
		describe("when values are in ascending order", function() {
			beforeEach(function() {
				values = [8, 6.3, 5.1, 3];					
				comparisonBubble = ComparisonBubble(paper, values);
			});
    
			it("should draw comparison bubbles", function() {
				expect(comparisonBubble.elements.length).not.toEqual(0);
			})
    
			it("should return a ComparisonBubble", function() {
				expect(comparisonBubble.toString()).toEqual(
					"[object ComparisonBubble]"
				);
			});
		});
	});

	describe("draw()", function() {
		var centerX, centerY, paperDimensions, smallestDimensionSize;
		var firstValueDiameter, secondValueDiameter, axisMaxValueDiameter;
		beforeEach(function() {
			spyOn(paper, "circle");
			
			var paperWidth = paper.canvas.clientWidth;
			var paperHeight = paper.canvas.clientHeight;
			
			paperDimensions = [paperWidth, paperHeight]
			smallestDimensionSize = Math.min.apply(Math, paperDimensions);
			
			centerX = paperWidth / 2;		
			centerY = paperHeight / 2;	
			
			axisMaxValueDiameter = smallestDimensionSize;
			
			comparisonBubble = ComparisonBubble(paper, values, options);
			paper.circle.calls.length = 0;
			comparisonBubble.draw();
		});
			
		it("should first draw a circle representing the axis maximum value", function() {
			expect(paper.circle.calls[0].args).toEqual(
				[centerX, centerY, (axisMaxValueDiameter / 2)]
			);
		});
		
		it("should then draw circles representing each value with a diameter relative to the axis", function() {
			for (var valueIndex = 0; valueIndex < values.length; valueIndex ++) {
				var valueCircleDiameter = (values[valueIndex] / options.yAxisMaxValue) * smallestDimensionSize;
				var callIndex = valueIndex + 1;
				expect(paper.circle.calls[callIndex].args).toEqual(
					[centerX, centerY, (valueCircleDiameter / 2)]
				);
			}
		});
	});
	
	describe("elements", function() {
		
		it("should contain Raphael circle elements for the axis and each value", function() {		
			var elements = comparisonBubble.elements;
			
			var expectedNumberOfElements = values.length + 1;
			
			expect(elements.length).toEqual(expectedNumberOfElements);
			
		});
	});

});