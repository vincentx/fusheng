import fs from 'fs'
import {enhanceHtml} from './html-enhancement'
import {convertCode} from './code-converter'
import astConverter from './ast-converter'

fs.readFile('public/demo.html', 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  let enhancedHtml = enhanceHtml(data)
  let code = convertCode(enhancedHtml)
  let domJSON = astConverter.toDomJSON(enhancedHtml)
  let html = astConverter.toHtml(domJSON)

  console.log(enhancedHtml)
  console.log('------------------')
  console.log(code)
  console.log('------------------')
  console.log(domJSON)
  console.log(html)
})

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
  return astConverter.toHtml(domJSON)
}
