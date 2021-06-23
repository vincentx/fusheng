import cheerio from 'cheerio'

export default (data) => {
  const $ = cheerio.load(data)
  $('.example').each(function (exampleIndex, example) {
    enhanceExampleTag($, exampleIndex, example)

    $(example).find('span').each(function (index, el) {
      if ($(el).hasClass('variable')) {
        // 输出js code
        // 对于function里面包含的variable不做code转换
      } else if ($(el).hasClass('function')) {
        // 输出js code
        // 找到function中定义的variable直接放到function param中
      } else if ($(el).hasClass('assertion')) {
        enhanceAssertionTag($, index, el)

        // 输出js code，生成context
        // context[exampleIndex][index].expect =
        // context[exampleIndex][index].actual =
      } else {
        console.error('未指定声明类型')
      }
    })
  })

  addStyle($)
  console.log($.html())
}

const enhanceExampleTag = ($, index, example) => {
  $(example).attr('ctxId', index.toString())
}

const enhanceAssertionTag = ($, index, assertion) => {
  $(assertion).attr('data-id', index.toString())
  const text = $(assertion).text()
  $(assertion).text('')
  $(assertion).append(`<span class="assert-expect">${text}</span>`)
  $(assertion).append(`<span class='assert-actual'></span>`)
}

const addStyle = ($) => {
  $.root().append(`
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
