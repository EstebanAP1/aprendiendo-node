import mysql from 'mysql2/promise'

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  password: '1234',
  port: 3306,
  database: 'moviesdb'
}

const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG

const connection = await mysql.createConnection(connectionString)

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()

      const [genres] = await connection.query(
        'SELECT id, name FROM genre WHERE LOWER(name) = ?;', [lowerCaseGenre]
      )

      if (genres.length === 0) return []

      const [{ id }] = genres

      const [movies] = await connection.query(
        `SELECT BIN_TO_UUID(movie.id) as id, title, year, director, duration, poster, rate FROM movie_genre
        JOIN movie ON movie.id = movie_genre.movie_id
        WHERE movie_genre.genre_id = ?;`, [id]
      )
      return movies
    }
    const [movies] = await connection.query(
      'SELECT BIN_TO_UUID(id) as id, title, year, director, duration, poster, rate FROM movie;'
    )

    return movies
  }

  static async getById ({ id }) {
    if (!id) return null

    const [movies] = await connection.query(
      `SELECT BIN_TO_UUID(id) as id, title, year, director, duration, poster, rate 
      FROM movie WHERE id = UUID_TO_BIN(?);`,
      [id]
    )

    if (movies.length === 0) return null

    return movies[0]
  }

  static async create ({ input }) {
    const {
      title,
      year,
      director,
      duration,
      poster,
      rate
    } = input

    const [uuidResult] = await connection.query('SELECT UUID() uuid')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(
        `INSERT INTO movie (id, title, year, director, duration, poster, rate)
        VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);`,
        [uuid, title, year, director, duration, poster, rate]
      )
    } catch (e) {
      throw new Error('Error creating movie')
    }

    const [movies] = await connection.query(
      `SELECT BIN_TO_UUID(id) as id, title, year, director, duration, poster, rate 
      FROM movie WHERE id = UUID_TO_BIN(?);`,
      [uuid]
    )

    return movies[0]
  }

  static async delete ({ id }) {
    const result = await connection.query(
      'DELETE FROM movie WHERE id = UUID_TO_BIN(?)', [id]
    )

    if (result[0].affectedRows === 0) return { status: false, message: 'Movie not found' }

    return { status: true }
  }

  static async update ({ id, input }) {
    const oldMovie = await this.getById({ id })

    if (!oldMovie) return { status: false, message: 'Movie not found' }

    const newMovie = {
      ...oldMovie,
      ...input
    }

    const {
      title,
      year,
      director,
      duration,
      poster,
      rate
    } = newMovie

    try {
      await connection.query(
        'UPDATE movie SET title = ?, year = ?, director = ?, duration = ?, poster = ?, rate = ?;',
        [title, year, director, duration, poster, rate]
      )
    } catch (e) {
      throw new Error('Error updating movie')
    }

    const [movies] = await connection.query(
      `SELECT BIN_TO_UUID(id) as id, title, year, director, duration, poster, rate 
      FROM movie WHERE id = UUID_TO_BIN(?);`,
      [id]
    )

    return movies[0]
  }
}
