describe("BarChart", function() {
  var barChart;
	var paper, values, axisMaxValue, barSpacingAsWidthMultiplier;

  beforeEach(function() {		
		paper = { 
			rect: function() {}, 
			canvas: { clientWidth: 250, clientHeight: 300 } 
		};
		values = [3.1, 4, 2];	
		axisMaxValue = 5;
		
		barChart = BarChart(paper, values, axisMaxValue);
  });

	describe("constructor", function() {
		
		describe("when values is undefined", function() {
			beforeEach(function() {
				values = undefined;
				barChart = BarChart(paper, values);
			});
			
			it("should return true", function() {
				expect(barChart).toBe(true);
			});
		});
		
		describe("when values is defined", function() {
		  beforeEach(function() {
		  	values = [3.1, 4];
		  	barChart = BarChart(paper, values);
		  });
		  
			it("should call draw()", function() {
				spyOn(barChart, "draw").andCallThrough();
			})
		
		  it("should return a BarChart", function() {
		  	expect(barChart.toString()).toEqual(
		  		"[object BarChart]"
		  	);
		  });
		});
		
		describe("when axisMaxValue is undefined in constructor call", function() {
	  	beforeEach(function() {
	  		axisMaxValue = undefined;
	  		barChart = BarChart(paper, values, axisMaxValue);
	  	});
	  	
	  	it("should equal the highest value from values", function() {
	  		var highestValue = Math.max.apply(Math, values);
	  		expect(barChart.axisMaxValue).toEqual(highestValue);
			});
		});
		
		describe("when axisMaxValue is defined in constructor call", function() {
	  	beforeEach(function() {
	  		axisMaxValue = 5;
	  		barChart = BarChart(paper, values, axisMaxValue);
	  	});
	  	
	  	it("should equal the provided axisMaxValue", function() {
	  		expect(barChart.axisMaxValue).toEqual(axisMaxValue);
			});
		});
		
		describe("when barSpacingAsWidthMultiplier is undefined in constructor call", function() {
			beforeEach(function() {
				axisMaxValue = undefined;
				barChart = BarChart(paper, values, axisMaxValue, barSpacingAsWidthMultiplier);
			});
    
			it("should equal 0.1", function() {
				var highestValue = Math.max.apply(Math, values);
				expect(barChart.barSpacingAsWidthMultiplier).toEqual(0.1);
			});
		});
    
		describe("when barSpacingAsWidthMultiplier is defined in constructor call", function() {
			beforeEach(function() {
				barSpacingAsWidthMultiplier = 0.25;
				barChart = BarChart(paper, values, axisMaxValue, barSpacingAsWidthMultiplier);
			});
    
			it("should equal the provided axisMaxValue", function() {
				expect(barChart.barSpacingAsWidthMultiplier).toEqual(barSpacingAsWidthMultiplier);
			});
		});
	});
	
	describe("draw()", function() {
		var paperWidth, paperHeight, barWidth, barSpacingAsWidthMultiplier, barSpacingWidth;
		beforeEach(function() {
			spyOn(paper, "rect");
			
			paperWidth = paper.canvas.clientWidth;
			paperHeight = paper.canvas.clientHeight;
			
			barSpacingAsWidthMultiplier = 0.1;
			barSpacingWidth = (barSpacingAsWidthMultiplier * paperWidth);
			barWidthWithoutSpacing = paperWidth / values.length;
			barWidthWithTrailingSpacing = barWidthWithoutSpacing - barSpacingWidth;
			barWidth = barWidthWithTrailingSpacing + (barSpacingWidth / values.length);
			
			barChart = BarChart(paper, values, axisMaxValue, barSpacingAsWidthMultiplier);
			paper.rect.calls.length = 0;
			barChart.draw(paper, values, axisMaxValue, barSpacingAsWidthMultiplier);
		});
		
		it("should draw rects for each value with heights relative to the axis", function() {
			for(var valueIndex = 0; valueIndex < values.length; valueIndex ++) {
				var valueBarHeight = (values[valueIndex] / axisMaxValue) * paperHeight;
				var valueBarXPosition = ((barWidth + barSpacingWidth) * valueIndex);
				var valueBarYPosition = paperHeight - valueBarHeight;
				
				expect(paper.rect.calls[valueIndex].args).toEqual(
					[valueBarXPosition, valueBarYPosition, barWidth, valueBarHeight]
				);
			};
		});
		
	});
	
	describe("elements", function() {
		it("should contain Raphael rect elements for each value", function() {		
			var elements = barChart.elements;
						
			expect(elements.length).toEqual(values.length);
			
			//for(var elementIndex; elementIndex < elements.length; elementIndex ++) {
			//	expect(elements[elementIndex].toString()).toEqual("Raphaël’s object");
			//	expect(elements[elementIndex].type()).toEqual("bleep");
			//}
		});
	});

});