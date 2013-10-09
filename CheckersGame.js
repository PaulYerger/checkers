function CheckersGame(){
	var gamePanel = $('<div/>');
	gamePanel.css({
		width:1000,
		height:600,
        padding:5,
		backgroundImage: 'url("resources/img/wood.jpg")',
		backgroundRepeat:'repeat'
	});
    this.el = gamePanel;
    var board = new Board(this);

}
CheckersGame.prototype.getEl = function (){
    return this.el;
}
CheckersGame.prototype.endStep = function(){
    this.curPlayer = !this.curPlayer;
}
CheckersGame.prototype.el = null;
CheckersGame.prototype.players = [];       // 0 and 1
CheckersGame.prototype.curPlayer = 0; // 1 or 2
CheckersGame.prototype.curStep = 0;
