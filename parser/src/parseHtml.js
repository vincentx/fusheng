import cheerio from 'cheerio'
import {convertCodeForAssertion, convertCodeForFunction, convertCodeForVariable} from "./convertCode";

export default (data) => {
    const $ = cheerio.load(data)

    let executable_codes = {}
    $('.example').each(function (exampleIndex, example) {
        let codes = [`var context = {}`]
        let exampleVariables = []
        $(example).find('span').each(function (index, el) {
            if ($(el).hasClass('variable') && !$(el).parent().hasClass('function')) {
                codes.push(convertCodeForVariable($, el, exampleVariables))
            } else if ($(el).hasClass('function')) {
                codes.push(convertCodeForFunction($, el))
            } else if ($(el).hasClass('assertion')) {
                codes = codes.concat(convertCodeForAssertion($, index, el))
            }
        })
        executable_codes[exampleIndex] = `${codes.join(';')};`
    })
    return executable_codes;
}
