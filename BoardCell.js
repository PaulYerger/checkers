function BoardCell(size,i, j) {
	var el = $('<div />'),
		nativeColor = (i%2==0 && j%2!=0) || (i%2!=0 && j%2==0)?BoardCell.strongColor:BoardCell.lightColor;
	el.css({
		'float':'left',
		width:size,
		height:size,
		backgroundColor: nativeColor 
	});
	this.cell = el;
	this.i = i;
	this.j = j;
	//this.nativeColor = nativeColor;
}
BoardCell.prototype.getCell = function(){
	return this.cell;
}
BoardCell.prototype.paintPossibleColor = function(){
    this.cell.css({
        boxShadow: 'inset 0 0 50px #0ffce8'
    });
}
BoardCell.prototype.paintSelectColor = function(){
    this.cell.css({
        boxShadow: 'inset 0 0 50px #0a877d'
    });
}
BoardCell.prototype.paintDeleteColor = function(){
    this.cell.css({
        boxShadow: 'inset 0 0 50px red'
    });
}
BoardCell.prototype.paintNativeColor = function(){
    this.cell.css({
        boxShadow: ''
    });
}
BoardCell.prototype.setChecker = function(checker){
	this.checker = checker;
}
BoardCell.prototype.getChecker = function(){
	return this.checker;
}
BoardCell.prototype.setDeletedCheckers = function(checkers){
    this.deletedCheckers = checkers;
}
BoardCell.prototype.addDeletedChecker = function(checker){
    this.deletedCheckers.push(checker);
}
BoardCell.prototype.getDeletedCheckers = function(){
    return this.deletedCheckers;
}

BoardCell.prototype.cell = null;
BoardCell.prototype.checker = null;
BoardCell.prototype.checker = null;
BoardCell.prototype.i = null;
BoardCell.prototype.j = null;
BoardCell.prototype.nativeColor = null;
BoardCell.prototype.deletedCheckers = []; // for step with delete chekers
BoardCell.lightColor = '#F0B160';
BoardCell.strongColor = '#9D3C01';
