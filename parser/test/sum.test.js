import functions  from '../src/sum'

test('sum(1 + 2) 等于 3', () => {
  expect(functions.sum(1, 2)).toBe(3)
})
