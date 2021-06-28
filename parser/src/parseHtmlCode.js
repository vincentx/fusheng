import cheerio from 'cheerio'
import {convertCodeForAssertion, convertCodeForFunction, convertCodeForVariable} from './convertCode'
import {
    CODE_TAG,
    CODE_TAG_SELECTOR,
    CODE_JOINER
} from './constant'

export default (data) => {
    const $ = cheerio.load(data)

    let executable_codes = {}
    $(CODE_TAG_SELECTOR.EXAMPLE).each(function (exampleIndex, example) {
        let codes = ['var context = {}']
        let exampleVariables = []
        $(example).find('span').each(function (index, el) {
            if ($(el).hasClass(CODE_TAG.VARIABLE) && !$(el).parent().hasClass(CODE_TAG.FUNCTION)) {
                codes.push(convertCodeForVariable($, el, exampleVariables))
            } else if ($(el).hasClass(CODE_TAG.FUNCTION)) {
                codes.push(convertCodeForFunction($, el))
            } else if ($(el).hasClass(CODE_TAG.ASSERTION)) {
                codes = codes.concat(convertCodeForAssertion($, index, el))
            }
        })
        executable_codes[exampleIndex] = `${codes.join(CODE_JOINER)}${CODE_JOINER}`
    })
    return executable_codes
}
