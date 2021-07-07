import {enhanceHtml} from '../src/html-enhancement'
import cheerio from 'cheerio'
import {ASSERTION_ID, CODE_TAG_SELECTOR, EXAMPLE_ID} from '../src/constant'
import fs from 'fs'

test('enhance example add context id', () => {
  const result = enhanceHtml('<p class="example"></p>')
  const $ = cheerio.load(result)
  expect($(CODE_TAG_SELECTOR.EXAMPLE).attr(EXAMPLE_ID)).toBeDefined()
})

test('tag with assertion class in tag with example class', () => {
  const result = enhanceHtml('<span class="assertion" data-expect="equal" data-action="getActivePlayer"></span>')
  const $ = cheerio.load(result)
  expect($(CODE_TAG_SELECTOR.ASSERTION).attr(ASSERTION_ID)).toBeUndefined()
})

test('enhance assertion class add assertion id', () => {
  const result = enhanceHtml('<p class="example"><span class="assertion" data-expect="equal" data-action="getActivePlayer"></span></p>')
  const $ = cheerio.load(result)
  expect($(CODE_TAG_SELECTOR.ASSERTION).attr(ASSERTION_ID)).toBeDefined()
})

test('enhance assertion add sub element', () => {
  const result = enhanceHtml('<p class="example"><span class="assertion" data-expect="equal" data-action="getActivePlayer"></span></p>')
  const $ = cheerio.load(result)
  expect($('.assert-expect')).toBeDefined()
  expect($('.assert-actual')).toBeDefined()
})

test('convert', () => {
  let data = fs.readFileSync('public/example.html', 'utf-8')

  const $ = cheerio.load(data)
  const root = $('.example')
  const codes = convert(root, $)
  console.log(codes)
})

function convert(root, $) {
  const codes = []
  root.children().each(function(index, element) {
    if ($(element).hasClass('variable')) {
      const variableName = $(element).attr('data-name')
      const variableValue = $(element).text().trim()
      codes.push('let ' + variableName + ' = ' + variableValue)
    }
    if ($(element).hasClass('function')) {
      const actionName = $(element).attr('data-action')
      const actionParams = $(element).attr('data-params')
      if(actionParams) {
        const result = convert($(element), $)
        let code = result
          ? 'function ' + actionName + '(){' + result + ';fixture.' + actionName + '(' + actionParams.split(' ') + ')};' + actionName + '()'
          : 'function ' + actionName + '(){fixture.' + actionName + '(' + actionParams.split(' ') + ')};' + actionName + '()'
        codes.push(code)
      } else {
        codes.push('fixture.' + actionName + '()')
      }
    }
    if ($(element).hasClass('assertion')) {
      const actionName = $(element).attr('data-action')
      const actionParams = $(element).attr('data-params')
      if(actionParams) {
        const result = convert($(element), $)
        let code = result
          ? 'function ' + actionName + '(){' + result + ';fixture.' + actionName + '(' + actionParams.split(' ') + ')};let actual = ' + actionName + '()'
          : 'function ' + actionName + '(){fixture.' + actionName + '(' + actionParams.split(' ') + ')};let actual = ' + actionName + '()'
        codes.push(code)
      } else {
        codes.push('let actual = fixture.' + actionName + '()')
      }
      const expectType = $(element).attr('data-expect')
      if (expectType === 'equal') {
        const expectValue = $(element).text().trim()
        codes.push('let expect = ' + expectValue)
        codes.push('let result = actual === expect')
      } else if (expectType === 'true') {
        codes.push('let result = actual === true')
      } else if (expectType === 'false') {
        codes.push('let result = actual === false')
      } else {
        console.log('Error expected type')
      }
      // TODO add style
    }
    // TODO for other node as root
  })
  return codes.join(';')
}