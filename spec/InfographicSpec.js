describe("Infographic", function() {
  var infographic, paper;

  beforeEach(function() {
		paper = { canvas: { clientWidth: 250, clientHeight: 300 } };
		values = [5.35, 3.42, 2.590, 1.4];
		infographic = Infographic(paper, values);
  });

	describe("constructor", function() {
		
		describe("when paper is undefined", function() {
			beforeEach(function() {
				paper = undefined;
				infographic = Infographic(paper, values);
			})
			
			it("should return true", function() {
				expect(infographic).toBe(true);
			});
		});
		
		describe("when paper is defined", function() {
			beforeEach(function() {
				paper = { canvas: { clientWidth: 250, clientHeight: 300 } };
				infographic = Infographic(paper, values);
			});
			
			it("should return an Infographic", function() {
				expect(infographic.toString()).toEqual(
					"[object Infographic]"
				);
			});
		});
		
		describe("when values is undefined", function() {
			beforeEach(function() {
				values = undefined;
				infographic = Infographic(paper, values);
			});
			
			it("should return true", function() {
				expect(infographic).toBe(true);
			});
		});
		
		describe("when values is defined", function() {
		  beforeEach(function() {
		  	values = [3.1, 4];
		  	infographic = Infographic(paper, values);
		  });
		
		  it("should return a Infographic", function() {
		  	expect(infographic.toString()).toEqual(
		  		"[object Infographic]"
		  	);
		  });
		});
	});
	
	describe("paperWidth()", function() {
		it("should return the width of the raphael paper", function() {
			expect(infographic.paperWidth()).toEqual(paper.canvas.clientWidth);
		});
	});
	
	describe("paperHeight()", function() {
		it("should return the width of the raphael paper", function() {
			expect(infographic.paperHeight()).toEqual(paper.canvas.clientHeight);
		});
	});
	
	describe("elements", function() {
		it("should be an array", function() {
			var elements = infographic.elements
			expect(Object.prototype.toString.call(elements)).toEqual(
				"[object Array]"
			);
		})
	})
});