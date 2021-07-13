import { load } from 'cheerio'
import parseUtils from '../src/parse-utils'

test('shoulr convert varable to code in the form of String when the variableValue is String', () => {
  
  const $ = load(`
    <p class="example">
      <span class="variable" data-name="players">A,B,C</span>
    </p>
  `)

  let node = {}
  $('.variable').each(function (index, element) {
    node = $(element)
  })
  let codes = []
  parseUtils.parseVariable(node,codes)
  expect(codes[0]).toBe('let players = "A,B,C";')
});

test('shoulr convert varable to code in the form of number when the variableValue is number', () => {
  
  const $ = load(`
    <p class="example">
      <span class="variable" data-name="wager">5</span>
    </p>
  `)

  let node = {}
  $('.variable').each(function (index, element) {
    node = $(element)
  })
  let codes = []
  parseUtils.parseVariable(node,codes)
  expect(codes[0]).toBe('let wager = 5;')
});

test('shoulr convert function to code when the embeddedCode not exists', () => {
  
  const $ = load(`
    <p class="example">
      <span class="function" data-action="newGame" data-params="players">游戏</span>
    </p>
  `)

  let node = {}
  $('.function').each(function (index, element) {
    node = $(element)
  })
  let codes = []
  parseUtils.parseFunction(node,codes)
  expect(codes[0]).toBe('(function () { fixture.newGame(players); })();')
});

test('shoulr convert function to code when the embeddedCode exists', () => {
  
  const $ = load(`
    <p class="example">
      <span class="function" data-action="newGame" data-params="players">游戏</span>
    </p>
  `)

  let node = {}
  $('.function').each(function (index, element) {
    node = $(element)
  })
  let codes = []
  parseUtils.parseFunction(node,codes,'let players = "A,B,C";')
  expect(codes[0]).toBe('(function () { let players = "A,B,C";fixture.newGame(players); })();')
});

test('shoulr convert assertion to code', () => {
  
  const $ = load(`
    <p class="example">
      <span class="assertion" data-expect="equal" data-action="getPot" id=123>
        <span class="assert-expect">0</span> 
        <span class="assert-actual"></span>
      </span>
    </p>
  `)

  let node = {}
  $('.assertion').each(function (index, element) {
    node = $(element)
  })
  let codes = []
  parseUtils.parseAssertion(node,3333,codes)
  console.log(codes)
  expect(codes[0]).toBe('actual = fixture.getPot();')
  expect(codes[1]).toBe('expect = 0;result = actual === expect;')
  expect(codes[2]).toBe('$("#123").addClass(result ? "success" : "error");context["3333"] = context["3333"] && result;')
});