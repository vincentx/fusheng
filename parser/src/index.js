import 'core-js'
import 'regenerator-runtime/runtime'
import fs from 'fs'
import cheerio from 'cheerio'
import { v4 } from 'uuid'
import { enhance } from './enhance'
import { parse } from './parse'
import parseUtils from './parse-utils'

let html = fs.readFileSync('public/example.html', 'utf-8')
const $ = cheerio.load(html)
const script = exec($, v4)
console.log(script)

export function exec ($, uuid) {
  enhance($, uuid)
  // TODO: 考虑多个example
  const root = $('.example')
  const id = root.attr('id')
  const initCodes = [`let expect;let actual;let result;context["${id}"] = true`]
  return parse($, root, id, parseUtils, initCodes)
}
