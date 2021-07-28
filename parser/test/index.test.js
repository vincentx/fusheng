import {generatedScript, $, uuid} from '../src'

test('test generated script', () => {
  // init fixture, context
  const fixture = defaultFixture()
  const context = {}

  let actualPlayers
  let actualMinWager
  let actualRaiseWager
  let actualPot
  let actualActivePlayer

  fixture.newGame = function(players) {
    actualPlayers = players
  }
  fixture.setMinWager = function (minWager) {
    actualMinWager = minWager
  }
  fixture.raise = function (wager) {
    actualRaiseWager = wager
  }
  fixture.getPot = function () {
    actualPot = 1
  }
  fixture.getActivePlayer = function () {
    actualActivePlayer = 'A'
  }

  // test execute generated script for each example
  $.getElementsByClassName('example').forEach(api => {
    const id = api.getAttr('id')
    execute(generatedScript[id], api, uuid, fixture, context)

    expect(actualPlayers).toBe('A,B,C')
    expect(actualMinWager).toBe(3)
    expect(actualRaiseWager).toBe(5)
    expect(actualPot).toBe(1)
    expect(actualActivePlayer).toBe('A')
  })
})

function execute(script, $, uuid, fixture, context) {
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
