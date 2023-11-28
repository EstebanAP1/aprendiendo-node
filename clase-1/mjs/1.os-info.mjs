import os from 'node:os'

console.log('Información de OS:')
console.log('--------------------')
console.log('Nombre del sistema operativo', os.platform())
console.log('Versión de sistema operativo', os.release())
console.log('Arquitectura', os.arch())
console.log('Total CPUs', os.cpus().length) // <-- vamos a poder escalar procesos en node
console.log('Memoria libre (MB)', os.freemem() / 1024 / 1024)
console.log('Memoria total (MB)', os.totalmem() / 1024 / 1024)
console.log('Uptime (Hrs)', os.uptime() / 60 / 60)
