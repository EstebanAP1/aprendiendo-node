import { readFile } from 'node:fs/promises'

console.log('Leyendo archivos...')
Promise.all([
  readFile('./archivo.txt', 'utf8'),
  readFile('./archivo2.txt', 'utf8')
]).then(([text, secondText]) => {
  console.log('Primer texto:', text)
  console.log('Segundo texto texto:', secondText)
})

console.log('--> Mientras leo tomo café')
