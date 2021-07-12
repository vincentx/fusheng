import { load } from 'cheerio'
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
  const root = $('.example')
  const parseUtils = {
    parseVariable: (node, codes) => { codes.push(`variableCode;`) },
    parseFunction: (node, codes, embeddedCode) => { codes.push(`functionCode(){${embeddedCode}};`) },
    parseAssertion: (node, id, codes, embeddedCode) => { codes.push(`assertionCode(){${embeddedCode}};`) },
  }

  const codes = parse($, root, 'id', parseUtils)
  expect(codes).toBe(`variableCode;functionCode(){};assertionCode(){};`)
})

test('parse html depth-first', () => {
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
  const root = $('.example')
  const parseUtils = {
    parseVariable: (node, codes) => { codes.push(`variableCode;`) },
    parseFunction: (node, codes, embeddedCode) => { codes.push(`functionCode(){${embeddedCode}};`) },
    parseAssertion: (node, id, codes, embeddedCode) => { codes.push(`assertionCode(){${embeddedCode}};`) },
  }

  const codes = parse($, root, 'id', parseUtils)
  expect(codes).toBe(`variableCode;functionCode(){variableCode;};assertionCode(){};`)
})
