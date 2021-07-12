const parseVariable = (node, codes) => {
  const variableName = node.attr('data-name')
  const variableValue = node.text().trim()
  codes.push(convertVariableCode(variableName, variableValue))
}

const parseFunction = (node, codes, embeddedCode) => {
  const actionName = node.attr('data-action')
  const actionParams = node.attr('data-params')
  codes.push(convertFunctionCode(actionName, actionParams, embeddedCode))
}

const parseAssertion = (node, exampleId, codes, embeddedCode) => {
  const actionName = node.attr('data-action')
  const actionParams = node.attr('data-params')
  codes.push(convertAssertionFunctionCode(actionName, actionParams, embeddedCode))
  const expectType = node.attr('data-expect')
  const expectValue = node.text().trim()
  codes.push(convertAssertionCode(expectType, expectValue))
  const assertionId = node.attr('id')
  codes.push(convertAssertionResultCode(exampleId, assertionId))
}

const convertVariableCode  = (variableName, variableValue) => {
  variableValue = isNaN(variableValue) ? '"' + variableValue + '"' : variableValue
  return `let ${variableName} = ${variableValue};`
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
  return `$("#${assertionId}").addClass(result ? "success" : "error");context["${exampleId}"] = context["${exampleId}"] && result;`
}

export default {
  parseVariable,
  parseFunction,
  parseAssertion
}

