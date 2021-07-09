import 'core-js'
import 'regenerator-runtime/runtime'
import fs from 'fs'
import cheerio from 'cheerio'
import {parse} from './parse'
import {enhance} from './enhance'
import {v4} from 'uuid'
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
  const script = exec($, v4)
  console.log(script)
})

export const exec = function($, uuid) {
  enhance($, uuid)
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
  return parse($, root, converts, initCodes)
}