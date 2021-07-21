'use strict';

function enhanceContentId(api, uuid) {
  api.getElementsByClassName('example').forEach(function (element) {
    element.setAttr('id', uuid());
  });
}

function enhanceAssertion(api, uuid) {
  api.getElementsByClassName('assertion').forEach(function (element) {
    var expectValue = element.text().trim();
    element.empty();
    element.setAttr('id', uuid());
    element.append("<span class=\"assert-expect\">".concat(expectValue, "</span>"));
    element.append('<span class="assert-actual"></span>');
  });
}

function enhanceStyle(api) {
  api.getElementsByTag('html')[0].append("\n    <style>\n      .success {\n          background-color: #afa;\n      }\n      .success .assert-actual {\n          display: none;\n      }\n      .error {\n          background-color: #ffb0b0;\n          padding: 1px;\n      }\n      .error .assert-expect {\n          text-decoration: line-through;\n          color: #bb5050;\n          margin-right: 5px;\n      }\n    </style>\n  ");
}

var enhance = function enhance(api, uuid) {
  enhanceContentId(api, uuid);
  enhanceAssertion(api, uuid);
  enhanceStyle(api);
};

var parse = function parse(api, id, parseUtils, codes) {
  codes = codes || [];
  api.children().forEach(function (_api) {
    if (_api.hasClass('variable')) {
      parseUtils.parseVariable(_api, codes);
    } else if (_api.hasClass('function')) {
      var embeddedCode = parse(_api, id, parseUtils);
      parseUtils.parseFunction(_api, codes, embeddedCode);
    } else if (_api.hasClass('assertion')) {
      var _embeddedCode = parse(_api, id, parseUtils);

      parseUtils.parseAssertion(_api, id, codes, _embeddedCode);
    } else {
      parse(_api, id, parseUtils, codes);
    }
  });
  return codes.join('');
};

var parseVariable = function parseVariable(api, codes) {
  var variableName = api.getAttr('data-name');
  var variableValue = api.text().trim();
  codes.push(convertVariableCode(variableName, variableValue));
};

var parseFunction = function parseFunction(api, codes, embeddedCode) {
  var actionName = api.getAttr('data-action');
  var actionParams = api.getAttr('data-params');
  codes.push(convertFunctionCode(actionName, actionParams, embeddedCode));
};

var parseAssertion = function parseAssertion(api, exampleId, codes, embeddedCode) {
  var actionName = api.getAttr('data-action');
  var actionParams = api.getAttr('data-params');
  codes.push(convertAssertionFunctionCode(actionName, actionParams, embeddedCode));
  var expectType = api.getAttr('data-expect');
  var expectValue = api.text().trim();
  codes.push(convertAssertionCode(expectType, expectValue));
  var assertionId = api.getAttr('id');
  codes.push(convertAssertionResultCode(exampleId, assertionId));
};

var convertVariableCode = function convertVariableCode(variableName, variableValue) {
  variableValue = isNaN(variableValue) ? '"' + variableValue + '"' : variableValue;
  return "let ".concat(variableName, " = ").concat(variableValue, ";");
};

var convertFunctionCode = function convertFunctionCode(actionName, actionParams, embeddedCode) {
  if (actionParams) {
    return embeddedCode ? "(function () { ".concat(embeddedCode, "fixture.").concat(actionName, "(").concat(actionParams.split(' '), "); })();") : "(function () { fixture.".concat(actionName, "(").concat(actionParams.split(' '), "); })();");
  } else {
    return "fixture.".concat(actionName, "();");
  }
};

var convertAssertionFunctionCode = function convertAssertionFunctionCode(actionName, actionParams, embeddedCode) {
  if (actionParams) {
    return embeddedCode ? "actual = (function () { ".concat(embeddedCode, "fixture.").concat(actionName, "(").concat(actionParams.split(' '), "); })();") : "actual = (function () { fixture.".concat(actionName, "(").concat(actionParams.split(' '), "); })();");
  } else {
    return "actual = fixture.".concat(actionName, "();");
  }
};

var convertAssertionCode = function convertAssertionCode(expectType, expectValue) {
  if (expectType === 'equal') {
    expectValue = isNaN(expectValue) ? '"' + expectValue + '"' : expectValue;
    return "expect = ".concat(expectValue, ";result = actual === expect;");
  } else if (expectType === 'true') {
    return 'result = actual === true;';
  } else if (expectType === 'false') {
    return 'result = actual === false;';
  } else {
    console.log('Error expected type');
  }
};

var convertAssertionResultCode = function convertAssertionResultCode(exampleId, assertionId) {
  return "$.getElementById(\"".concat(assertionId, "\").addClass(result ? \"success\" : \"error\");context[\"").concat(exampleId, "\"] = context[\"").concat(exampleId, "\"] && result;");
};

var parseUtils = {
  parseVariable: parseVariable,
  parseFunction: parseFunction,
  parseAssertion: parseAssertion
};

function getJsCode() {
  enhance($, uuid());
  var script = {};
  $.getElementsByClassName('example').forEach(function (_api) {
    var id = _api.getAttr('id');

    var initCodes = ["let expect;let actual;let result;context[\"".concat(id, "\"] = true;")];
    script[id] = parse(_api, id, parseUtils, initCodes);
  });
  return script;
}
