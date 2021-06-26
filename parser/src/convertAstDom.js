import converter from 'html-parse-stringify'

export default {
    toJsonDom(html, component) {
        return converter.parse(html, component)
    },

    toHtml(jsonDom, component) {
        return converter.stringify(jsonDom)
    }
}