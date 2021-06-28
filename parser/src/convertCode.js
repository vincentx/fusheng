import {findIndex} from 'lodash'
import {
    DATA_ACTION,
    DATA_EXPECT,
    DATA_NAME,
    DATA_PARAMS,
    EXPECT_TYPE,
    FUNCTION_PREFIX,
    PARAM_JOINER,
    CODE_TAG_SELECTOR
} from './constant'

export const convertCodeForVariable = ($, variable, variables) => {
    let code
    const variableName = $(variable).attr(DATA_NAME)
    const variableValue = $(variable).text()
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
        let paramArray = functionParams.split(' ')
        $(func).find(CODE_TAG_SELECTOR.VARIABLE).each(function (index, variable) {
            const variableName = $(variable).attr(DATA_NAME)
            const variableValue = $(variable).text()
            const paramIndex = findIndex(paramArray, (paramName) => paramName === variableName)
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

export const convertCodeForAssertion = ($, index, assertion) => {
    let code = [`context["${index}"] = {}`]
    const expectType = $(assertion).attr(DATA_EXPECT)
    if (expectType === EXPECT_TYPE.EQUAL) {
        const expectValue = $(assertion).text()
        code.push(`context["${index}"].expect = "${expectValue}"`)
    } else if (expectType === EXPECT_TYPE.TRUE) {
        code.push(`context["${index}"].expect = true`)
    } else if (expectType === EXPECT_TYPE.FALSE) {
        code.push(`context["${index}"].expect = false`)
    } else {
        console.error('目前仅支持assert-equal，assert-true，assert-false')
    }

    const codeForFunction = convertCodeForFunction($, assertion)
    code.push(`context["${index}"].actual = ${codeForFunction}`)
    code.push(`context["${index}"].result = context["${index}"].actual === context["${index}"].expect`)
    return code
}
