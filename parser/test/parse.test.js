import { load } from '../src/sandbox'
import { parse } from '../src/parse'

test('parse html sequentially', () => {
  const $ = load(`
    <p class="example">
      现在有玩家
      <span class="variable" data-name="players">A,B,C</span>
      参与
      <span class="function" data-action="newGame" data-params="players">游戏</span>，
      底池金额为
      <span class="assertion" data-expect="equal" data-action="getPot">0</span>。  
    </p>
  `)
  const api = $.getElementsByClassName('example')[0]

  const parseUtils = {
    parseVariable: (node, codes) => { codes.push(`variableCode;`) },
    parseFunction: (node, codes, embeddedCode) => { codes.push(`functionCode(){${embeddedCode}};`) },
    parseAssertion: (node, id, codes, embeddedCode) => { codes.push(`assertionCode(){${embeddedCode}};`) },
  }

  const codes = parse(api, 'id', parseUtils)
  expect(codes).toBe(`variableCode;functionCode(){};assertionCode(){};`)
})

test('parse 2-depth html depth-first', () => {
  const $ = load(`
    <p class="example">
      <span>
        现在有玩家
        <span class="variable" data-name="players">A,B,C</span>
        参与游戏，
      </span>
      <span class="function" data-action="setMinWager" data-params="minWager">
        最小下注金额为<span class="variable" data-name="minWager">3</span>，
      </span>
      <span>
        底池金额为
        <span class="assertion" data-expect="equal" data-action="getPot">0</span>。
      </span>   
    </p>
  `)
  const api = $.getElementsByClassName('example')[0]

  const parseUtils = {
    parseVariable: (node, codes) => { codes.push(`variableCode;`) },
    parseFunction: (node, codes, embeddedCode) => { codes.push(`functionCode(){${embeddedCode}};`) },
    parseAssertion: (node, id, codes, embeddedCode) => { codes.push(`assertionCode(){${embeddedCode}};`) },
  }

  const codes = parse(api, 'id', parseUtils)
  expect(codes).toBe(`variableCode;functionCode(){variableCode;};assertionCode(){};`)
})

test('parse 3-depth html depth-first', () => {
  const $ = load(`
    <p class="example">
      <span>
        现在有玩家
        <span class="variable" data-name="players">A,B,C</span>
        参与游戏，
      </span>
      <span class="function" data-action="setMinWager" data-params="minWager">
        <span>
          最小下注金额为<span class="variable" data-name="minWager">3</span>，
          <span class="function" data-action="setWager" data-params="wager">
            玩家A的筹码数为<span class="variable" data-name="wager">100</span>
          </span>,
        </span>
      </span>
      <span>
        底池金额为
        <span class="assertion" data-expect="equal" data-action="getPot">0</span>。
      </span>   
    </p>
  `)
  const api = $.getElementsByClassName('example')[0]

  const parseUtils = {
    parseVariable: (node, codes) => { codes.push(`variableCode;`) },
    parseFunction: (node, codes, embeddedCode) => { codes.push(`functionCode(){${embeddedCode}};`) },
    parseAssertion: (node, id, codes, embeddedCode) => { codes.push(`assertionCode(){${embeddedCode}};`) },
  }

  const codes = parse(api, 'id', parseUtils)
  expect(codes).toBe(`variableCode;functionCode(){variableCode;functionCode(){variableCode;};};assertionCode(){};`)
})
