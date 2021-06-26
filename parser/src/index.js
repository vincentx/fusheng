import fs from 'fs'
import parseHtml from './parseHtml'
import enhanceHtml from "./enhanceHtml";
import convertHtml from './convertAstDom'

fs.readFile('public/demo.html', 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  let code = parseHtml(data)
  let enhancedHtml = enhanceHtml(data)
  fs.writeFileSync('public/enhanced-demo.html', enhancedHtml)
  let jsonDom = convertHtml.toJsonDom(enhancedHtml)

  console.log(code)
  console.log("------------------")
  console.log(enhancedHtml)
  console.log("------------------")
  console.log(jsonDom)

})
