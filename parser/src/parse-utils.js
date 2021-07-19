const parseVariable = ($, node, codes) => {
  const variableName = $.getAttr(node, 'data-name')
  const variableValue = $.text(node).trim()
  codes.push(convertVariableCode(variableName, variableValue))
}

const parseFunction = ($, node, codes, embeddedCode) => {
  const actionName = $.getAttr(node, 'data-action')
  const actionParams = $.getAttr(node, 'data-params')
  codes.push(convertFunctionCode(actionName, actionParams, embeddedCode))
}

const parseAssertion = ($, node, exampleId, codes, embeddedCode) => {
  const actionName = $.getAttr(node, 'data-action')
  const actionParams = $.getAttr(node, 'data-params')
  codes.push(convertAssertionFunctionCode(actionName, actionParams, embeddedCode))
  const expectType = $.getAttr(node, 'data-expect')
  const expectValue = $.text(node).trim()
  codes.push(convertAssertionCode(expectType, expectValue))
  const assertionId = $.getAttr(node, 'id')
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
  return `$.addClass($.getElementById("${assertionId}"), result ? "success" : "error");context["${exampleId}"] = context["${exampleId}"] && result;`
}

export default {
  parseVariable,
  parseFunction,
  parseAssertion
}

