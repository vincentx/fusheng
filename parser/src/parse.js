import {
  convertAssertionCode,
  convertAssertionFunctionCode,
  convertFunctionCode,
  convertVariableCode
} from './convert'

export const parse = ($, root, codeConverts) => {
  const codes = []
  codeConverts = codeConverts || {
    assertion: {
      convertAssertionCode,
      convertAssertionFunctionCode,
    },
    action: {
      convertFunctionCode
    },
    variable: {
      convertVariableCode
    }
  }
  root.children().each(function(index, element) {
    let node = $(element)
    if (node.hasClass('variable')) {
      parseVariable(node, codes, codeConverts.variable)
    } else if (node.hasClass('function')) {
      parseFunction($, node, codes, codeConverts.action)
    } else if (node.hasClass('assertion')) {
      parseAssertion($, node, codes, codeConverts.assertion)
    } else {
      parse($, node, codeConverts)
    }
  })
  return codes.join(';')
}

function parseVariable(node, codes, convertCode) {
  const variableName = node.attr('data-name')
  const variableValue = node.text().trim()
  codes.push(convertCode.convertVariableCode(variableName, variableValue))
}

function parseFunction($, node, codes, convertCode) {
  const actionName = node.attr('data-action')
  const actionParams = node.attr('data-params')
  const embeddedConvertedCode = parse($, node)
  codes.push(convertCode.convertFunctionCode(actionName, actionParams, embeddedConvertedCode))
}

function parseAssertion($, node, codes, convertCode) {
  const actionName = node.attr('data-action')
  const actionParams = node.attr('data-params')
  const embeddedConvertedCode = parse($, node)
  codes.push(convertCode.convertAssertionFunctionCode(actionName, actionParams, embeddedConvertedCode))
  const expectType = node.attr('data-expect')
  const expectValue = node.text().trim()
  codes.push(convertCode.convertAssertionCode(expectType, expectValue))
  // TODO add style
}
