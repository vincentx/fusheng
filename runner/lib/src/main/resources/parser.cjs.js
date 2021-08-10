'use strict';

function enhanceTable(api) {
  api.getElementsByTag('table').forEach(function (table) {
    var ths = table.getElementsByTag('th');

    var _loop = function _loop(i) {
      var attributes = ths[i].getAttributes();
      var tds = table.getElementsByTag('td');

      var _loop2 = function _loop2(j) {
        if (j % ths.length === i) {
          attributes.forEach(function (attribute) {
            tds[j].setAttr(attribute.name, attribute.value);
          });
        }
      };

      for (var j = 0; j < tds.length; j++) {
        _loop2(j);
      }

      ths[i].removeAttributes();
    };

    for (var i = 0; i < ths.length; i++) {
      _loop(i);
    }
  });
}

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
    element.append("<span class=\"assert-actual\"></span>");
  });
}

function enhanceStyle(api) {
  api.getElementsByTag('head')[0].append("\n    <style>\n      .success {\n          background-color: #afa;\n      }\n      .success .assert-actual {\n          display: none;\n      }\n      .error {\n          background-color: #ffb0b0;\n          padding: 1px;\n      }\n      .error .assert-expect {\n          text-decoration: line-through;\n          color: #bb5050;\n          margin-right: 5px;\n      }\n    </style>\n  ");
}

var enhance = function enhance(api, uuid) {
  enhanceTable(api);
  enhanceContentId(api, uuid);
  enhanceAssertion(api, uuid);
  enhanceStyle(api);
};

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var parse = function parse(api, id, parseUtils, codes, assertionPresetCodes) {
  codes = codes || [];
  assertionPresetCodes = assertionPresetCodes || [];
  api.children().forEach(function (_api) {
    if (_api.hasClass('variable')) {
      parseUtils.parseVariable(_api, codes);
    } else if (_api.hasClass('function')) {
      var embeddedCode = parse(_api, id, parseUtils, [], assertionPresetCodes);
      parseUtils.parseFunction(_api, codes, embeddedCode);
    } else if (_api.hasClass('assertion')) {
      var _codes;

      (_codes = codes).push.apply(_codes, _toConsumableArray(assertionPresetCodes));

      var _embeddedCode = parse(_api, id, parseUtils, [], assertionPresetCodes);

      parseUtils.parseAssertion(_api, id, codes, _embeddedCode);
    } else if (_api.hasClass('row-function')) {
      var rowCodes = [];
      parseUtils.parseFunction(_api, rowCodes, '');
      parse(_api, id, parseUtils, codes, rowCodes);
    } else {
      parse(_api, id, parseUtils, codes, assertionPresetCodes);
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
  var actionReturn = api.getAttr('data-return');
  codes.push(convertFunctionCode(actionName, actionParams, actionReturn, embeddedCode));
};

var parseAssertion = function parseAssertion(api, exampleId, codes, embeddedCode) {
  var actionName = api.getAttr('data-action');
  var actionParams = api.getAttr('data-params');
  var actionActual = api.getAttr('data-actual');
  codes.push(convertAssertionFunctionCode(actionName, actionParams, actionActual, embeddedCode));
  var expectType = api.getAttr('data-expect');
  var expectValue = api.text().trim();
  codes.push(convertAssertionCode(expectType, expectValue));
  var assertionId = api.getAttr('id');
  codes.push(convertAssertionResultCode(exampleId, assertionId));
};

var convertVariableCode = function convertVariableCode(variableName, variableValue) {
  variableValue = convertValue(variableValue);
  return "var ".concat(variableName, " = ").concat(variableValue, ";");
};

var convertFunctionCode = function convertFunctionCode(actionName, actionParams, actionReturn, embeddedCode) {
  var returnCode = actionReturn ? "var ".concat(actionReturn, " = ") : '';

  if (actionName && actionParams) {
    return embeddedCode ? "".concat(returnCode, "(function () { ").concat(embeddedCode, "return fixture.").concat(actionName, "(").concat(actionParams.split(' '), "); })();") : "".concat(returnCode, "(function () { return fixture.").concat(actionName, "(").concat(actionParams.split(' '), "); })();");
  } else if (actionName) {
    return "".concat(returnCode, "fixture.").concat(actionName, "();");
  }
};

var convertAssertionFunctionCode = function convertAssertionFunctionCode(actionName, actionParams, actionActual, embeddedCode) {
  if (actionActual) {
    return "actual = ".concat(actionActual, ";");
  } else if (actionName && actionParams) {
    return embeddedCode ? "actual = (function () { ".concat(embeddedCode, "return fixture.").concat(actionName, "(").concat(actionParams.split(' '), "); })();") : "actual = (function () { return fixture.".concat(actionName, "(").concat(actionParams.split(' '), "); })();");
  } else if (actionName) {
    return "actual = fixture.".concat(actionName, "();");
  }
};

var convertAssertionCode = function convertAssertionCode(expectType, expectValue) {
  if (expectType === 'equal') {
    expectValue = convertValue(expectValue);
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
  return "$.getElementById(\"".concat(assertionId, "\").addClass(result ? \"success\" : \"error\");context[\"").concat(exampleId, "\"] = context[\"").concat(exampleId, "\"] && result;$.getElementById(\"").concat(assertionId, "\").children()[1].setText(actual);");
};

var convertValue = function convertValue(value) {
  return isNaN(value) ? '"' + value + '"' : value;
};

var parseUtils = {
  parseVariable: parseVariable,
  parseFunction: parseFunction,
  parseAssertion: parseAssertion
};

function getJsCode() {
  enhance($, uuid);
  var script = {};
  $.getElementsByClassName('example').forEach(function (api) {
    var id = api.getAttr('id');
    var initCodes = ["var expect;var actual;var result;context[\"".concat(id, "\"] = true;")];
    script[id] = parse(api, id, parseUtils, initCodes);
  });
  return script;
}

