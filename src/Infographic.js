var Infographic = function(paperRaphael) {
// inheritance
	var self = {};
	var elements = [];
	
// private
	var paper;
	
	// validatation
	if(typeof paperRaphael === "undefined") {
		return true;
	}
	else {
		paper = paperRaphael;
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