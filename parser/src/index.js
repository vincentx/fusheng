import fs from 'fs'
import parseHtml from './parseHtml'

fs.readFile('public/demo.html', 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  parseHtml(data)
})
