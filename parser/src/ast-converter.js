import converter from 'html-parse-stringify'

export default {
  toDomJSON(html) {
    return converter.parse(html)
  },

  toHtml(jsonDom) {
    return converter.stringify(jsonDom)
  }
}
