function CheckersGame() {
    var gamePanel = $('<div/>');
    gamePanel.css({
        width: 1000,
        height: 600,
        padding: 5,
        backgroundImage: 'url("resources/img/wood.jpg")',
        backgroundRepeat: 'repeat',
        position: 'relative'
    });
    this.el = gamePanel;
    var board = new Board(this);
    //test
    var mainDiv = $('<div/>').css({
        position:'absolute',
        top:0,
        right:0,
        margin:10
    }).appendTo(gamePanel);
    var checkDiv = $('<div/>').appendTo(mainDiv);
    var check = $('<input/>', {
        type: 'checkbox',
        id: 'cb1',
        value: 'paint'
    }).change(function(){
                board.setAddCheckersMode($(this).is(':checked'), $('input[name="group1"]:checked').val())
        }).appendTo(checkDiv);
    var checkLabel = $('<label/>', {
        text: 'Paint checkers'
    }).appendTo(checkDiv);
    mainDiv.append($('<br/>'));
    var topTeamRadio = $('<input/>',{
        type:'radio',
        name:'group1',
        checked: true,
        value:0
    }).appendTo(mainDiv);
    var topRadioLabel = $('<label/>', {
        text: 'Add to top team'
    }).appendTo(mainDiv);
    mainDiv.append($('<br/>'));
    var bottomTeamRadio = $('<input/>',{
        type:'radio',
        name:'group1',
        value: 1
    }).appendTo(mainDiv);
    var bottomRadioLabel = $('<label/>', {
        text: 'Add to bottom team'
    }).appendTo(mainDiv);



}
CheckersGame.prototype.getEl = function () {
    return this.el;
}
CheckersGame.prototype.endStep = function () {
    this.curPlayer = !this.curPlayer;
}
CheckersGame.prototype.el = null;
CheckersGame.prototype.players = [];       // 0 and 1
CheckersGame.prototype.curPlayer = 0; // 1 or 2
CheckersGame.prototype.curStep = 0;
