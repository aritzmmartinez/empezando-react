import { useCatImage } from './hooks/useCatImage'
import { useCatFact } from './hooks/useCatFact'

function App() {
    /*
        IMPORTANTE:
        La diferencia entre un custom hook y una función normal es que un 
        custom hook puede llamar a otros hooks

        Ademas, los custom hooks son como una caja negra, es decir, nos sirve para encapsular la logica
        y no tener que preocuparnos de como funciona internamente,es por eso que es mejor que los estados
        y los efectos esten en un custom hook y no en el componente para que el componente sea mas limpio

        Es una buena practica pasarle a las funciones en JavaScript un objeto en vez de varios argumentos
        por lo siguiente:
        - Da igual el orden de los argumentos
        - Te vas a asegurar de que el nombre es el mismo, por eso se llaman parametros nombrados
    */

    // FORMA 1
    // 2 useEffect, uno dentro del otro

    /*useEffect(() => {
        fetch(CAT_ENDPOINT_RANDOM_FACT)
        .then((res) => res.json())
        .then((data) => {
            const { fact } = data
            setFact(fact)

            // para obtener la primera palabra de la frase
            const word = fact.split(' ', 3).join(' ')
            console.log(word)

            fetch(`https://cataas.com/cat/says/${word}?size=50&color=red&json=true`)
            .then(res => res.json())
            .then(response => {
              const { _id } = response
              const url = `/cat/${_id}/says/${word}`
              setImageUrl(url)
            })
        })

    }, [])*/

    // FORMA 2
    // 2 useEffect, separados

    // El useEffect a refactorizado a un custom hook -> useCatFact.js
    // y el fetch para obtener el fact se ha refactorizado a services/facts.js
    const { fact, refreshFact } = useCatFact()

    // useEffect para obtener la imagen dependiendo del fact
    // se ha convertido en un custom hook -> useCatImage.js
    const { imageUrl } = useCatImage({ fact })

    // boton para obtener otro fact
    const handleClick = async () => {
        refreshFact()
    }

    return (
        <main>
            <h1>APP GATOS FACTS</h1>

            <button onClick={handleClick}>Obtener otro fact</button>

            { fact && <p>{fact}</p>}
            { imageUrl && <img src={imageUrl} alt={`imagen de un gatito`} style= {{width:'200px', height:'200px'}}/> }
        </main>
    )
}

export default App
