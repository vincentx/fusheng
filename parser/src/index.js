import fs from 'fs'
import parseHtml from './parseHtml'
import enhanceHtml from "./enhanceHtml";

fs.readFile('public/demo.html', 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  let code = parseHtml(data)
  let enhancedHtml = enhanceHtml(data)
  fs.writeFileSync('public/enhanced-demo.html', enhancedHtml)

  console.log(code)
  console.log("------------------")
  console.log(enhancedHtml)
})
