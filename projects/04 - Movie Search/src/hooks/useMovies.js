import { useState, useRef } from 'react'
import { searchMovies } from '../services/Movies'

export function useMovies({ query }) {
    /*
        Se puede dejar esto mas limpio moviendo este codigo a 
        una funcion o dejarlo asi:

        const [responseMovies, setResponseMovies] = useState([])

        const movies = responseMovies.Search

        const mappedMovies = movies?.map(movie => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster
        }))

        const getMovies = () => {
            if (query){
                //setResponseMovies(withResults)
                fetch(`https://www.omdbapi.com/?apikey=636c172d&s=${query}`)
                    .then(response => response.json())
                    .then(data => setResponseMovies(data))
            } else {
                setResponseMovies(withNoResults)
            }
        }

        return { movies: mappedMovies, getMovies }
    */

    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    // de esta forma se guarda el valor de query en la primera renderizacion
    const previousQuery = useRef(query)
    
    const getMovies = async () => {
        // si la query es la misma que la anterior, no se hace nada
        if (query === previousQuery.current) return

        try {
            setLoading(true)
            previousQuery.current = query
            const newMovies = await searchMovies({ query })
            setMovies(newMovies)

        } catch (e) {
            setError(e.message)
        
            // tanto en el try como en el catch se ejecuta el finally
        } finally {
            setLoading(false)
        }
    }

    return { movies, getMovies, loading}
}