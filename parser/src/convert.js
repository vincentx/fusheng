export const convertVariableCode = (variableName, variableValue) => {
  variableValue = isNaN(variableValue) ? '"' + variableValue + '"' : variableValue
  return 'let ' + variableName + ' = ' + variableValue
}

export const convertFunctionCode = (actionName, actionParams, embeddedConvertedCode) => {
  if (actionParams) {
    return embeddedConvertedCode
      ? '(function (){' + embeddedConvertedCode + ';fixture.' + actionName + '(' + actionParams.split(' ') + ')})()'
      : '(function (){fixture.' + actionName + '(' + actionParams.split(' ') + ')})()'
  } else {
    return 'fixture.' + actionName + '()'
  }
}

export const convertAssertionFunctionCode = (actionName, actionParams, embeddedConvertedCode) => {
  if (actionParams) {
    return embeddedConvertedCode
      ? 'actual = (function (){' + embeddedConvertedCode + ';fixture.' + actionName + '(' + actionParams.split(' ') + ')})()'
      : 'actual = (function (){fixture.' + actionName + '(' + actionParams.split(' ') + ')})()'
  } else {
    return 'actual = fixture.' + actionName + '()'
  }
}

export const convertAssertionCode = (expectType, expectValue) => {
  if (expectType === 'equal') {
    expectValue = isNaN(expectValue) ? '"' + expectValue + '"' : expectValue
    return 'expect = ' + expectValue + ';result = actual === expect'
  } else if (expectType === 'true') {
    return 'result = actual === true'
  } else if (expectType === 'false') {
    return 'result = actual === false'
  } else {
    console.log('Error expected type')
  }
}

export const convertAssertionResultCode = (uuid) => {
  return '$("#' + uuid + '").find(".assert-expect").addClass(result ? "success" : "error");' +
         '$("#' + uuid + '").find(".assert-actual").addClass(result ? "success" : "error")'
}