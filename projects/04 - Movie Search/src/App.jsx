import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'

/*
    useRef crea una referencia mutable que persiste durante todo el ciclo de vida del componente
    y es muy util para guardar un elemento del DOM o un valor mutable (un identificador, un contador, etc.)

    Y cada vez que cambia, no renderiza el componente. (A diferencia de useState que si que lo hace)
*/
import { useCallback, useRef, useState } from 'react'

function App() {
    const [sort, setSort] = useState(false)
    const { query, setQuery, error } = useSearch()
    const { movies, getMovies, loading } = useMovies({ query, sort})



    const handleSort = () => {
        setSort(!sort)
    }

    const counter = useRef(0) // valor que persiste entre renders
    counter.current++
    console.log(counter.current)

    const handleSubmit = (event) =>{
        event.preventDefault()
        // aqui se ve el valor del input
        console.log({ query })
        getMovies({ query })
    }

    /*
        Para que no se ejecute en cada renderizado, se puede usar useCallback
    */
    const debouncedGetMovies = useCallback(
        debounce(query => {
            getMovies({ query })
        }, 300)
    , [getMovies])

    const handleChange = (event) => {
        // esto seria una prevalidacion (impide que se introduzcan espacios al principio del input)
        const newQuery = event.target.value
        if (newQuery.startsWith(' ')) return

        // de esta forma cada vez que se cambia el input, se actualiza el estado del query
        // cuando el usuario deje de escribir durante 300 milisegundos, se ejecutara la funcion debouncedGetMovies
        debouncedGetMovies(newQuery)

        // el target es el input, el value es el valor del input y el event es el evento (onChange)
        setQuery(event.target.value)
    }

    return (
        <div className='page'>
            <header>
                <h1>Movie Search</h1>
                <form className='form' onSubmit={handleSubmit}>
                    {/* FORMA NO CONTROLADA 
                    <input name='query' type='text' placeholder='Search for a movie...' />
                    */}

                    {/* FORMA CONTROLADA 
                        Cada vez que el input cambia, se actualiza el estado del mismo
                    */}
                    <input onChange={handleChange} value={query} name='query' type='text' placeholder='Search for a movie...' />
                    <input type='checkbox' onChange={handleSort} checked={sort} />
                    <button type='submit'>Search</button>
                </form>
                {error && <p style={{ color: 'red'}}>{error}</p>}
            </header>

            <main>
                {loading ? <p>Loading...</p> : <Movies movies={movies}/>}
            </main>
        </div>
    )
}

export default App
