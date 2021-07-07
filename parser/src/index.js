import 'core-js'
import 'regenerator-runtime/runtime'
import {enhanceHtml} from './html-enhancement'
import {convertCode} from './code-converter'
import astConverter from './ast-converter'
import fs from 'fs'

// fs.readFile('public/demo.html', 'utf-8', (err, data) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   let enhancedHtml = enhanceHtml(data)
//   let code = convertCode(enhancedHtml)
//   let domJSON = astConverter.toDomJSON(enhancedHtml)
//   let html = astConverter.toHtml(domJSON)
//   console.log(enhancedHtml)
//   console.log(code)
// })

export const getJSCodeAndDomJSON = (html) => {
  let enhancedHtml = enhanceHtml(html)
  let jsCode = convertCode(enhancedHtml)
  let domJSON = astConverter.toDomJSON(enhancedHtml)
  return {
    jsCode,
    domJSON,
  }
}

export const transformDomJSONToHtml = (domJSON) => {
  const obj = typeof domJSON === 'string' ? JSON.parse(domJSON) : domJSON
  return astConverter.toHtml(obj)
}
