import fs from 'fs';
import { getJSCodeAndDomJSON } from '../src';

test('demo.html', () => {
  let html = fs.readFileSync('public/demo.html');
  let result = getJSCodeAndDomJSON(html);

  let contextIds = Object.keys(result.jsCode);
  expect(contextIds.length).toBe(2);

  let script = result.jsCode[contextIds[0]];
  let fixture = defaultFixture();
  let actualPlayers= "";
  fixture.newGame = function(players) {
    actualPlayers = players;
  }

  function f(html) {
    console.log("f" + html);
  }

  function a(html) {
    console.log("a" + html);
  }

  function  v(html) {
    console.log("v" + html);
  }
  let con = converter(f, v, a);

  con("html");

  run(script, {}, fixture);
  expect(actualPlayers).toBe("A,B,C");
});

function defaultFixture() {
  return {
    newGame: function (players) {
      console.log(players);
    },
    setMinWager: function (min) {
      console.log(min);
    },
    getPot: function() {

    },
    bet: function () {

    },
    getActivePlayer: function () {

    },
    raise: function(raise) {

    }
  }
}


function converter(fun, variable, assertation) {
  return function(html) {
    fun(html);
    variable(html);
    assertation(html);
  }
}

function run(script, context, fixture) {
  function newGame (players) {
    console.log(players);
  }

  eval(script);
}
