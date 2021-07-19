import {readFileSync} from 'fs'
import {exec} from '../src'
import {load} from "../src/sandbox";
import {uuid} from "../src/sandbox";

test('test generated script', () => {
  // init $, fixture, context
  const html = readFileSync('public/example.html', 'utf-8')
  const $ = load(html)
  const script = exec($, uuid())
  const context = {}
  const fixture = defaultFixture()
  let actualPlayers
  let actualMinWager
  let actualRaiseWager
  fixture.newGame = function(players) {
    actualPlayers = players
  }
  fixture.setMinWager = function (minWager) {
    actualMinWager = minWager
  }
  fixture.raise = function (wager) {
    actualRaiseWager = wager
  }
  $.getElementsByClassName('example').each((index, element) => {
    const uuid = $.getAttr($.wrapElement(element), 'id')
    execute(script[uuid], $, context, fixture)
    expect(actualPlayers).toBe('A,B,C')
    expect(actualMinWager).toBe(3)
    expect(actualRaiseWager).toBe(5)
  })
})

function execute(script, $, context, fixture) {
  eval(script)
}

function defaultFixture() {
  return {
    newGame: function (players) {
      console.log(players)
    },
    setMinWager: function (min) {

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
