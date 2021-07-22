const parseVariable = (api, codes) => {
  const variableName = api.getAttr('data-name')
  const variableValue = api.text().trim()
  codes.push(convertVariableCode(variableName, variableValue))
}

const parseFunction = (api, codes, embeddedCode) => {
  const actionName = api.getAttr('data-action')
  const actionParams = api.getAttr('data-params')
  codes.push(convertFunctionCode(actionName, actionParams, embeddedCode))
}

const parseAssertion = (api, exampleId, codes, embeddedCode) => {
  const actionName = api.getAttr('data-action')
  const actionParams = api.getAttr('data-params')
  codes.push(convertAssertionFunctionCode(actionName, actionParams, embeddedCode))
  const expectType = api.getAttr('data-expect')
  const expectValue = api.text().trim()
  codes.push(convertAssertionCode(expectType, expectValue))
  const assertionId = api.getAttr('id')
  codes.push(convertAssertionResultCode(exampleId, assertionId))
}

const convertVariableCode  = (variableName, variableValue) => {
  variableValue = isNaN(variableValue) ? '"' + variableValue + '"' : variableValue
  return `var ${variableName} = ${variableValue};`
}

const convertFunctionCode = (actionName, actionParams, embeddedCode) => {
  if (actionParams) {
    return embeddedCode
      ? `(function () { ${embeddedCode}fixture.${actionName}(${actionParams.split(' ')}); })();`
      : `(function () { fixture.${actionName}(${actionParams.split(' ')}); })();`
  } else {
    return `fixture.${actionName}();`
  }
}

const convertAssertionFunctionCode = (actionName, actionParams, embeddedCode) => {
  if (actionParams) {
    return embeddedCode
      ? `actual = (function () { ${embeddedCode}fixture.${actionName}(${actionParams.split(' ')}); })();`
      : `actual = (function () { fixture.${actionName}(${actionParams.split(' ')}); })();`
  } else {
    return `actual = fixture.${actionName}();`
  }
}

const convertAssertionCode = (expectType, expectValue) => {
  if (expectType === 'equal') {
    expectValue = isNaN(expectValue) ? '"' + expectValue + '"' : expectValue
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
  return `$.getElementById("${assertionId}").addClass(result ? "success" : "error");context["${exampleId}"] = context["${exampleId}"] && result;`
}

export default {
  parseVariable,
  parseFunction,
  parseAssertion
}

