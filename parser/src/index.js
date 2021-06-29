import fs from 'fs'
import {enhanceHtml} from './HtmlEnhancement'
import {convertCode} from './CodeConverter'
import astConverter from './ASTConverter'

fs.readFile('public/demo.html', 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  let enhancedHtml = enhanceHtml(data)
  let code = convertCode(enhancedHtml)
  let jsonDom = astConverter.toJsonDom(enhancedHtml)
  let html = astConverter.toHtml(jsonDom)

//  console.log(enhancedHtml)
//  console.log('------------------')
//  console.log(code)
//  console.log('------------------')
//  console.log(jsonDom)
//  console.log(html)
})
