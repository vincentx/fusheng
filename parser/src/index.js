import fs from 'fs'
import enhanceHtml from './enhanceHtml'
import parseHtmlCode from './parseHtmlCode'
import convertHtml from './convertAstDom'

fs.readFile('public/demo.html', 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  let enhancedHtml = enhanceHtml(data)
  let code = parseHtmlCode(data)
  let jsonDom = convertHtml.toJsonDom(enhancedHtml)
  let html = convertHtml.toHtml(jsonDom)


    // fs.writeFileSync('public/enhanced-demo.html', enhancedHtml)
  console.log(enhancedHtml)
  console.log('------------------')
  console.log(code)
  console.log('------------------')
  console.log(jsonDom)
  console.log(html)

})
