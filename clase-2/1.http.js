const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 3000
const processRequest = (req, res) => {
  // statusCode 200 by default
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  if (req.url === '/') {
    res.end('<h1>Bienvenido a la página de inicio</h1>')
  } else if (req.url === '/imagen') {
    fs.readFile('./imagen.png', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h1>500 Internal Server Error</h1>')
      } else {
        res.setHeader('Content-Type', 'image/png')
        res.end(data)
      }
    })
  } else if (req.url === '/contacto') {
    res.end('<h1>Teléfono de contacto: +57 3157363000</h1>')
  } else {
    res.statusCode = 404 // Not Found
    res.end('<h1>Not Found 404</h1>')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${server.address().port}`)
})
