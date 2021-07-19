function enhanceContentId($, uuid) {
  $.getElementsByClassName('example').each(function (index, element) {
    const node = $.wrapElement(element)
    $.setAttr(node, 'id', uuid())
  })
}

function enhanceAssertion($, uuid) {
  $.getElementsByClassName('assertion').each(function (index, element) {
    const node = $.wrapElement(element)
    const expectValue = $.text(node).trim()
    $.empty(node)
    $.setAttr(node, 'id', uuid())
    $.append(node, `<span class="assert-expect">${expectValue}</span>`)
    $.append(node, '<span class="assert-actual"></span>')
  })
}

function enhanceStyle($) {
  $.appendByTag('html', `
    <style>
      .success {
          background-color: #afa;
      }
      .success .assert-actual {
          display: none;
      }
      .error {
          background-color: #ffb0b0;
          padding: 1px;
      }
      .error .assert-expect {
          text-decoration: line-through;
          color: #bb5050;
          margin-right: 5px;
      }
    </style>
  `)
}

export const enhance = ($, uuid) => {
  enhanceContentId($, uuid);
  enhanceAssertion($, uuid);
  enhanceStyle($)
}
