/*
    El hook useMemo se utiliza para memorizar valores, en este caso se esta memorizando el valor de movies,
    para que no se vuelva a calcular cada vez que se renderiza el componente dependiendo de una lista de dependencias, 
    en este caso solo se calcula cuando query cambia

    El hook useCallback es lo mismo que useMemo pero pensado para funciones, lo unico que este te permite simplificar el codigo
*/

import { useState, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/Movies'

export function useMovies({ query, sort }) {
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
    
    /*
        USANDO USEMEMO:

        const getMovies = useMemo(() => {
            return async ({ query }) => {
                // si la query es la misma que la anterior, no se hace nada
                if (query === previousQuery.current) return

                try {
                    setLoading(true)
                    setError(null)
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
            // en vez de pasarselo como depencia se le puede pasar por parametro
        }, [])
    */

    /*
        USANDO USECALLBACK: 
    */
    const getMovies = useCallback(
        async ({ query }) => {
            // si la query es la misma que la anterior, no se hace nada
            if (query === previousQuery.current) return

            try {
                setLoading(true)
                setError(null)
                previousQuery.current = query
                const newMovies = await searchMovies({ query })
                setMovies(newMovies)
    
            } catch (e) {
                setError(e.message)
            
                // tanto en el try como en el catch se ejecuta el finally
            } finally {
                setLoading(false)
            }
        // en vez de pasarselo como depencia se le puede pasar por parametro
        },
    [])


  
    // el localeCompare compara con aceptacion de tildes y mayusculas ya que si no, no ordenaria bien, por que la posicion de las letras en unicode no es la misma
    /*
        const sortedMovies = sort ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) 
        : movies
    */

    /*
        se usa useMemo ya que si se hace como en el ejemplo de arriba se estaria calculando el valor de sortedMovies en cada renderizacion
        ya que si no, lo que pasaria es que cada vez que cambiar la query (el valor del input) se volveria a calcular el valor de sortedMovies

        asegurarse de que hay un problema de rendimiento antes de usar useMemo !!!
    */
    const sortedMovies = useMemo(() => {
        return sort 
        ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) : movies

        // cuando cambie el sort o los movies, se vuelve a calcular el valor de sortedMovies
    }, [movies, sort])

    return { movies : sortedMovies, getMovies, loading }
}