const path = require('node:path')

// unir rutas con path.join
// -> unix /
// -> windows \
console.log('Separación de carpetas:', path.sep) // Revisar la separación de carpetas en tu SO

const filePath = path.join('content', 'subfolder', 'text.txt')
console.log('Ejemplo de ruta path.join:', filePath)

const base = path.basename('/tmp/esteban-secret-files/password.txt')
console.log('Fichero de una ruta:', base)

const filename = path.basename('/tmp/esteban-secret-files/password.txt', '.txt')
console.log('Nombre del fichero de la ruta:', filename)

const extension = path.extname('image.jpg')
console.log('Extensión de un archivo:', extension)
