export const parse = (api, id, parseUtils, codes, assertionPresetCodes) => {
  codes = codes || []
  assertionPresetCodes = assertionPresetCodes || []
  api.children().forEach(_api => {
    if (_api.hasClass('variable')) {
      parseUtils.parseVariable(_api, codes)
    } else if (_api.hasClass('function')) {
      const embeddedCode = parse(_api, id, parseUtils, [], assertionPresetCodes)
      parseUtils.parseFunction(_api, codes, embeddedCode)
    } else if (_api.hasClass('assertion')) {
      codes.push(...assertionPresetCodes)
      const embeddedCode = parse(_api, id, parseUtils, [], assertionPresetCodes)
      parseUtils.parseAssertion(_api, id, codes, embeddedCode)
    } else if (_api.hasClass('row-function')) {
      const rowCodes = []
      parseUtils.parseFunction(_api, rowCodes, '')
      parse(_api, id, parseUtils, codes, rowCodes)
    } else {
      parse(_api, id, parseUtils, codes, assertionPresetCodes)
    }
  })
  return codes.join('')
}


