import converter from 'html-parse-stringify'

export default {
    toJsonDom(html) {
        return converter.parse(html)
    },

    toHtml(jsonDom) {
        return converter.stringify(jsonDom)
    }
}
