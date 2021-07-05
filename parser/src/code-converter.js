import cheerio from 'cheerio'
import {convertCodeForAssertion, convertCodeForFunction, convertCodeForVariable} from './code-converter-utils'
import {
  CODE_TAG,
  CODE_TAG_SELECTOR,
  CODE_JOINER,
  ASSERTION_ID,
  EXAMPLE_ID
} from './constant'

export const convertCode = (data) => {
  const $ = cheerio.load(data)

  let executable_codes = {}
  $(CODE_TAG_SELECTOR.EXAMPLE).each(function (exampleIndex, example) {
    const exampleId = $(example).attr(EXAMPLE_ID)
    let codes = []
    let exampleVariables = []
    $(example).find('span').each(function (index, el) {
      if ($(el).hasClass(CODE_TAG.VARIABLE) && !$(el).parent().hasClass(CODE_TAG.FUNCTION)) {
        codes.push(convertCodeForVariable($, el, exampleVariables))
      } else if ($(el).hasClass(CODE_TAG.FUNCTION)) {
        codes.push(convertCodeForFunction($, el))
      } else if ($(el).hasClass(CODE_TAG.ASSERTION)) {
        const assertionId = $(el).attr(ASSERTION_ID)
        codes = codes.concat(convertCodeForAssertion($, assertionId, el))
      }
    })
    executable_codes[exampleId] = `${codes.join(CODE_JOINER)}${CODE_JOINER}`
  })
  return executable_codes
}
