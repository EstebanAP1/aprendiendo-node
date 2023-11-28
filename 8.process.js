// Argumentos de entrada
// console.log(process.argv)

// Controlar el proceso y su salida
// 0 éxito, 1 error
// process.exit(0)

// Podemos controlar eventos de proceso
process.on('exit', () => {
  // Limpiar los recursos
})

// Current working directory
console.log(process.cwd())

// Platform
console.log(process.platform)

// Variables de entorno
console.log(process.env.pepe)
