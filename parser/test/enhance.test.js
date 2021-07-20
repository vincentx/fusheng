import {load} from '../src/sandbox';
import {enhance} from '../src/enhance'
import {v4} from 'uuid'

test('enhance context id', () => {
    const $ = load(`
        <p class="example"></p>
    `)
    enhance($, v4)
    expect($.getElementsByClassName('example').attr('id')).toBeDefined()
})

test('enhance assertion tag', () => {
    const $ = load(`
        <span class="assertion" data-expect="equal" data-action="getPot">0</span>
    `)
    enhance($, v4)
    expect($.getElementsByClassName('assertion').attr('id')).toBeDefined()
    expect($.getElementsByClassName('assertion').children().length).toBe(2)
    expect($.getElementsByClassName('assertion').children('.assert-expect')).toBeDefined()
    expect($.getElementsByClassName('assertion').children('.assert-actual')).toBeDefined()
})

test('enhance style', () => {
    const $ = load(`
        <p></p>
    `)
    enhance($, v4)
    expect($.getElementsByClassName('style').html()).toBeDefined()
})
