import { enhance } from './enhance'
import { parse } from './parse'
import { load, uuidv4 } from './sandbox'
import parseUtils from './parse-utils'
import fs from 'fs'

let html = fs.readFileSync('public/example.html', 'utf-8')
const $ = load(html)
const uuid = uuidv4()
console.log(getJsCode())

export function getJsCode() {
  enhance($, uuid)
  const script = {}
  $.getElementsByClassName('example').forEach(api => {
    const id = api.getAttr('id')
    const initCodes = [`var expect;var actual;var result;context["${id}"] = true;`]
    script[id] = parse(api, id, parseUtils, initCodes)
  })
  return script
}
