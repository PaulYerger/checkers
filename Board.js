Board.prototype.cells = [];
Board.prototype.cellSize = null;
Board.prototype.BOARD_NUMBER = 8;
Board.prototype.changedCells = [];
Board.prototype.curChecker = null;
Board.prototype.game = null;

function Board(parent) {
    var thisCmp = this;
    //
    this.game = parent;
    //
    var parentEl = parent.getEl();
    var h = parentEl.height(),
        w = parentEl.width(),
        length = Math.min(h, w),
        board = $('<div />'),
        indent = 5,
        borderThickness = 2;
    length = length - (indent + borderThickness) * 3;
    board.css({
        position: 'inherit',
        marginLeft: "auto",
        marginRight: "auto",
        height: length,
        width: length,
        border: borderThickness + 'px solid black'
    });
    this.initBoard(board, length, this);
    $('body').ready(function () {
        thisCmp.initCheckersOfFirst('red');
        thisCmp.initCheckersOfSecond('yellow');
    });

    parentEl.append(board);

    //return this;
}
Board.prototype.initBoard = function (emptyBoard, length) {
    var thisCmp = this;
    var n = this.BOARD_NUMBER;
    thisCmp.cellSize = length / n;
    for (var i = 0; i < n; i++) {
        thisCmp.cells[i] = [];
        for (var j = 0; j < n; j++) {
            var cell = new BoardCell(thisCmp.cellSize, i, j);
            emptyBoard.append(cell.getCell());
            thisCmp.cells[i][j] = cell;
        }
    }
}
Board.prototype.initCheckersOfFirst = function (color) {
    var thisCmp = this;
    for (var i = 0; i < 3; i++) {
        for (var j = 1 - i % 2; j < thisCmp.BOARD_NUMBER; j += 2) {
            var c = new Checker(thisCmp.cellSize, color, 4, 0, thisCmp);
            c.addTo(thisCmp.cells[i][j]);
        }
    }
}
Board.prototype.initCheckersOfSecond = function (color) {
    var thisCmp = this;
    for (var i = thisCmp.BOARD_NUMBER - 1; i > thisCmp.BOARD_NUMBER - 4; i--) {
        for (var j = 1 - i % 2; j < thisCmp.BOARD_NUMBER; j += 2) {
            var c = new Checker(thisCmp.cellSize, color, 4, 1, thisCmp);
            c.addTo(thisCmp.cells[i][j]);
            //c.setKing();
            //cells[i][j].cell.append(c.getEl().css('margin', 2));
        }
    }
}
Board.prototype.selectChecker = function (checker) {
    var thisCmp = this;

    if (this.game.curPlayer == checker.player) {
        if (thisCmp.curChecker == null) {
            var o = thisCmp.getPossibleMoves(checker),
                moves = o.moves,
                deleted = o.deleted;
            thisCmp.changedCells = moves.concat(deleted);
            for (var k = 0; k < moves.length; k++) {
                moves[k].paintPossibleColor();
                thisCmp.setMoveListener(checker, moves[k]);
            }
            for (var k = 0; k < deleted.length; k++) {
                deleted[k].paintDeleteColor();
            }
            checker.curCell.paintSelectColor();
            thisCmp.curChecker = checker;
        } else {
            var a = thisCmp.curChecker;
            thisCmp.blurChecker();
            if (checker != a) {
                this.selectChecker(checker);
            }
        }
    }
}
Board.prototype.setMoveListener = function (checker, newCell) {
    var thisCmp = this;
    newCell.getCell().click(function () {
        thisCmp.moveChecker(checker, newCell);
    });
}
Board.prototype.getPossibleMoves = function (checker) {
    var moves = [];
    var deleted = [];
    var i = checker.curCell.i,
        j = checker.curCell.j;
    var curPlayer = this.game.curPlayer;
    var coef = curPlayer == 0 ? 1 : -1;

    return this.scanNeighbors(i, j, curPlayer, coef, [this.cells[i][j]], []);

}
Board.prototype.scanNeighbors = function (iP, jP, curPlayer, summand, moves, deleted, oldIP, oldJP) {
    //moves.push(this.cells[iP][jP]);
    // проверкка на возможность хода после удостоверения на отсутствие дальнейших удалений
    for (var i = -1; i <= 1; i += 2) {
        for (var j = -1; j <= 1; j += 2) {
            var iA = iP + i;
            var jA = jP + j;
            if (iA >= 0 && iA < this.BOARD_NUMBER &&
                jA >= 0 && jA < this.BOARD_NUMBER) {
                var cell1 = this.cells[iA][jA];
                if (cell1.getChecker() == null) {
                    if (summand == i)
                        moves.push(cell1);
                } else {
                    if (cell1.getChecker().player != curPlayer) {
                        var iAA = iA + i,
                            jAA = jA + j;
                        if (iAA >= 0 && iAA < this.BOARD_NUMBER &&
                            jAA >= 0 && jAA < this.BOARD_NUMBER) {
                            if (this.cells[iAA][jAA].getChecker() == null && (iAA != oldIP || jAA != oldJP)) {
                                deleted.push(cell1);

                                //
                                this.cells[iAA][jAA].setDeletedCheckers(
                                    this.cells[iAA][jAA].getDeletedCheckers().concat(
                                        this.cells[iP][jP].getDeletedCheckers()
                                    ));
                                this.cells[iP][jP].setDeletedCheckers([]);
                                this.cells[iAA][jAA].addDeletedChecker(cell1.getChecker());
                                var oldSize = moves.length;
                                this.scanNeighbors(iAA, jAA, curPlayer, 0, moves, deleted, iP, jP);
                                if(oldSize == moves.length){
                                    moves.push(this.cells[iAA][jAA]);
                                }
                            }
                        }
                    }
                }

            }
        }
    }
    return {
        moves: moves,
        deleted: deleted
    };
}
Board.prototype.restoreChangedCells = function () {
    for (var i = 0; i < this.changedCells.length; i++) {
        this.changedCells[i].paintNativeColor();
        this.changedCells[i].getCell().unbind('click');
        this.changedCells[i].setDeletedCheckers([]);
    }
}
Board.prototype.endStep = function () {
    this.blurChecker();
    this.game.endStep();
}
Board.prototype.blurChecker = function () {
    this.restoreChangedCells();
    this.curChecker = null;
}
Board.prototype.moveChecker = function (checker, newCell) {
    checker.moveTo(newCell);
    var a = newCell.getDeletedCheckers();

    for (var i = 0; i < a.length; i++) {
        a[i].getEl().remove();
        a[i].curCell.setChecker(null);
    }
    this.endStep();
}
