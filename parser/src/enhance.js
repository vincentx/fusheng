function enhanceTable(api) {
  api.getElementsByTag('table').forEach(table => {
    const ths = table.getElementsByTag('th')
    ths.forEach((th, i) => {
      const attributes = th.getAttributes()
      table.getElementsByTag('td').forEach((td, j) => {
        if (j % ths.length === i) {
          attributes.forEach(attribute => {
            td.setAttr(attribute.name, attribute.value)
          })
        }
      })
      th.removeAttributes()
    })
  })
}

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
    element.append(`<span class="assert-actual"></span>`)
  })
}

function enhanceStyle(api) {
  api.getElementsByTag('head')[0].append(`
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
  enhanceTable(api)
  enhanceContentId(api, uuid)
  enhanceAssertion(api, uuid)
  enhanceStyle(api)
}
