import express, { json } from 'express'

import { createMovieRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'
import 'dotenv/config'
// import movies from './movies.json' with { type: 'json' }

export const createApp = ({ movieModel }) => {
  const app = express()
  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')

  app.get('/', (req, res) => {
    res.json({ message: 'Home page' })
  })

  app.use('/movies', createMovieRouter({ movieModel }))

  app.use((req, res) => {
    res.status(404).json({ message: 'Page not found' })
  })

  const PORT = process.env.PORT ?? 3000

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}
