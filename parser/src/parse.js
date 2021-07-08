export const parse = ($, root, codeConverts, codes) => {
  codes = codes || []
  root.children().each(function(index, element) {
    let node = $(element)
    if (node.hasClass('variable')) {
      parseVariable(node, codes, codeConverts)
    } else if (node.hasClass('function')) {
      parseFunction($, node, codes, codeConverts)
    } else if (node.hasClass('assertion')) {
      parseAssertion($, node, codes, codeConverts)
    } else {
      parse($, node, codeConverts)
    }
  })
  return codes.join(';')
}

function parseVariable(node, codes, convertCode) {
  const variableName = node.attr('data-name')
  const variableValue = node.text().trim()
  codes.push(convertCode.variable.convertVariableCode(variableName, variableValue))
}

function parseFunction($, node, codes, convertCode) {
  const actionName = node.attr('data-action')
  const actionParams = node.attr('data-params')
  const embeddedConvertedCode = parse($, node, convertCode)
  codes.push(convertCode.action.convertFunctionCode(actionName, actionParams, embeddedConvertedCode))
}

function parseAssertion($, node, codes, convertCode) {
  const actionName = node.attr('data-action')
  const actionParams = node.attr('data-params')
  const embeddedConvertedCode = parse($, node, convertCode)
  codes.push(convertCode.assertion.convertAssertionFunctionCode(actionName, actionParams, embeddedConvertedCode))
  const expectType = node.attr('data-expect')
  const expectValue = node.text().trim()
  codes.push(convertCode.assertion.convertAssertionCode(expectType, expectValue))
  const uuid = node.attr('id')
  codes.push(convertCode.assertion.convertAssertionResultCode(uuid))
}
