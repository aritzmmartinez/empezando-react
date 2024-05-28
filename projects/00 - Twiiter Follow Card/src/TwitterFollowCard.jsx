/*
    Esto es un hook
    Estos permiten añadir funcionalidades a los componentes
*/

import { useState } from "react"

/*
    Este componente podría recibir la funcion formatUserName como prop, y se podría usar en el componente
    export function TwitterFollowCard({userName, name, isFollowing, formatUserName}) {

    Este componente podría recibir un elemento como prop, y se podría usar en el componente
    export function TwitterFollowCard({userName, name, isFollowing, element}) {

    Este componente podria recribir el atributo children, y se podría usar en el componente,
    'children' es un atributo especial por lo que es una palabra reservada
    export function TwitterFollowCard({userName, name, isFollowing, children}) {
*/

export function TwitterFollowCard({children, userName = 'Desconocido', name, initialIsFollowing}) {
    const imageSrc = `https://unavatar.io/${userName}`
    const addAt = (userName) => `@${userName}`

    const [isFollowing, setIsFollowing] = useState(initialIsFollowing)
    /*
        =

        const state = useState(false)

        El useState tiene 2 posiciones, la primera es el valor del estado, 
        y la segunda es la función que modifica el estado

        const isFollowing = state[0]
        const setIsFollowing = state[1]
    */

    const textoSeguir = isFollowing ? 'Siguiendo' : 'Seguir'
    const buttonClassNames = isFollowing ? 'tw-followCard-button tw-followCard-button is-following' : 'tw-followCard-button'

    const handleClick = () => {
        setIsFollowing(!isFollowing)
    }

    return (
        <article className='tw-followCard'>
            <header className='tw-followCard-header'>
                <img 
                    className='tw-followCard-avatar'
                    src={imageSrc}
                    alt="avatar" />
                <div className='tw-followCard-info'>
                    <strong>{children}</strong>
                    <span className='tw-followCard-infoUserName'>{addAt(userName)}</span>
                    {/*
                        En caso de usar la función formatUserName, se puede usar de la siguiente manera:
                        <span className='tw-followCard-infoUserName'>{formatUserName(userName)}</span>
                    */}

                    {/*
                        En caso de usar el elemento element, se puede usar de la siguiente manera:
                        <span className='tw-followCard-infoUserName'>{element}</span>
                    */}

                    {/*
                        En caso de usar el atributo children, se puede usar de la siguiente manera:
                        <span className='tw-followCard-infoUserName'>{children}</span>
                    */}
                </div>
            </header>

            <aside>
                <button className={buttonClassNames} onClick={handleClick}>
                    <span className="tw-followCard-textFollow">{textoSeguir}</span>
                    <span className="tw-followCard-stopFollow">Dejar de seguir</span>
                </button>
            </aside>
        </article>
    )
}