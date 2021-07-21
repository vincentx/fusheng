export const parse = (api, id, parseUtils, codes) => {
  codes = codes || []
  api.children().forEach(_api => {
    if (_api.hasClass('variable')) {
      parseUtils.parseVariable(_api, codes)
    } else if (_api.hasClass('function')) {
      const embeddedCode = parse(_api, id, parseUtils)
      parseUtils.parseFunction(_api, codes, embeddedCode)
    } else if (_api.hasClass('assertion')) {
      const embeddedCode = parse(_api, id, parseUtils)
      parseUtils.parseAssertion(_api, id, codes, embeddedCode)
    } else {
      parse(_api, id, parseUtils, codes)
    }
  })
  return codes.join('')
}


