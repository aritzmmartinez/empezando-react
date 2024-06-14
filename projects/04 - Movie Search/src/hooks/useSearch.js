import { useState, useEffect, useRef } from 'react'

export function useSearch(){
    /*
        FORMA NO CONTROLADA
        De esta forma se obtienen todos los valores de los inputs del formulario
        Esta es la forma mas optima, se hace todo a traves del DOM

        const handleSubmit = (event) =>{
            event.preventDefault()
            const { query } = Object.fromEntries(new window.FormData(event.target))
            console.log({ query })
        }
    */


    /*
        FORMA CONTROLADA
        De esta forma se obtiene el valor del input del formulario
        Esta forma es mas lenta, ya que cada vez que se cambia el input, se renderiza el componente
        React se encarga de gestionar el estado del input

        Una cosa buena que tiene la forma controlada es que se pueden hacer prevalidaciones
    */
    const [query, setQuery] = useState('')
    const [error, setError] = useState(null)
    const isFirstRender = useRef(true)

    useEffect(() => {
        // Si es el primer render, no se hace nada, si no hacemos esto, se muestra el
        // mensaje de error al principio
        if (isFirstRender.current) {
            isFirstRender.current = query === ''
            return
        }

        if (query === '') {
            setError('No se ha introducido ninguna busqueda')
            return
        }

        if (query.match(/^\d+$/)) {
            setError('La busqueda no puede ser un numero')
            return
        }

        if (query.length < 2) {
            setError('La busqueda debe tener al menos 2 caracteres')
            return
        }

        // Si no hay errores, se limpia el error
        setError(null)
    }, [query])

    return { query, setQuery ,error }
}