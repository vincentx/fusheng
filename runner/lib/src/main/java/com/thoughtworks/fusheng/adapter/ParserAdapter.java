package com.thoughtworks.fusheng.adapter;

import com.thoughtworks.fusheng.exception.ParserAdapterException;
import com.thoughtworks.fusheng.executor.Executor;
import com.thoughtworks.fusheng.executor.ExecutorFactory;
import com.thoughtworks.fusheng.helper.DomHelperImpl;
import lombok.Setter;
import org.jsoup.nodes.Document;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;

import static java.nio.charset.StandardCharsets.UTF_8;

@Setter
public class ParserAdapter {

    private Executor executor;
    private final String rawParser = "'use strict';\n" +
            "\n" +
            "function enhanceContentId(api, uuid) {\n" +
            "  api.getElementsByClassName('example').forEach(function (element) {\n" +
            "    element.setAttr('id', uuid());\n" +
            "  });\n" +
            "}\n" +
            "\n" +
            "function enhanceAssertion(api, uuid) {\n" +
            "  api.getElementsByClassName('assertion').forEach(function (element) {\n" +
            "    var expectValue = element.text().trim();\n" +
            "    element.empty();\n" +
            "    element.setAttr('id', uuid());\n" +
            "    element.append(\"<span class=\\\"assert-expect\\\">\".concat(expectValue, \"</span>\"));\n" +
            "    element.append(\"<span class=\\\"assert-actual\\\"></span>\");\n" +
            "  });\n" +
            "}\n" +
            "\n" +
            "function enhanceStyle(api) {\n" +
            "  api.getElementsByTag('head')[0].append(\"\\n    <style>\\n      .success {\\n          background-color: #afa;\\n      }\\n      .success .assert-actual {\\n          display: none;\\n      }\\n      .error {\\n          background-color: #ffb0b0;\\n          padding: 1px;\\n      }\\n      .error .assert-expect {\\n          text-decoration: line-through;\\n          color: #bb5050;\\n          margin-right: 5px;\\n      }\\n    </style>\\n  \");\n" +
            "}\n" +
            "\n" +
            "var enhance = function enhance(api, uuid) {\n" +
            "  enhanceContentId(api, uuid);\n" +
            "  enhanceAssertion(api, uuid);\n" +
            "  enhanceStyle(api);\n" +
            "};\n" +
            "\n" +
            "var parse = function parse(api, id, parseUtils, codes) {\n" +
            "  codes = codes || [];\n" +
            "  api.children().forEach(function (_api) {\n" +
            "    if (_api.hasClass('variable')) {\n" +
            "      parseUtils.parseVariable(_api, codes);\n" +
            "    } else if (_api.hasClass('function')) {\n" +
            "      var embeddedCode = parse(_api, id, parseUtils);\n" +
            "      parseUtils.parseFunction(_api, codes, embeddedCode);\n" +
            "    } else if (_api.hasClass('assertion')) {\n" +
            "      var _embeddedCode = parse(_api, id, parseUtils);\n" +
            "\n" +
            "      parseUtils.parseAssertion(_api, id, codes, _embeddedCode);\n" +
            "    } else {\n" +
            "      parse(_api, id, parseUtils, codes);\n" +
            "    }\n" +
            "  });\n" +
            "  return codes.join('');\n" +
            "};\n" +
            "\n" +
            "var parseVariable = function parseVariable(api, codes) {\n" +
            "  var variableName = api.getAttr('data-name');\n" +
            "  var variableValue = api.text().trim();\n" +
            "  codes.push(convertVariableCode(variableName, variableValue));\n" +
            "};\n" +
            "\n" +
            "var parseFunction = function parseFunction(api, codes, embeddedCode) {\n" +
            "  var actionName = api.getAttr('data-action');\n" +
            "  var actionParams = api.getAttr('data-params');\n" +
            "  codes.push(convertFunctionCode(actionName, actionParams, embeddedCode));\n" +
            "};\n" +
            "\n" +
            "var parseAssertion = function parseAssertion(api, exampleId, codes, embeddedCode) {\n" +
            "  var actionName = api.getAttr('data-action');\n" +
            "  var actionParams = api.getAttr('data-params');\n" +
            "  codes.push(convertAssertionFunctionCode(actionName, actionParams, embeddedCode));\n" +
            "  var expectType = api.getAttr('data-expect');\n" +
            "  var expectValue = api.text().trim();\n" +
            "  codes.push(convertAssertionCode(expectType, expectValue));\n" +
            "  var assertionId = api.getAttr('id');\n" +
            "  codes.push(convertAssertionResultCode(exampleId, assertionId));\n" +
            "};\n" +
            "\n" +
            "var convertVariableCode = function convertVariableCode(variableName, variableValue) {\n" +
            "  variableValue = isNaN(variableValue) ? '\"' + variableValue + '\"' : variableValue;\n" +
            "  return \"var \".concat(variableName, \" = \").concat(variableValue, \";\");\n" +
            "};\n" +
            "\n" +
            "var convertFunctionCode = function convertFunctionCode(actionName, actionParams, embeddedCode) {\n" +
            "  if (actionParams) {\n" +
            "    return embeddedCode ? \"(function () { \".concat(embeddedCode, \"fixture.\").concat(actionName, \"(\").concat(actionParams.split(' '), \"); })();\") : \"(function () { fixture.\".concat(actionName, \"(\").concat(actionParams.split(' '), \"); })();\");\n" +
            "  } else {\n" +
            "    return \"fixture.\".concat(actionName, \"();\");\n" +
            "  }\n" +
            "};\n" +
            "\n" +
            "var convertAssertionFunctionCode = function convertAssertionFunctionCode(actionName, actionParams, embeddedCode) {\n" +
            "  if (actionParams) {\n" +
            "    return embeddedCode ? \"actual = (function () { \".concat(embeddedCode, \"fixture.\").concat(actionName, \"(\").concat(actionParams.split(' '), \"); })();\") : \"actual = (function () { fixture.\".concat(actionName, \"(\").concat(actionParams.split(' '), \"); })();\");\n" +
            "  } else {\n" +
            "    return \"actual = fixture.\".concat(actionName, \"();\");\n" +
            "  }\n" +
            "};\n" +
            "\n" +
            "var convertAssertionCode = function convertAssertionCode(expectType, expectValue) {\n" +
            "  if (expectType === 'equal') {\n" +
            "    expectValue = isNaN(expectValue) ? '\"' + expectValue + '\"' : expectValue;\n" +
            "    return \"expect = \".concat(expectValue, \";result = actual === expect;\");\n" +
            "  } else if (expectType === 'true') {\n" +
            "    return 'result = actual === true;';\n" +
            "  } else if (expectType === 'false') {\n" +
            "    return 'result = actual === false;';\n" +
            "  } else {\n" +
            "    console.log('Error expected type');\n" +
            "  }\n" +
            "};\n" +
            "\n" +
            "var convertAssertionResultCode = function convertAssertionResultCode(exampleId, assertionId) {\n" +
            "  return \"$.getElementById(\\\"\".concat(assertionId, \"\\\").addClass(result ? \\\"success\\\" : \\\"error\\\");context[\\\"\").concat(exampleId, \"\\\"] = context[\\\"\").concat(exampleId, \"\\\"] && result;$.getElementById(\\\"\").concat(assertionId, \"\\\").children()[1].setText(actual);\");\n" +
            "};\n" +
            "\n" +
            "var parseUtils = {\n" +
            "  parseVariable: parseVariable,\n" +
            "  parseFunction: parseFunction,\n" +
            "  parseAssertion: parseAssertion\n" +
            "};\n" +
            "\n" +
            "function getJsCode() {\n" +
            "  enhance($, uuid);\n" +
            "  var script = {};\n" +
            "  $.getElementsByClassName('example').forEach(function (api) {\n" +
            "    var id = api.getAttr('id');\n" +
            "    var initCodes = [\"var expect;var actual;var result;context[\\\"\".concat(id, \"\\\"] = true;\")];\n" +
            "    script[id] = parse(api, id, parseUtils, initCodes);\n" +
            "  });\n" +
            "  return script;\n" +
            "}\n" +
            "\n";

    private final String scriptPath = "src/main/resources/parser.cjs.js";

    public ParserAdapter(String scripting, Document document) {
//        try {
            executor = ExecutorFactory.getExecutor(scripting, rawParser);
            executor.addSymbol("$", new DomHelperImpl(document));
//        } catch (IOException e) {
//            throw new ParserAdapterException("Not found file: " + scriptPath, e);
//        }
    }

    public Map<String, String> getJsCode() {
        Object result = executor.invoke("getJsCode");

        return (Map<String, String>) result;
    }

    public Executor getExecutor() {
        return executor;
    }
}
