import {findIndex} from 'lodash'

export const convertCodeForVariable = ($, variable, variables) => {
    let code
    const variableName = $(variable).attr('data-name')
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
    const functionName = $(func).attr('data-action')
    const functionParams = $(func).attr('data-params')
    if (functionParams) {
        let paramArray = functionParams.split(' ')
        $(func).find('span.variable').each(function (index, variable) {
            const variableName = $(variable).attr('data-name')
            const variableValue = $(variable).text()
            const paramIndex = findIndex(paramArray, (paramName) => paramName === variableName)
            if (paramIndex >= 0) {
                paramArray[paramIndex] = `"${variableValue}"`
            }
        })
        code = `Fixture.${functionName}(${paramArray.join(', ')})`
    } else {
        code = `Fixture.${functionName}()`
    }
    return code
}

export const convertCodeForAssertion = ($, index, assertion) => {
    let code = [`context["${index}"] = {}`]
    const expectType = $(assertion).attr('data-expect')
    if (expectType === 'equal') {
        const expectValue = $(assertion).text()
        code.push(`context["${index}"].expect = "${expectValue}"`)
    } else if (expectType === 'true') {
        code.push(`context["${index}"].expect = true`)
    } else if (expectType === 'false') {
        code.push(`context["${index}"].expect = false`)
    } else {
        console.error('目前仅支持assert-equal，assert-true，assert-false')
    }

    const codeForFunction = convertCodeForFunction($, assertion)
    code.push(`context["${index}"].actual = ${codeForFunction}`)
    code.push(`context["${index}"].result = context["${index}"].actual === context["${index}"].expect`)
    return code
}
