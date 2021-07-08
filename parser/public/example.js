let expect;
let actual;
let result;
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
actual = fixture.getPot();
expect = 0;
result = actual === expect;
$("#aabf10fe-4f70-4552-8860-b2c41b479d31").find(".assert-expect").addClass(result ? "success" : "error");
$("#aabf10fe-4f70-4552-8860-b2c41b479d31").find(".assert-actual").addClass(result ? "success" : "error");
actual = fixture.getActivePlayer();
expect = "A";result = actual === expect;
$("#d64e9d99-ccee-4ea9-bd89-bd085113fd79").find(".assert-expect").addClass(result ? "success" : "error");
$("#d64e9d99-ccee-4ea9-bd89-bd085113fd79").find(".assert-actual").addClass(result ? "success" : "error");
fixture.bet();
actual = fixture.getActivePlayer();
expect = "B";
result = actual === expect;
$("#4dadfef3-6437-41bd-9a3f-0b60e170109c").find(".assert-expect").addClass(result ? "success" : "error");
$("#4dadfef3-6437-41bd-9a3f-0b60e170109c").find(".assert-actual").addClass(result ? "success" : "error");
fixture.bet();
actual = fixture.getActivePlayer();
expect = "C";
result = actual === expect;
$("#5cacaf80-6d39-482d-bfba-72751c7ad034").find(".assert-expect").addClass(result ? "success" : "error");
$("#5cacaf80-6d39-482d-bfba-72751c7ad034").find(".assert-actual").addClass(result ? "success" : "error");
function raise(){
    let wager = 5;
    fixture.raise(wager)
}
raise();
actual = fixture.getPot();
expect = 11;
result = actual === expect;
$("#2b7f7039-5186-4d88-85e1-ae50f58b1584").find(".assert-expect").addClass(result ? "success" : "error");
$("#2b7f7039-5186-4d88-85e1-ae50f58b1584").find(".assert-actual").addClass(result ? "success" : "error")
