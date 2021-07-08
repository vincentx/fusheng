import { v4 } from 'uuid'

export const enhance = ($) => {
  $('.assertion').each(function (index, element) {
    const node = $(element)
    const expectValue = node.text().trim()
    node.empty()
    node.attr('id', v4())
    node.append(`<span class="assert-expect">${expectValue}</span>`)
    node.append('<span class="assert-actual"></span>')
  })
  addStyle($)
  return $.html()
}

function addStyle($) {
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