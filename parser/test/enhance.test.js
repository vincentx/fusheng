import {load} from 'cheerio';
import {enhance} from '../src/enhance'
import {v4} from 'uuid'

test('enhance context id', () => {
    const $ = load(`
        <p class="example"></p>
    `)
    enhance($, v4)
    expect($('.example').attr('id')).toBeDefined()
})

test('enhance assertion tag', () => {
    const $ = load(`
        <span class="assertion" data-expect="equal" data-action="getPot">0</span>
    `)
    enhance($, v4)
    console.log($.html())
    expect($('.assertion').attr('id')).toBeDefined()
    expect($('.assertion').children().length).toBe(2)
    expect($('.assertion').children('.assert-expect')).toBeDefined()
    expect($('.assertion').children('.assert-actual')).toBeDefined()
})

test('enhance style', () => {
    const $ = load(`
        <p></p>
    `)
    enhance($, v4)
    expect($('style').html()).toBeDefined()
})
