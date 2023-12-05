import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export class MovieController {
  constructor ({ movieModel }) {
    this.movieModel = movieModel
  }

  getAll = async (req, res) => {
    const { genre } = req.query
    const movies = await this.movieModel.getAll({ genre })

    return res.json(movies)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const movie = await this.movieModel.getById({ id })
    if (movie) return res.json(movie)
    return res.status(404).json({ message: 'Movie not found' })
  }

  create = async (req, res) => {
    const result = validateMovie(req.body)
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const newMovie = await this.movieModel.create({ input: result.data })
    return res.status(201).json(newMovie)
  }

  update = async (req, res) => {
    const { id } = req.params

    const movie = validatePartialMovie(req.body)
    if (movie.error) return res.status(400).json({ error: JSON.parse(movie.error.message) })

    const updatedMovie = await this.movieModel.update({ id, input: req.body })
    if (!updatedMovie) return res.status(404).json({ message: 'Movie not found' })

    return res.json(updatedMovie)
  }

  delete = async (req, res) => {
    const { id } = req.params

    const deleted = await this.movieModel.delete({ id })
    if (!deleted || !deleted.status) return res.status(404).json({ message: 'Movie not found' })

    return res.json({ message: 'Movie deleted' })
  }
}
