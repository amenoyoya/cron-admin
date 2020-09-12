/**
 * $ node tests/omit.js
 */
const omit = require('../@server/lib/omit')

console.log(
  omit({
    a: 1, b: 2, c: 3, d: 4, e: 5
  }, ['b', 'd', 'f'])
)
