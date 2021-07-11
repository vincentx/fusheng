export const parse = ($, root, parsers, codes) => {
  codes = codes || []
  root.children().each(function(index, element) {
    let node = $(element)
    if (node.hasClass('variable')) {
      parsers.parseVariable(node, codes)
    } else if (node.hasClass('function')) {
      const embeddedParsedCode = parse($, node, parsers)
      parsers.parseFunction(node, codes, embeddedParsedCode)
    } else if (node.hasClass('assertion')) {
      const embeddedConvertedCode = parse($, node, parsers)
      parsers.parseAssertion(node, codes, embeddedConvertedCode)
    } else {
      parse($, node, parsers)
    }
  })
  return codes.join(';')
}


