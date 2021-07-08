export const convertVariableCode = (variableName, variableValue) => {
  variableValue = isNaN(variableValue) ? '"' + variableValue + '"' : variableValue
  return 'let ' + variableName + ' = ' + variableValue
}

export const convertFunctionCode = (actionName, actionParams, embeddedConvertedCode) => {
  if(actionParams) {
    return embeddedConvertedCode
      ? 'function ' + actionName + '(){' + embeddedConvertedCode + ';fixture.' + actionName + '(' + actionParams.split(' ') + ')}' + actionName + '()'
      : 'function ' + actionName + '(){fixture.' + actionName + '(' + actionParams.split(' ') + ')}' + actionName + '()'
  } else {
    return 'fixture.' + actionName + '()'
  }
}

export const convertAssertionFunctionCode = (actionName, actionParams, embeddedConvertedCode) => {
  if(actionParams) {
    return embeddedConvertedCode
      ? 'function ' + actionName + '(){' + embeddedConvertedCode + ';fixture.' + actionName + '(' + actionParams.split(' ') + ')};var actual = ' + actionName + '()'
      : 'function ' + actionName + '(){fixture.' + actionName + '(' + actionParams.split(' ') + ')};var actual = ' + actionName + '()'
  } else {
    return 'var actual = fixture.' + actionName + '()'
  }
}

export const convertAssertionCode = (expectType, expectValue) => {
  if (expectType === 'equal') {
    expectValue = isNaN(expectValue) ? '"' + expectValue + '"' : expectValue
    return 'var expect = ' + expectValue + ';var result = actual === expect'
  } else if (expectType === 'true') {
    return 'var result = actual === true'
  } else if (expectType === 'false') {
    return 'var result = actual === false'
  } else {
    console.log('Error expected type')
  }
}