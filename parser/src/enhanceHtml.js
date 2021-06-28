import {ASSERTION, EMPTY, EXAMPLE} from './constant'
import cheerio from 'cheerio'
import {addStyle} from './style'

export default (html) => {
    const $ = cheerio.load(html)
    $('.example').each(function (exampleIndex, example) {
        enhance($(example), exampleIndex, EXAMPLE)
        $(example).find('span.assertion').each(function (index, el) {
            enhance($(el), index, ASSERTION)
        })
    })
    addStyle($)
    return $.html()
}

const enhance = (el, uuid, type) => {
    if (type === EXAMPLE) {
        el.attr('ctxId', uuid.toString())
    }
    if (type === ASSERTION) {
        el.attr('data-id', uuid.toString())
        const text = el.text()
        el.text(EMPTY)
        el.append(`<span class="assert-expect">${text}</span>`)
        el.append('<span class=\'assert-actual\'></span>')
    }
}