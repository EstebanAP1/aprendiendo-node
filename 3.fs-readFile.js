const fs = require('node:fs')

console.log('Leyendo el primer archivo...')
fs.readFile('./archivo.txt', 'utf-8', (err, text) => {
  if (err) {
    console.error('Error leyendo el primer archivo:', err)
    return
  }
  console.log('Primer texto:', text)
})

console.log('--> Hacer cosas mientras lee el archivo...')

console.log('Leyendo el segundo archivo...')
fs.readFile('./archivo2.txt', 'utf-8', (err, secondText) => {
  if (err) {
    console.error('Error leyendo el segundo archivo:', err)
    return
  }
  console.log('Segundo texto:', secondText)
})
