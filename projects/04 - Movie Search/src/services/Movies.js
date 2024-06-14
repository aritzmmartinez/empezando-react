export const searchMovies = async ({ query }) => {
    if (query === '') return null

    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=636c172d&s=${query}`)
        const data = await response.json()

        const movies = data.Search

        return movies?.map(movie => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster
        }))
    } catch (e) {
        throw new Error('Error searching movies')
    }
}