it("should draw a circle that represents the largest value", function() {
	var largestValue = Math.max.apply(Math, comparisonBubble.values);
	describe("when axisMaximumValue is defined", function() {
		beforeEach(function() {
			comparisonBubble.axisMaximumValue = 5;
		});
		
		it("should be drawn with a size relative to the axisMaximumValue", function() {
			var expectedCenter = infographicSize / 2;
			var expectedDiameter = (largestValue / axisMaximumValue) * infographicSize;
			expect(paper.circle).toHaveBeenCalledWith(
				expectedCenter, expectedCenter, expectedDiameter / 2
			);
		});
	}
});
});

paper.canvas.clientWidth