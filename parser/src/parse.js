export const parse = ($, root, id, parseUtils, codes) => {
  codes = codes || []
  $.children(root).each(function(index, element) {
    let node = $.wrapElement(element)
    if ($.hasClass(node, 'variable')) {
      parseUtils.parseVariable($, node, codes)
    } else if ($.hasClass(node, 'function')) {
      const embeddedCode = parse($, node, id, parseUtils)
      parseUtils.parseFunction($, node, codes, embeddedCode)
    } else if ($.hasClass(node, 'assertion')) {
      const embeddedCode = parse($, node, id, parseUtils)
      parseUtils.parseAssertion($, node, id, codes, embeddedCode)
    } else {
      parse($, node, id, parseUtils, codes)
    }
  })
  return codes.join('')
}


