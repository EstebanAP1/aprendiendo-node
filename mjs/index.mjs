// .js -> por defecto utiliza CommonJS
// .mjs -> para utilizar ES Modules
// .cjs -> para utilizar CommonJS

import { sum, mult, sub } from './sum.mjs'

console.log(sum(3, 2))
console.log(sub(3, 2))
console.log(mult(3, 2))
