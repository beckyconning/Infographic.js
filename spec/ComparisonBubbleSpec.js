describe("ComparisonBubble", function() {
  var comparisonBubble;
	var paper, values, axisMaxValue;

  beforeEach(function() {		
		paper = { 
			circle: function() {}, 
			canvas: { clientWidth: 250, clientHeight: 300 } 
		};
		values = [3.1, 4]; // e.g. [acheivement, goal]		
		axisMaxValue = 5;
		
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
			describe("when values has less than two elements", function() {
				beforeEach(function() {
					values = [3.1];
					comparisonBubble = ComparisonBubble(paper, values);
				});
				
				it("should return true", function() {
					expect(comparisonBubble).toBe(true);
				});
			});
			
			describe("when values has more than two elements", function() {
				beforeEach(function() {
					values = [3.1, 4, 5];
					comparisonBubble = ComparisonBubble(paper, values);
				});
				
				it("should return true", function() {
					expect(comparisonBubble).toBe(true);
				});
			});
			
			describe("when values has two elements", function() {
			  beforeEach(function() {
			  	values = [3.1, 4];
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
			
			firstValueDiameter = (values[0] / axisMaxValue) * smallestDimensionSize;
			secondValueDiameter = (values[1] / axisMaxValue) * smallestDimensionSize;
			
			comparisonBubble = ComparisonBubble(paper, values, axisMaxValue);
			paper.circle.calls.length = 0;
			comparisonBubble.draw();
		});
			
		it("should first draw a circle representing the axis maximum value", function() {
			expect(paper.circle.calls[0].args).toEqual(
				[centerX, centerY, (axisMaxValueDiameter / 2)]
			);
		});
		
		it("should secondly draw a circle representing the first value with a diameter relative to the axis", function() {
			expect(paper.circle.calls[1].args).toEqual(
				[centerX, centerY, (firstValueDiameter / 2)]
			);
		});
		
		it("should thirdly draw a circle representing the second value with a diameter relative to the axis", function() {
			expect(paper.circle.calls[2].args).toEqual(
				[centerX, centerY, (secondValueDiameter / 2)]
			);
		});
	});
	
	describe("elements", function() {
		
		it("should contain Raphael circle elements for the axis and each value", function() {		
			var elements = comparisonBubble.elements;
			
			var expectedNumberOfElements = values.length + 1;
			
			expect(elements.length).toEqual(expectedNumberOfElements);
			
			for(var elementIndex; elementIndex < elements.length; elementIndex ++) {
				expect(elements[elementIndex].toString()).toEqual("Raphaël’s object");
				expect(elements[elementIndex].type()).toEqual("circle");
			}
		});
	});

});