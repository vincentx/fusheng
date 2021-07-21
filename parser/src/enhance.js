function enhanceContentId(api, uuid) {
  api.getElementsByClassName('example').forEach(element => {
    element.setAttr('id', uuid())
  })
}

function enhanceAssertion(api, uuid) {
  api.getElementsByClassName('assertion').forEach(element => {
    const expectValue = element.text().trim()
    element.empty()
    element.setAttr('id', uuid())
    element.append(`<span class="assert-expect">${expectValue}</span>`)
    element.append('<span class="assert-actual"></span>')
  })
}

function enhanceStyle(api) {
  api.appendByTag('html', `
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

export const enhance = (api, uuid) => {
  enhanceContentId(api, uuid);
  enhanceAssertion(api, uuid);
  enhanceStyle(api)
}
