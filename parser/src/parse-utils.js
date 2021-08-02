const parseVariable = (api, codes) => {
  const variableName = api.getAttr('data-name')
  const variableValue = api.text().trim()
  codes.push(convertVariableCode(variableName, variableValue))
}

const parseFunction = (api, codes, embeddedCode) => {
  const actionName = api.getAttr('data-action')
  const actionParams = api.getAttr('data-params')
  const actionReturn = api.getAttr('data-return')
  codes.push(convertFunctionCode(actionName, actionParams, actionReturn, embeddedCode))
}

const parseAssertion = (api, exampleId, codes, embeddedCode) => {
  const actionName = api.getAttr('data-action')
  const actionParams = api.getAttr('data-params')
  const actionActual = api.getAttr('data-actual')
  codes.push(convertAssertionFunctionCode(actionName, actionParams, actionActual, embeddedCode))
  const expectType = api.getAttr('data-expect')
  const expectValue = api.text().trim()
  codes.push(convertAssertionCode(expectType, expectValue))
  const assertionId = api.getAttr('id')
  codes.push(convertAssertionResultCode(exampleId, assertionId))
}

const convertVariableCode  = (variableName, variableValue) => {
  variableValue = convertValue(variableValue)
  return `var ${variableName} = ${variableValue};`
}

const convertFunctionCode = (actionName, actionParams, actionReturn, embeddedCode) => {
  let returnCode = actionReturn ? `var ${actionReturn} = ` : ''
  if (actionName && actionParams) {
    return embeddedCode
    ? `${returnCode}(function () { ${embeddedCode}return fixture.${actionName}(${actionParams.split(' ')}); })();`
    : `${returnCode}(function () { return fixture.${actionName}(${actionParams.split(' ')}); })();`
  } else if (actionName) {
    return `${returnCode}fixture.${actionName}();`
  }
}

const convertAssertionFunctionCode = (actionName, actionParams, actionActual, embeddedCode) => {
  if (actionActual) {
    return `actual = ${actionActual};`
  } else if (actionName && actionParams) {
    return embeddedCode
      ? `actual = (function () { ${embeddedCode}return fixture.${actionName}(${actionParams.split(' ')}); })();`
      : `actual = (function () { return fixture.${actionName}(${actionParams.split(' ')}); })();`
  } else if (actionName) {
    return `actual = fixture.${actionName}();`
  }
}

const convertAssertionCode = (expectType, expectValue) => {
  if (expectType === 'equal') {
    expectValue = convertValue(expectValue)
    return `expect = ${expectValue};result = actual === expect;`
  } else if (expectType === 'true') {
    return 'result = actual === true;'
  } else if (expectType === 'false') {
    return 'result = actual === false;'
  } else {
    console.log('Error expected type')
  }
}

const convertAssertionResultCode = (exampleId, assertionId) => {
  return `$.getElementById("${assertionId}").addClass(result ? "success" : "error");context["${exampleId}"] = context["${exampleId}"] && result;$.getElementById("${assertionId}").children()[1].setText(actual);`
}

const convertValue = (value) => {
  return isNaN(value) ? '"' + value + '"' : value
}

export default {
  parseVariable,
  parseFunction,
  parseAssertion
}

