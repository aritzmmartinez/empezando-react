import { useState, useEffect } from 'react'

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

export function useCatImage({ fact }){
    const [imageUrl, setImageUrl] = useState()

    // useEffect para obtener la imagen dependiendo del fact
    useEffect(() => {
        if (!fact) return 

        const word = fact.split(' ', 1).join(' ')
        fetch(`https://cataas.com/cat/says/${word}?size=50&color=red&json=true`) // --> Devuelve una promesa
        .then(res => res.json()) // --> Devuelve una promesa (se pueden concatenar)
        .then(response => {
            const { _id } = response
            const url = `/cat/${_id}/says/${word}`
            setImageUrl(url)
        })
        
    }), [fact]

    return { imageUrl: `${CAT_PREFIX_IMAGE_URL}${imageUrl}`}
}