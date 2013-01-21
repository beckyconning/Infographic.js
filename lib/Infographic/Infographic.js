var Infographic = function(paper, values) {
// inheritance
	var self = {};
	var elements = [];
	
// private	
	// validatation
	if(typeof paper === "undefined") {
		return true;
	}

	if(typeof values === "undefined") {
		return true;
	}
	
// public
	self.toString = function() {
		return "[object Infographic]";
	};
	
	self.elements = elements;
			
	self.paperWidth = function() {
		return paper.canvas.clientWidth;
	};
	
	self.paperHeight = function() {
		return paper.canvas.clientHeight;
	};
	
  return self;
};