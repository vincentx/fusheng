import {load} from '../src/sandbox';
import {enhance} from '../src/enhance'
import {v4} from 'uuid'

test('enhance context id', () => {
    const $ = load(`
        <p class="example"></p>
    `)
    enhance($, v4)
    expect($.getElementsByClassName('example')[0].getAttr('id')).toBeDefined()
})

test('enhance assertion tag', () => {
    const $ = load(`
        <span class="assertion" data-expect="equal" data-action="getPot">0</span>
    `)
    enhance($, v4)
    expect($.getElementsByClassName('assertion')[0].getAttr('id')).toBeDefined()
    expect($.getElementsByClassName('assertion')[0].children().length).toBe(2)
    expect($.getElementsByClassName('assertion')[0].children('.assert-expect')).toBeDefined()
    expect($.getElementsByClassName('assertion')[0].children('.assert-actual')).toBeDefined()
})

test('enhance style', () => {
    const $ = load(`
        <p></p>
    `)
    enhance($, v4)
    expect($.getElementsByTag('style').length).toBe(1)
})
