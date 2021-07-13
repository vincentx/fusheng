function enhanceContentId($, uuid) {
  $('.example').each(function (index, element) {
    const node = $(element)
    node.attr('id', uuid())
  })
}

function enhanceAssertion($, uuid) {
  $('.assertion').each(function (index, element) {
    const node = $(element)
    const expectValue = node.text().trim()
    node.empty()
    node.attr('id', uuid())
    node.append(`<span class="assert-expect">${expectValue}</span>`)
    node.append('<span class="assert-actual"></span>')
  })
}

function enhanceStyle($) {
  $('html').append(`
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
