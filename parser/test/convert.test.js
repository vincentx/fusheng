import {
  convertVariableCode,
  convertFunctionCode,
  convertAssertionFunctionCode,
  convertAssertionCode,
  convertAssertionResultCode,
} from '../src/convert';

test('shoulr convert varable to code in the form of String when the variableValue is String', () => {
  let variableName = 'players';
  let variableValue = 'A,B,C';
  let variableCodeForStringValur = convertVariableCode(
    variableName,
    variableValue
  );
  expect(variableCodeForStringValur).toBe('let players = "A,B,C"');
});

test('shoulr convert varable to code in the form of number when the variableValue is number', () => {
  let variableName = 'wager';
  let variableValue = 5;
  let variableCodeForStringValur = convertVariableCode(
    variableName,
    variableValue
  );
  expect(variableCodeForStringValur).toBe('let wager = 5');
});

test('shoulr convert function to code when the embeddedConverted not exist', () => {
  let actionName = 'get';
  let actionParams = 'A B C';
  let functionCode = convertFunctionCode(actionName, actionParams);
  expect(functionCode).toBe('(function (){fixture.get(A,B,C)})()');
});

test('shoulr convert function to code when the embeddedConverted exist', () => {
  let actionName = 'get';
  let actionParams = 'A B C';
  let embeddedConvertedCode = 'let A = 5 let B = 5 let C = 5';
  let functionCode = convertFunctionCode(
    actionName,
    actionParams,
    embeddedConvertedCode
  );
  expect(functionCode).toBe(
    '(function (){let A = 5 let B = 5 let C = 5;fixture.get(A,B,C)})()'
  );
});

test('shoulr convert function to code when the actionParams not exist', () => {
  let actionName = 'get';
  let functionCode = convertFunctionCode(actionName);
  expect(functionCode).toBe('fixture.get()');
});

test('shoulr convert assertion function to code when the embeddedConverted not exist', () => {
  let actionName = 'getPot';
  let actionParams = 'pot';
  let functionCode = convertAssertionFunctionCode(actionName, actionParams);
  expect(functionCode).toBe('actual = (function (){fixture.getPot(pot)})()');
});

test('shoulr convert assertion function to code when the embeddedConverted exist', () => {
  let actionName = 'getPot';
  let actionParams = 'pot';
  let embeddedConvertedCode = 'let pot = 1';
  let functionCode = convertAssertionFunctionCode(
    actionName,
    actionParams,
    embeddedConvertedCode
  );
  expect(functionCode).toBe(
    'actual = (function (){let pot = 1;fixture.getPot(pot)})()'
  );
});

test('shoulr convert assertion function to code when the actionParams not exist', () => {
  let actionName = 'getPot';
  let functionCode = convertAssertionFunctionCode(actionName);
  expect(functionCode).toBe('actual = fixture.getPot()');
});

test('shoulr convert assertion to code when the expectType is equal', () => {
  let expectType = 'equal';
  let expectValue = 5;
  let assertionCode = convertAssertionCode(expectType, expectValue);
  expect(assertionCode).toBe('expect = 5;result = actual === expect');
});

test('shoulr convert assertion to code when the expectType is true', () => {
  let expectType = 'true';
  let expectValue = 5;
  let assertionCode = convertAssertionCode(expectType, expectValue);
  expect(assertionCode).toBe('result = actual === true');
});

test('shoulr convert assertion to code when the expectType is false', () => {
  let expectType = 'false';
  let expectValue = 5;
  let assertionCode = convertAssertionCode(expectType, expectValue);
  expect(assertionCode).toBe('result = actual === false');
});

test('shoulr convert convert assertion result to code when the uuid exist', () => {
  let uuid = 12345;
  let assertionResultCode = convertAssertionResultCode(12345);
  expect(assertionResultCode).toBe(
    '$("#' +
      uuid +
      '").find(".assert-expect").addClass(result ? "success" : "error");' +
      '$("#' +
      uuid +
      '").find(".assert-actual").addClass(result ? "success" : "error");' +
      'context.result.uuid' +
      uuid +
      ' = result'
  );
});
