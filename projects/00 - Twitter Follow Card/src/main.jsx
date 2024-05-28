{
    /*
        La diferencia entre componente y elemento es que el componente es una función que devuelve un elemento de React, 
        y el elemento es el objeto que se crea al llamar a la función del componente, los cuales se renderizan en el DOM

        Por ejemplo, en el componente TwitterFollowCard se devuelve la funcion que renderiza el elemento
        Y en el componente App, se renderizan los elementos devueltos de TwitterFollowCard
    */
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
)