Array.prototype.elementsToStrings = function() {
	return this.map(function(e) { return e.toString(); });
}

var tableCellValues = function(table) {
	var cells = table.querySelectorAll('td');
	
	var values = [];
	for(var cellIndex = 0; cellIndex < cells.length; cellIndex ++) {
		values.push(cells[cellIndex].innerHTML);
	};
	return values;
}