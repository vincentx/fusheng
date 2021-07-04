import {enhanceHtml} from '../src/html-enhancement'
import cheerio from 'cheerio';
import {ASSERTION_ID, CODE_TAG_SELECTOR, EXAMPLE_ID} from '../src/constant';

test('enhance example add context id', () => {
    const result = enhanceHtml('<p class="example"></p>')
    const $ = cheerio.load(result)
    expect($(CODE_TAG_SELECTOR.EXAMPLE).attr(EXAMPLE_ID)).toBeDefined()
})

test('tag with assertion class in tag with example class', () => {
    const result = enhanceHtml('<span class="assertion" data-expect="equal" data-action="getActivePlayer"></span>')
    const $ = cheerio.load(result)
    expect($(CODE_TAG_SELECTOR.ASSERTION).attr(ASSERTION_ID)).toBeUndefined()
})

test('enhance assertion class add assertion id', () => {
    const result = enhanceHtml('<p class="example"><span class="assertion" data-expect="equal" data-action="getActivePlayer"></span></p>')
    const $ = cheerio.load(result)
    expect($(CODE_TAG_SELECTOR.ASSERTION).attr(ASSERTION_ID)).toBeDefined()
})

test('enhance assertion add sub element', () => {
    const result = enhanceHtml('<p class="example"><span class="assertion" data-expect="equal" data-action="getActivePlayer"></span></p>')
    const $ = cheerio.load(result)
    expect($('.assert-expect')).toBeDefined()
    expect($('.assert-actual')).toBeDefined()
})