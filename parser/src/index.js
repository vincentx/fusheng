import 'core-js'
import 'regenerator-runtime/runtime'
import fs from 'fs'
import cheerio from 'cheerio'
import { parse } from './parse'
import {enhance} from './enhance'
import {v4} from 'uuid'
import {
  convertAssertionCode,
  convertAssertionFunctionCode,
  convertAssertionResultCode,
  convertFunctionCode,
  convertVariableCode
} from './convert'
import {
  parseVariable,
  parseFunction,
  parseAssertion
} from './parseUtils'

fs.readFile('public/example.html', 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const $ = cheerio.load(data)
  const script = exec($, v4)
  console.log(script)
})

export const exec = function($, uuid) {
  enhance($, uuid)
  // TODO: 考虑多个example
  const root = $('.example')
  const initCodes = ['let expect;let actual;let result']
  const converts = {
    assertionConverter: {
      convertAssertionCode,
      convertAssertionFunctionCode,
      convertAssertionResultCode
    },
    functionConverter: {
      convertFunctionCode
    },
    variableConverter: {
      convertVariableCode
    }
  }
  const parserUtils = {
    parseVariable: (node, codes) => parseVariable(node, codes, converts),
    parseFunction: (node, codes, embeddedParsedCode) => parseFunction(node, codes, converts, embeddedParsedCode),
    parseAssertion: (node, codes, embeddedParsedCode) => parseAssertion(node, codes, converts, embeddedParsedCode)
  }
  return parse($, root, parserUtils, initCodes)
}
