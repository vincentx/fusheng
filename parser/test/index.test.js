import {generatedScript, $, uuid} from '../src'

test('test generated script', () => {
  // init $, fixture, context
  const script = generatedScript
  const api = $
  const uuidv4 = uuid
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
  fixture.getPot = function () {
    return "1"
  }
  fixture.getActivePlayer = function () {
    return "A"
  }
  api.getElementsByClassName('example').forEach(_api => {
    const id = _api.getAttr('id')
    // console.log(script[id], api, {}, fixture, uuidv4)
    execute(script[id], api, {}, fixture, uuidv4)
    expect(actualPlayers).toBe('A,B,C')
    expect(actualMinWager).toBe(3)
    expect(actualRaiseWager).toBe(5)
    console.log(api.html())
  })
})

function execute(script, $, context, fixture, uuid) {
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
