export const parse = ($, root, converts, codes) => {
  codes = codes || []
  root.children().each(function(index, element) {
    let node = $(element)
    if (node.hasClass('variable')) {
      parseVariable(node, codes, converts)
    } else if (node.hasClass('function')) {
      const embeddedParsedCode = parse($, node, converts)
      parseFunction(node, codes, converts, embeddedParsedCode)
    } else if (node.hasClass('assertion')) {
      const embeddedConvertedCode = parse($, node, converts)
      parseAssertion(node, codes, converts, embeddedConvertedCode)
    } else {
      parse($, node, converts)
    }
  })
  return codes.join(';')
}

function parseVariable(node, codes, converts) {
  const variableName = node.attr('data-name')
  const variableValue = node.text().trim()
  codes.push(converts.variableConverter.convertVariableCode(variableName, variableValue))
}

function parseFunction(node, codes, converts, embeddedParsedCode) {
  const actionName = node.attr('data-action')
  const actionParams = node.attr('data-params')
  codes.push(converts.functionConverter.convertFunctionCode(actionName, actionParams, embeddedParsedCode))
}

function parseAssertion(node, codes, converts, embeddedParsedCode) {
  const actionName = node.attr('data-action')
  const actionParams = node.attr('data-params')
  codes.push(converts.assertionConverter.convertAssertionFunctionCode(actionName, actionParams, embeddedParsedCode))
  const expectType = node.attr('data-expect')
  const expectValue = node.text().trim()
  codes.push(converts.assertionConverter.convertAssertionCode(expectType, expectValue))
  const uuid = node.attr('id')
  codes.push(converts.assertionConverter.convertAssertionResultCode(uuid))
}
