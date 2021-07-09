import 'core-js'
import 'regenerator-runtime/runtime'
import {parse} from './parse'
import fs from 'fs'
import cheerio from 'cheerio'
import {enhance} from './enhance'
import {
  convertAssertionCode,
  convertAssertionFunctionCode,
  convertAssertionResultCode,
  convertFunctionCode, convertVariableCode
} from './convert'

fs.readFile('public/example.html', 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const $ = cheerio.load(data)
  enhance($)
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
  let code = parse($, root, converts, initCodes)
  console.log(code)
})