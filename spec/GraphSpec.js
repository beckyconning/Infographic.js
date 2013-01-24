describe("Graph", function() {
  var graph;
	var paper, values, options;

  beforeEach(function() {		
		paper = { 
			path: function() {}, 
			canvas: { clientWidth: 250, clientHeight: 300 } 
		};
		values = [3.1, 4, 2, 4.8];	
		options = { yAxisMaxValue: 5.3, yAxisGrid: true };

		highestIntegerOnAxis = Math.floor(options.yAxisMaxValue);		
		
		graph = Graph(paper, values, options);
  });

	describe("constructor", function() {

		describe("when options.yAxisMaxValue is undefined", function() {
	  	beforeEach(function() {
	  		options.yAxisMaxValue = undefined;
	  		graph = Graph(paper, values, options);
	  	});
	  	
	  	it("should equal the highest value from values", function() {
	  		var highestValue = Math.max.apply(Math, values);
	  		expect(graph.yAxisMaxValue).toEqual(highestValue);
			});
		});
		
		describe("when options.yAxisMaxValue is defined", function() {
	  	beforeEach(function() {
	  		options.yAxisMaxValue = 5;
	  		graph = Graph(paper, values, options);
	  	});
	  	
	  	it("should equal the provided axisMaxValue", function() {
	  		expect(graph.yAxisMaxValue).toEqual(options.yAxisMaxValue);
			});
		});
		
		describe("when options.yAxisGrid is undefined in constructor call", function() {
			beforeEach(function() {
				options.yAxisGrid = undefined;
				graph = Graph(paper, values, options);
			});
    
			it("should not draw the y axis grid", function() {
				// pending
			});
		});
    
		describe("when options.yAxisGrid is undefined in constructor call", function() {
			describe("when yAxisGrid is false", function() {
				beforeEach(function() {
					options.yAxisGrid = false;
					graph = Graph(paper, values, options);
				});
      	
				it("should not draw the y axis grid", function() {
					// pending
				});
			});
			
			describe("when yAxisGrid is true", function() {
				beforeEach(function() {
					options.yAxisGrid = true;
					graph = Graph(paper, values, options);
				});
      	
				it("should draw the y axis grid", function() {
					// pending
				});
			});
		});
	});
	
	describe("drawYAxisGrid()", function() {
		var paperWidth, paperHeight, gridLineSpacing;
		beforeEach(function() {
			spyOn(paper, "path");
			graph = Graph(paper, values, options);
			paper.path.calls.length = 0;
			graph.drawYAxisGrid();
			
			paperWidth = paper.canvas.clientWidth;
			paperHeight = paper.canvas.clientHeight;
			
			gridLineSpacing = paperHeight / options.yAxisMaxValue;
		});
		
		it("should draw lines for origin and every integer up to y axis max value", function() {
			for(var gridLineIndex = 0; gridLineIndex <= highestIntegerOnAxis; gridLineIndex ++) {
				var pathStartX = 0;
				var pathEndX = paperWidth;
				
				var pathY = paperHeight - (gridLineSpacing * gridLineIndex);
				
				var moveToStart = "M" + pathStartX + "," + pathY;
				var lineToEnd   = "L" + pathEndX + "," + pathY;
				
				expect(paper.path.calls[gridLineIndex].args).toEqual([moveToStart + lineToEnd]);
			};
		});
	});
	
	describe("drawXAxisGrid()", function() {
		var paperWidth, paperHeight, gridLineSpacing;
		beforeEach(function() {
			spyOn(paper, "path");
			graph = Graph(paper, values, options);
			paper.path.calls.length = 0;
			graph.drawXAxisGrid();
			
			paperWidth = paper.canvas.clientWidth;
			paperHeight = paper.canvas.clientHeight;
			
			gridLineSpacing = paperWidth / options.yAxisMaxValue;
		});
		
		it("should draw lines for origin and every integer up to y axis max value", function() {
			for(var gridLineIndex = 0; gridLineIndex <= highestIntegerOnAxis; gridLineIndex ++) {
				var pathX = paperWidth - (gridLineSpacing * gridLineIndex);
				
				var pathStartY = 0;
				var pathEndY = paperWidth;
								
				var moveToStart = "M" + pathX + "," + pathStartY;
				var lineToEnd   = "L" + pathX + "," + pathEndY;
				
				expect(paper.path.calls[gridLineIndex].args).toEqual([moveToStart + lineToEnd]);
			};
		});
	});
	
	describe("elements", function() {
		it("should contain an element for each integer on axis", function() {		
			var elements = graph.elements;
						
			expect(elements.length).toEqual(highestIntegerOnAxis + 1);
		});
	});

});