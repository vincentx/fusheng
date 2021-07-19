import 'core-js'
import 'regenerator-runtime/runtime'
import fs from 'fs'
import { enhance } from './enhance'
import { parse } from './parse'
import parseUtils from './parse-utils'
import {load} from "./sandbox";
import {uuid} from "./sandbox";

let html = fs.readFileSync('public/example.html', 'utf-8')
const $ = load(html)
const v4 = uuid()
const script = exec($, v4)
console.log(script)

export function exec($, uuid) {
  enhance($, uuid)
  const script = {}
  $.getElementsByClassName('example').each((index, element) => {
    const root = $.wrapElement(element)
    const id = $.getAttr(root, 'id')
    const initCodes = [`let expect;let actual;let result;context["${id}"] = true;`]
    script[id] = parse($, root, id, parseUtils, initCodes)
  })
  return script
}
