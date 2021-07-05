import { convertCodeForAssertion, convertCodeForFunction, convertCodeForVariable } from '../src/utils';
import cheerio from 'cheerio'

test('convert code for a new variable', () => {
  const $ = cheerio.load('<span class="variable" data-name="players">A,B,C</span>')
  const variable = $('span.variable')
  const variables = []
  expect(convertCodeForVariable($, variable, variables)).toEqual('var players = "A,B,C"')
})

test('convert code for a old variable', () => {
  const $ = cheerio.load('<span class="variable" data-name="players">A,B,C</span>')
  const variable = $('span.variable')
  const variables = ['players']
  expect(convertCodeForVariable($, variable, variables)).toEqual('players = "A,B,C"')
})

test('convert code for call function without params', () => {
  const $ = cheerio.load('<span class="function" data-action="bet">下注</span>')
  const func = $('span.function')
  expect(convertCodeForFunction($, func)).toEqual('fixture.bet()')
})

test('convert code for call function with one param', () => {
  const $ = cheerio.load(`
    <span class="function" data-action="setMinWager" data-params="minWager">
      最小下注金额为
      <span class="variable" data-name="minWager">3</span>
    </span>
  `)
  const func = $('span.function')
  expect(convertCodeForFunction($, func)).toEqual('fixture.setMinWager("3")')
})

test('convert code for call function with multiple params', () => {
  const $ = cheerio.load(`
    <span class="function" data-action="raise" data-params="minWager count">
      加注到最小下注金额的
      <span class="variable" data-name="count">2</span>倍
    </span>
  `)
  const func = $('span.function')
  expect(convertCodeForFunction($, func)).toEqual('fixture.raise(minWager, "2")')
})

test('convert code for assert equal', () => {
  const $ = cheerio.load(`
    底池金额为
    <span class="assertion" data-expect="equal" data-action="getPot" assertion-id="0">
      <span class="assert-expect">0</span>
      <span class="assert-actual"></span>
    </span>，
  `)
  const assertion = $('span.assertion')
  const expectResult = [
    'context["0"] = {}',
    'context["0"].expect = "0"',
    'context["0"].actual = fixture.getPot()',
    'context["0"].result = context["0"].actual === context["0"].expect',
  ]
  expect(convertCodeForAssertion($, '0', assertion)).toEqual(expectResult)
})

test('convert code for assert true', () => {
  const $ = cheerio.load(`
    <span class="assertion" data-expect="true" data-action="isCurrentRoundEnd" assertion-id="0">
      <span class="assert-expect">那么当前轮次结束</span>
      <span class="assert-actual"></span>
    </span>。
  `)
  const assertion = $('span.assertion')
  const expectResult = [
    'context["0"] = {}',
    'context["0"].expect = true',
    'context["0"].actual = fixture.isCurrentRoundEnd()',
    'context["0"].result = context["0"].actual === context["0"].expect',
  ]
  expect(convertCodeForAssertion($, '0', assertion)).toEqual(expectResult)
})

test('convert code for assert false', () => {
  const $ = cheerio.load(`
    <span class="assertion" data-expect="false" data-action="isCurrentRoundEnd" assertion-id="0">
      <span class="assert-expect">那么当前轮次没有结束</span>
      <span class="assert-actual"></span>
    </span>。
  `)
  const assertion = $('span.assertion')
  const expectResult = [
    'context["0"] = {}',
    'context["0"].expect = false',
    'context["0"].actual = fixture.isCurrentRoundEnd()',
    'context["0"].result = context["0"].actual === context["0"].expect',
  ]
  expect(convertCodeForAssertion($, '0', assertion)).toEqual(expectResult)
})
