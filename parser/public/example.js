let players = "A,B,C";

function newGame() {
    fixture.newGame(players)
}

newGame();

function setMinWager() {
    let minWager = 3;
    fixture.setMinWager(minWager)
}

setMinWager();
var actual = fixture.getPot();
var expect = 0;
var result = actual === expect;
var actual = fixture.getActivePlayer();
var expect = "A";
var result = actual === expect;
fixture.bet();
var actual = fixture.getActivePlayer();
var expect = "B";
var result = actual === expect;
fixture.bet();
var actual = fixture.getActivePlayer();
var expect = "C";
var result = actual === expect;

function raise() {
    let wager = 5;
    fixture.raise(wager)
}

raise();
var actual = fixture.getPot();
var expect = 11;
var result = actual === expect
