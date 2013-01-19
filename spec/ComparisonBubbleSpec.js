describe("ComparisonBubble", function() {
  var comparisonBubble;
	var paper, values, axisMaxValue;

  beforeEach(function() {		
		paper = { 
			circle: function() {}, 
			canvas: { clientWidth: 250, clientHeight: 300 } 
		};
		values = [8, 6.3, 5.1, 3]; // e.g. [acheivement, goal]		
		axisMaxValue = 10;
		
		comparisonBubble = ComparisonBubble(paper, values, axisMaxValue);
  });

	describe("constructor", function() {
		
		describe("when values is undefined", function() {
			beforeEach(function() {
				values = undefined;
				comparisonBubble = ComparisonBubble(paper, values);
			});
			
			it("should return true", function() {
				expect(comparisonBubble).toBe(true);
			});
		});
		
		describe("when values is defined", function() {
			describe("when values are not in descending order", function() {
				beforeEach(function() {
					values = [3, 5, 4, 7];
					comparisonBubble = ComparisonBubble(paper, values);
				});
				
				it("should return true", function() {
					expect(comparisonBubble).toBe(true);
				});
			});
			
			describe("when values are in ascending order", function() {
				beforeEach(function() {
					values = [7, 5, 4, 3];
					comparisonBubble = ComparisonBubble(paper, values);
				});

				it("should call draw()", function() {
					spyOn(comparisonBubble, "draw").andCallThrough();
				})

				it("should return a ComparisonBubble", function() {
					expect(comparisonBubble.toString()).toEqual(
						"[object ComparisonBubble]"
					);
				});
			});
		});
	});
	
	describe("axisMaxValue()", function() {
		describe("when axisMaxValue is undefined in constructor call", function() {
	  	beforeEach(function() {
	  		axisMaxValue = undefined;
	  		comparisonBubble = ComparisonBubble(paper, values, axisMaxValue);
	  	});
	  	
	  	it("should return the highest value from values", function() {
	  		var highestValue = Math.max.apply(Math, values);
	  		expect(comparisonBubble.axisMaxValue()).toEqual(highestValue);
			});
		});
		
		describe("when axisMaxValue is defined in constructor call", function() {
	  	beforeEach(function() {
	  		axisMaxValue = 5;
	  		comparisonBubble = ComparisonBubble(paper, values, axisMaxValue
	  		);
	  	});
	  	
	  	it("should return the provided axisMaxValue", function() {
	  		expect(comparisonBubble.axisMaxValue()).toEqual(axisMaxValue);
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
			
			
			comparisonBubble = ComparisonBubble(paper, values, axisMaxValue);
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
				var valueCircleDiameter = (values[valueIndex] / axisMaxValue) * smallestDimensionSize;
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
			
			//for(var elementIndex; elementIndex < elements.length; elementIndex ++) {
			//	expect(elements[elementIndex].toString()).toEqual("Raphaël’s object");
			//	expect(elements[elementIndex].type()).toEqual("circle");
			//}
		});
	});

});