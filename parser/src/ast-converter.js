import converter from 'html-parse-stringify'

export default {
  toDomJSON(html) {
    let str = html.trim().replace(/\s+/g, "")
    return converter.parse(str)
  },

  toHtml(jsonDom) {
    return converter.stringify(jsonDom)
  }
}
