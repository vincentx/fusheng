import 'core-js'
import 'regenerator-runtime/runtime'
import {parse} from './parse'
import fs from 'fs'
import cheerio from 'cheerio';
import {enhance} from './enhance';

fs.readFile('public/example.html', 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const $ = cheerio.load(data)
  let enhancedHtml = enhance($)
  const root = $('.example')
  let code = parse($, root)
  console.log(enhancedHtml)
  console.log(code)
})
