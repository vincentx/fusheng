export const parse = ($, root, id, parseUtils, codes) => {
  codes = codes || []
  root.children().each(function(index, element) {
    let node = $(element)
    if (node.hasClass('variable')) {
      parseUtils.parseVariable(node, codes)
    } else if (node.hasClass('function')) {
      const embeddedCode = parse($, node, id, parseUtils)
      parseUtils.parseFunction(node, codes, embeddedCode)
    } else if (node.hasClass('assertion')) {
      const embeddedCode = parse($, node, id, parseUtils)
      parseUtils.parseAssertion(node, id, codes, embeddedCode)
    } else {
      parse($, node, id, parseUtils)
    }
  })
  return codes.join('')
}


