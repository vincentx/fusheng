import {readFileSync} from 'fs'
import {load} from 'cheerio'
import {v4} from 'uuid'
import {exec} from '../src'

test('index.js', () => {
  // init $, fixture, context
  const html = readFileSync('public/example.html', 'utf-8')
  const $ = load(html)
  const script = exec($, v4)
  const context = {
    result: {}
  }
  const fixture = defaultFixture()
  let actualPlayers
  fixture.newGame = function(players) {
    actualPlayers = players
  }
  execute(script, $, context, fixture)
  expect(actualPlayers).toBe('A,B,C')
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
