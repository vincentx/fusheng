import { CODE_TAG, CODE_TAG_SELECTOR, EXAMPLE_ID, ASSERTION_ID, EMPTY } from './constant'
import cheerio from 'cheerio'
import {addStyle} from './style'
import { v4 as uuidv4 } from 'uuid'

export default (html) => {
    const $ = cheerio.load(html)
    $(CODE_TAG_SELECTOR.EXAMPLE).each(function (exampleIndex, example) {
        enhance($(example), CODE_TAG.EXAMPLE)
        $(example).find(CODE_TAG_SELECTOR.ASSERTION).each(function (assertionIndex, assertion) {
            enhance($(assertion), CODE_TAG.ASSERTION)
        })
    })
    addStyle($)
    return $.html()
}

const enhance = (el, type) => {
    if (type === CODE_TAG.EXAMPLE) {
        el.attr(EXAMPLE_ID, uuidv4())
    }
    if (type === CODE_TAG.ASSERTION) {
        el.attr(ASSERTION_ID, uuidv4())
        const text = el.text()
        el.text(EMPTY)
        el.append(`<span class="assert-expect">${text}</span>`)
        el.append('<span class="assert-actual"></span>')
    }
}
