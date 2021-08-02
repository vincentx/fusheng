import { load } from '../src/sandbox'
import parseUtils from '../src/parse-utils'

test('should convert variable to code in the form of String when the variable value is String', () => {
  const $ = load(`<span class="variable" data-name="players">A,B,C</span>`)
  let node = $.getElementsByClassName('variable')[0]
  let codes = []

  parseUtils.parseVariable(node,codes)

  expect(codes).toEqual(['var players = "A,B,C";'])
});

test('should convert variable to code in the form of number when the variable value is number', () => {
  const $ = load(`<span class="variable" data-name="wager">5</span>`)
  let node = $.getElementsByClassName('variable')[0]
  let codes = []

  parseUtils.parseVariable(node,codes)

  expect(codes).toEqual(['var wager = 5;'])
});

test('should convert function to code when the embeddedCode not exists', () => {
  const $ = load(`<span class="function" data-action="newGame" data-params="players">游戏</span>`)
  let node = $.getElementsByClassName('function')[0]
  let codes = []

  parseUtils.parseFunction(node,codes)

  expect(codes).toEqual(['(function () { return fixture.newGame(players); })();'])
});

test('should convert function to code when the embeddedCode exists', () => {
  const $ = load(`<span class="function" data-action="newGame" data-params="players">游戏</span>`)
  let node = $.getElementsByClassName('function')[0]
  let codes = []

  parseUtils.parseFunction(node,codes,'var players = "A,B,C";')

  expect(codes).toEqual(['(function () { var players = "A,B,C";return fixture.newGame(players); })();'])
});

test('should convert function to code when the data-return is defined', () => {
  const $ = load(`<span class="function" data-action="newGame" data-params="players" data-return="game">游戏</span>`)
  let node = $.getElementsByClassName('function')[0]
  let codes = []

  parseUtils.parseFunction(node, codes)

  expect(codes).toEqual(['var game = (function () { return fixture.newGame(players); })();'])
})

test('should convert assertion to code when the data-actual is defined', () => {
  const $ = load(`
    <span class="assertion" data-expect="equal" data-actual="3" id="123">
      <span class="assert-expect">0</span> 
      <span class="assert-actual"></span>
    </span>
  `)
  let node = $.getElementsByClassName('assertion')[0]
  let codes = []

  parseUtils.parseAssertion(node,'01', codes)

  expect(codes).toEqual([
    'actual = 3;',
    'expect = 0;result = actual === expect;',
    '$.getElementById("123").addClass(result ? "success" : "error");context["01"] = context["01"] && result;$.getElementById("123").children()[1].setText(actual);',
  ])
})

test('should convert assertion to code when the embeddedCode not exists', () => {
  const $ = load(`
    <span class="assertion" data-expect="equal" data-action="getPot" data-params="currentPlayer" id="123">
      <span class="assert-expect">0</span> 
      <span class="assert-actual"></span>
    </span>
  `)

  let node = $.getElementsByClassName('assertion')[0]
  let codes = []

  parseUtils.parseAssertion(node,'01', codes)

  expect(codes).toEqual([
    'actual = (function () { return fixture.getPot(currentPlayer); })();',
    'expect = 0;result = actual === expect;',
    '$.getElementById("123").addClass(result ? "success" : "error");context["01"] = context["01"] && result;$.getElementById("123").children()[1].setText(actual);',
  ])
})

test('should convert assertion to code when the embeddedCode exists', () => {
  const $ = load(`
    <span class="assertion" data-expect="equal" data-action="getPot" data-params="currentPlayer" id="123">
      <span class="assert-expect">0</span> 
      <span class="assert-actual"></span>
    </span>
  `)

  let node = $.getElementsByClassName('assertion')[0]
  let codes = []

  parseUtils.parseAssertion(node,'01', codes, 'var currentPlayer = "A";')

  expect(codes).toEqual([
    'actual = (function () { var currentPlayer = "A";return fixture.getPot(currentPlayer); })();',
    'expect = 0;result = actual === expect;',
    '$.getElementById("123").addClass(result ? "success" : "error");context["01"] = context["01"] && result;$.getElementById("123").children()[1].setText(actual);',
  ])
})

test('should convert assertion to code for assert-equal', () => {
  const $ = load(`
    <span class="assertion" data-expect="equal" data-action="getPot" id="123">
      <span class="assert-expect">0</span> 
      <span class="assert-actual"></span>
    </span>
  `)
  let node = $.getElementsByClassName('assertion')[0]
  let codes = []

  parseUtils.parseAssertion(node,'01', codes)

  expect(codes).toEqual([
    'actual = fixture.getPot();',
    'expect = 0;result = actual === expect;',
    '$.getElementById("123").addClass(result ? "success" : "error");context["01"] = context["01"] && result;$.getElementById("123").children()[1].setText(actual);',
  ])
});

test('should convert assertion to code for assert-true', () => {
  const $ = load(`
    <span class="assertion" data-expect="true" data-action="goToNextRound" id="123">
      <span class="assert-expect">进入下一轮</span> 
      <span class="assert-actual"></span>
    </span>
  `)
  let node = $.getElementsByClassName('assertion')[0]
  let codes = []

  parseUtils.parseAssertion(node,'01', codes)

  expect(codes).toEqual([
    'actual = fixture.goToNextRound();',
    'result = actual === true;',
    '$.getElementById("123").addClass(result ? "success" : "error");context["01"] = context["01"] && result;$.getElementById("123").children()[1].setText(actual);',
  ])
});

test('should convert assertion to code for assert-false', () => {
  const $ = load(`
    <span class="assertion" data-expect="false" data-action="goToNextRound" id="123">
      <span class="assert-expect">进入下一轮</span> 
      <span class="assert-actual"></span>
    </span>
  `)
  let node = $.getElementsByClassName('assertion')[0]
  let codes = []

  parseUtils.parseAssertion(node,'01', codes)

  expect(codes).toEqual([
    'actual = fixture.goToNextRound();',
    'result = actual === false;',
    '$.getElementById("123").addClass(result ? "success" : "error");context["01"] = context["01"] && result;$.getElementById("123").children()[1].setText(actual);',
  ])
});