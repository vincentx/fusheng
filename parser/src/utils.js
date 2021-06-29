import {
    DATA_ACTION,
    DATA_EXPECT,
    DATA_NAME,
    DATA_PARAMS,
    EXPECT_TYPE,
    FUNCTION_PREFIX,
    PARAM_JOINER,
    CODE_TAG_SELECTOR,
    PARAM_SPLITTER
} from './constant'

export const convertCodeForVariable = ($, variable, variables) => {
    let code
    const variableName = $(variable).attr(DATA_NAME)
    const variableValue = $(variable).text().trim()
    if (variables.includes(variableName)) {
        code = `${ variableName } = "${ variableValue }"`
    } else {
        variables.push(variableName)
        code = `var ${ variableName } = "${ variableValue }"`
    }
    return code
}

export const convertCodeForFunction = ($, func) => {
    let code
    const functionName = $(func).attr(DATA_ACTION)
    const functionParams = $(func).attr(DATA_PARAMS)
    if (functionParams) {
        let paramArray = functionParams.split(PARAM_SPLITTER)
        $(func).find(CODE_TAG_SELECTOR.VARIABLE).each(function (index, variable) {
            const variableName = $(variable).attr(DATA_NAME)
            const variableValue = $(variable).text().trim()
            const paramIndex = paramArray.findIndex(paramName => paramName === variableName)
            if (paramIndex >= 0) {
                paramArray[paramIndex] = `"${variableValue}"`
            }
        })
        code = `${FUNCTION_PREFIX}${functionName}(${paramArray.join(PARAM_JOINER)})`
    } else {
        code = `${FUNCTION_PREFIX}${functionName}()`
    }
    return code
}

export const convertCodeForAssertion = ($, assertionId, assertion) => {
    let code = [`context["${assertionId}"] = {}`]
    const expectType = $(assertion).attr(DATA_EXPECT)
    if (expectType === EXPECT_TYPE.EQUAL) {
        const expectValue = $(assertion).text().trim()
        code.push(`context["${assertionId}"].expect = "${expectValue}"`)
    } else if (expectType === EXPECT_TYPE.TRUE) {
        code.push(`context["${assertionId}"].expect = true`)
    } else if (expectType === EXPECT_TYPE.FALSE) {
        code.push(`context["${assertionId}"].expect = false`)
    } else {
        console.error('目前仅支持assert-equal，assert-true，assert-false')
    }

    const codeForFunction = convertCodeForFunction($, assertion)
    code.push(`context["${assertionId}"].actual = ${codeForFunction}`)
    code.push(`context["${assertionId}"].result = context["${assertionId}"].actual === context["${assertionId}"].expect`)
    return code
}
