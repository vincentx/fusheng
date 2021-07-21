import 'core-js'
import 'regenerator-runtime/runtime'
import fs from 'fs'
import { enhance } from './enhance'
import { parse } from './parse'
import parseUtils from './parse-utils'
import {load} from "./sandbox";
import {uuid} from "./sandbox";

let html = fs.readFileSync('public/example.html', 'utf-8')
const api = load(html)
const v4 = uuid()
const script = exec(api, v4)
console.log(script)

export function exec(api, uuid) {
  enhance(api, uuid)
  const script = {}
  api.getElementsByClassName('example').forEach(_api => {
    const id = _api.getAttr('id')
    const initCodes = [`let expect;let actual;let result;context["${id}"] = true;`]
    script[id] = parse(_api, id, parseUtils, initCodes)
  })
  return script
}
