function Checker(size, color, indent, player, b) {
	var thisCmp = this;
	size = size - indent*2;
	var checker = $('<canvas height = ' + size + ' width = ' + size + '></canvas>');
    this.board = b;
	checker.click(function(){
        b.selectChecker(thisCmp);
	});
	checker.css('margin', indent);
	var context = checker[0].getContext('2d');
	//
	var variable = size/2;

	context.beginPath();
	context.arc(variable, variable, variable - 2, 0, 2 * Math.PI, false);
	context.fillStyle = color;
	context.fill();
	context.lineWidth = 1;
	context.strokeStyle = 'black';
	context.stroke();
	//
	context.beginPath();
	context.arc(variable, variable, variable/2, 0, 2 * Math.PI, false);
	context.lineWidth = 2;
	context.strokeStyle = 'black';
	context.stroke();
	this.el = checker;
	this.player = player;
	this.size = size;
	this.indent = indent;
	this.color = color;
}
Checker.prototype.getEl = function(){
	return this.el;
}
Checker.prototype.addTo = function(cell){
	var el  = this.el,
	offset = cell.getCell().offset();
	el.css({
		position:'absolute',
		top:offset.top,
		left:offset.left
	});
	cell.getCell().parent().append(el);
	this.changeCellConteiner(cell);
}

Checker.prototype.moveTo = function(cell){
	var el = this.el,
		oldCell = this.curCell,
		newOffSet = cell.getCell().offset();
    var tmp = this.curCell;
    for(var i = 0; i < cell.getDeletedCheckers().length; i++){
        var e = cell.getDeletedCheckers()[i];
        var newI = 2*e.curCell.i - tmp.i;
        var newJ = 2*e.curCell.j - tmp.j;

        var o = this.board.cells[newI][newJ].getCell().offset();
        el.animate({
            top: o.top,
            left:o.left
        }, 300);
        tmp = this.board.cells[newI][newJ];
    }
	el.animate({ 
        top: newOffSet.top,
        left:newOffSet.left
      }, 300);
	this.changeCellConteiner(cell);
}
Checker.prototype.changeCellConteiner = function(newCell){
	if(this.curCell != null)
		this.curCell.setChecker(null);
	
	if(newCell != null)
		newCell.setChecker(this);
	this.curCell = newCell;
}
Checker.prototype.setKing = function(){
	this.king = true;
	var context = this.el[0].getContext('2d');
	var variable = this.size/2;
	context.beginPath();
	context.arc(variable, variable, variable - 2, 0, 2 * Math.PI, false);
	context.fillStyle = this.color;
	context.fill();
	context.lineWidth = 4;
	context.strokeStyle = 'black';
	context.stroke();
}

Checker.prototype.el = null;
Checker.prototype.curCell = null;
Checker.prototype.player = null;
Checker.prototype.king = false;
Checker.prototype.size = null;
Checker.prototype.indent = null;

Checker.prototype.board = null;
Checker.prototype.color = null;

