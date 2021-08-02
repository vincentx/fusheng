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
  let splitName

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
  fixture.split = function (fullName) {
    splitName = 'split name'
    return {
      firstName: 'first name',
      lastName: 'last name',
    }
  }

  const examples = $.getElementsByClassName('example')
  // test execute generated script for normal example
  const example1 = examples[0]
  const example1_id = example1.getAttr('id')
  execute(generatedScript[example1_id], example1, uuid, fixture, context)
  expect(actualPlayers).toBe('A,B,C')
  expect(actualMinWager).toBe(3)
  expect(actualRaiseWager).toBe(5)
  expect(actualPot).toBe(1)
  expect(actualActivePlayer).toBe('A')

  // test execute generated script for table example
  const example2 = examples[1]
  const example2_id = example2.getAttr('id')
  execute(generatedScript[example2_id], example2, uuid, fixture, context)
  expect(splitName).toBe('split name')
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

    },
    split: function (fullName) {

    }
  }
}
