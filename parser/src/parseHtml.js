import cheerio from 'cheerio'
import { findIndex } from 'lodash';

export default (data) => {
  const $ = cheerio.load(data)

  let executable_codes = {}
  $('.example').each(function (exampleIndex, example) {
    enhanceExampleTag($, exampleIndex, example)

    let codes = [`var context = {};`]
    let exampleVariables = []
    $(example).find('span').each(function (index, el) {
      if ($(el).hasClass('variable') && !$(el).parent().hasClass('function')) {
        codes.push(convertCodeForVariable($, el, exampleVariables))
      } else if ($(el).hasClass('function')) {
        codes.push(convertCodeForFunction($, el))
      } else if ($(el).hasClass('assertion')) {
        enhanceAssertionTag($, index, el)
        codes = codes.concat(convertCodeForAssertion($, index, el))
      } else {
        console.error('未指定声明类型')
      }
    })
    executable_codes[exampleIndex] = codes
  })

  addStyle($)

  // console.log($.html())
  console.log(executable_codes)
}

const convertCodeForVariable = ($, variable, variables) => {
  let code
  const variableName = $(variable).attr('data-name')
  const variableValue = $(variable).text()
  if (variables.includes(variableName)) {
    code = `${ variableName } = "${ variableValue }";`
  } else {
    variables.push(variableName)
    code = `var ${ variableName } = "${ variableValue }";`
  }
  return code
}

const convertCodeForFunction = ($, func) => {
  let code
  const functionName = $(func).attr('data-action')
  const functionParams = $(func).attr('data-params')
  if (functionParams) {
    let paramArray = functionParams.split(' ')
    $(func).find('span.variable').each(function (index, variable) {
      const variableName = $(variable).attr('data-name')
      const variableValue = $(variable).text()
      const paramIndex = findIndex(paramArray, (paramName) => paramName === variableName)
      if (paramIndex >= 0) {
        paramArray[paramIndex] = `"${variableValue}"`
      }
    })
    code = `${functionName}(${paramArray.join(', ')});`
  } else {
    code = `${functionName}();`
  }
  return code
}

const convertCodeForAssertion = ($, index, assertion) => {
  let code = []
  const expectType = $(assertion).attr('data-expect')
  if (expectType === 'equal') {
    const expectValue = $(assertion).text()
    code.push(`context["${index}"].expect = "${expectValue}";`)
  } else if (expectType === 'true') {
    code.push(`context["${index}"].expect = true;`)
  } else if (expectType === 'false') {
    code.push(`context["${index}"].expect = false;`)
  } else {
    console.error('目前仅支持assert-equal，assert-true，assert-false')
  }

  const codeForFunction = convertCodeForFunction($, assertion)
  code.push(`context["${index}"].actual = ${codeForFunction}`)
  code.push(`context["${index}"].result = context["${index}"].actual === context["${index}"].expect;`)
  return code
}

const enhanceExampleTag = ($, index, example) => {
  $(example).attr('ctxId', index.toString())
}

const enhanceAssertionTag = ($, index, assertion) => {
  $(assertion).attr('data-id', index.toString())
  const text = $(assertion).text()
  $(assertion).text('')
  $(assertion).append(`<span class="assert-expect">${text}</span>`)
  $(assertion).append(`<span class='assert-actual'></span>`)
}

const addStyle = ($) => {
  $.root().append(`
    <style>
      .success {
          background-color: #afa;
      }
      .success .assert-actual {
          display: none;
      }
      .error {
          background-color: #ffb0b0;
          padding: 1px;
      }
      .error .assert-expect {
          text-decoration: line-through;
          color: #bb5050;
          margin-right: 5px;
      }
    </style>
  `)
}
