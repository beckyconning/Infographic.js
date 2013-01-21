describe("BarChart", function() {
  var barChart;
	var paper, values, options;
	var paperWidth, paperHeight, barWidth, barSpacingAsWidthMultiplier, barSpacingWidth;

  beforeEach(function() {		
		paper = { 
			rect: function() { return { tagName: "rect" }; },
			text: function() { return { tagName: "text" }; },
			canvas: { clientWidth: 250, clientHeight: 300 } 
		};
		values = [3.1, 4, 2];	
		options = {
			barSpacingAsWidthMultiplier: 1,
			valueLabels: true
		};
		
		barChart = BarChart(paper, values, options);
		
		barSpacingAsWidthMultiplier = options.barSpacingAsWidthMultiplier;
		
		paperWidth = paper.canvas.clientWidth;
		paperHeight = paper.canvas.clientHeight;
		
		barSpacingAsWidthMultiplier = options.barSpacingAsWidthMultiplier;
		barSpacingWidth = (barSpacingAsWidthMultiplier * paperWidth);
		barWidthWithoutSpacing = paperWidth / values.length;
		barWidthWithTrailingSpacing = barWidthWithoutSpacing - barSpacingWidth;
		barWidth = barWidthWithTrailingSpacing + (barSpacingWidth / values.length);
  });

	describe("constructor", function() {
		
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
		
		describe("when barSpacingAsWidthMultiplier is undefined", function() {
			beforeEach(function() {
				options.barSpacingAsWidthMultiplier = undefined;
				barChart = BarChart(paper, values, options);
			});
    
			it("should equal 0.1", function() {
				var highestValue = Math.max.apply(Math, values);
				expect(barChart.barSpacingAsWidthMultiplier).toEqual(0.1);
			});
		});
    
		describe("when barSpacingAsWidthMultiplier is defined", function() {
			beforeEach(function() {
				options.barSpacingAsWidthMultiplier = 0.25;
				barChart = BarChart(paper, values, options);
			});
    
			it("should equal the provided barSpacingAsWidthMultiplier", function() {
				expect(barChart.barSpacingAsWidthMultiplier).toEqual(options.barSpacingAsWidthMultiplier);
			});
		});
    
		describe("when barSpacingAsWidthMultiplier is defined", function() {
			beforeEach(function() {
				options.barSpacingAsWidthMultiplier = 0.25;
				barChart = BarChart(paper, values, options);
			});
    
			it("should equal the provided barSpacingAsWidthMultiplier", function() {
				expect(barChart.barSpacingAsWidthMultiplier).toEqual(options.barSpacingAsWidthMultiplier);
			});
		});
		
		describe("when valueLabels is not defined", function() {
			beforeEach(function() {
				options.valueLabels = undefined;
				spyOn(paper, "text")
				barChart = BarChart(paper, values, options);
			});
			
			it("should not draw any text", function() {
				expect(paper.text).not.toHaveBeenCalled();
			});
		});
		
		describe("when valueLabels is defined", function() {
			beforeEach(function() {
				spyOn(paper, "text")
			});
			
			describe("when valueLabels is false", function() {
				beforeEach(function() {
					options.valueLabels = false;
					barChart = BarChart(paper, values, options);
				});

				it("should not draw any text", function() {
					expect(paper.text).not.toHaveBeenCalled();
				});
			});
			
			describe("when valueLabels is true", function() {
				beforeEach(function() {
					options.valueLabels = true;
					barChart = BarChart(paper, values, options);
				});

				it("should draw text", function() {
					expect(paper.text).toHaveBeenCalled();
				});
			});

		});
	});
	
	describe("drawBars()", function() {
		beforeEach(function() {			
			values = [3.1, 4, 2];
			barChart = BarChart(paper, values, options);
			
			spyOn(paper, "rect");
			
			barChart.drawBars();
		});
		
		it("should call rect once for each value", function() {
			expect(paper.rect.calls.length).toEqual(values.length);
		});
		
		it("should draw rects for each value with heights relative to the axis", function() {
			for(var valueIndex = 0; valueIndex < values.length; valueIndex ++) {
				var valueBarHeight = (values[valueIndex] / barChart.yAxisMaxValue) * paperHeight;
				var valueBarXPosition = ((barWidth + barSpacingWidth) * valueIndex);
				var valueBarYPosition = paperHeight - valueBarHeight;
				
				expect(paper.rect.calls[valueIndex].args).toEqual(
					[valueBarXPosition, valueBarYPosition, barWidth, valueBarHeight]
				);
			};
		});
		
		// elements has undefined in during spec but not elsewhere?
		it("should put a rect into elements for each value", function() {
			var rects = barChart.elements.filter(function(element) {
				if (element) { return (element.tagName == "rect"); }
				else	       { return false; }
			});
			
			expect(rects.length).toEqual(values.length);
		});
		
	});
	
	describe("drawValueLabels()", function() {
		beforeEach(function() {
			values = [3.1, 4, 2];
			barChart = BarChart(paper, values, options);
			
			spyOn(paper, "text");
			barChart.drawValueLabels();
		});
		
		it("should call text once for each value", function() {
			expect(paper.text.calls.length).toEqual(values.length);
		});
		
		it("should draw a text field with the value in the center of the bar for each value", function() {
			for(var valueIndex = 0; valueIndex < values.length; valueIndex ++) {
				var valueBarHeight = (values[valueIndex] / barChart.yAxisMaxValue) * paperHeight;
				var valueBarXPosition = ((barWidth + barSpacingWidth) * valueIndex);
				var valueBarYPosition = paperHeight - valueBarHeight;
				
				var valueLabelXPosition = valueBarXPosition + (barWidth / 2);
				var valueLabelYPosition = valueBarYPosition + (valueBarHeight / 2);
				
				expect(paper.text.calls[valueIndex].args).toEqual(
					[valueLabelXPosition, valueLabelYPosition, values[valueIndex]]
				);
			};
		});
		
		// elements has undefined in during spec but not elsewhere?
		it("should put a text field into elements for each value", function() {
			var texts = barChart.elements.filter(function(element) {
				if (element) { return (element.tagName == "text"); }
				else	       { return false; }
			});
			
			expect(texts.length).toEqual(values.length);
		});
	});

});