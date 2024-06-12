import { useEffect, useState } from 'react'
import { getRandomFact } from '../services/facts'

export function useCatFact () {
    const [fact, setFact] = useState()

    // el estado fact se actualiza con el valor que devuelve la promesa
    const refreshFact = () => {
        getRandomFact().then(setFact)
    }

    useEffect(() => {
        refreshFact()
    }, [])

    return { fact, refreshFact }
}