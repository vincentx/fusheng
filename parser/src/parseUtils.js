export const parseVariable = (node, codes, converts) => {
  const variableName = node.attr('data-name')
  const variableValue = node.text().trim()
  codes.push(converts.variableConverter.convertVariableCode(variableName, variableValue))
}

export const parseFunction = (node, codes, converts, embeddedParsedCode) => {
  const actionName = node.attr('data-action')
  const actionParams = node.attr('data-params')
  codes.push(converts.functionConverter.convertFunctionCode(actionName, actionParams, embeddedParsedCode))
}

export const parseAssertion = (node, codes, converts, embeddedParsedCode) => {
  const actionName = node.attr('data-action')
  const actionParams = node.attr('data-params')
  codes.push(converts.assertionConverter.convertAssertionFunctionCode(actionName, actionParams, embeddedParsedCode))
  const expectType = node.attr('data-expect')
  const expectValue = node.text().trim()
  codes.push(converts.assertionConverter.convertAssertionCode(expectType, expectValue))
  const uuid = node.attr('id')
  codes.push(converts.assertionConverter.convertAssertionResultCode(uuid))
}
