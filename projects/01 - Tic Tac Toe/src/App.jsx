import { useState, useEffect } from "react"
import confetti from 'canvas-confetti'

import { Board } from "./components/Board"
import { Square } from "./components/Square"
import { WinnerModal } from "./components/WinnerModal"

import { TURNS } from "./constants"

import { checkWinner, checkEndGame } from "./logic/board"


function App() {
    // IMPORTANTE: los useState nunca pueden ir dentro de un bucle o condicional, siempre deben ir al principio de la funcion
    // se usa un estado para guardar el tablero
    const [board, setBoard] = useState(() =>{
        // se recupera el tablero dentro del state ya que si se hace fuera del state, se ejecutaria cada vez que se renderiza
        // haciendo que sea ineficiente y lento
        const boardFromLocalStorage = window.localStorage.getItem('board')
        if (boardFromLocalStorage) {
            return JSON.parse(boardFromLocalStorage)
        }
        return Array(9).fill(null)
    })

    // se usa un estado para saber de quien es el turno
    const [turn, setTurn] = useState(() => {
        const turnFromLocalStorage = window.localStorage.getItem('turn')
        if (turnFromLocalStorage) {
            return turnFromLocalStorage
        }
        return TURNS.X
    })

    // se usa un estado para saber quien es el ganador
    const [winner, setWinner] = useState(null)

    const updateBoard = (index) => {
        // si la casilla ya esta ocupada o ya existe un ganador, no se hace nada
        if (board[index] !== null || winner !== null) {
            return
        }

        // ya que los estado se deben de tratar de forma inmutable, se crea un nuevo array, que es una copia del anterior
        // usando el spread operator (evitando modificar el tablero original)
        const newBoard = [...board]
        newBoard[index] = turn
        setBoard(newBoard)

        // se cambia el turno
        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
        setTurn(newTurn)

        // guardar partida
        // se usa JSON.stringify para convertir el array en un string y despues poder recuperarlo
        // ya que si no se convierte a string
        localStorage.setItem('board', JSON.stringify(newBoard))
        localStorage.setItem('turn', newTurn)

        // se verifica si hay un ganador
        const newWinner = checkWinner(newBoard)

        // si hay un ganador, se muestra un alert con el ganador, pero el alert se muestra antes de que se actualice el render
        // porque el estado se actualiza de forma asincrona
        if (newWinner !== null) {
            confetti()
            setWinner(newWinner)
            //alert(`El ganador es: ${newWinner}`)
        } else if (checkEndGame(newBoard)){
            setWinner(false)
            //alert('Empate')
        }
    }

    // siempre que vayamos a hacer un reseteo de algo, lo que necesitamos es hacer que los estados vuelvan a su estado inicial
    const resetGame = () => {
        setBoard(Array(9).fill(null))
        setTurn(TURNS.X)
        setWinner(null)
        // limpiar localStorage cuando se reinicia el juego
        localStorage.removeItem('board')
        localStorage.removeItem('turn')
    }

    /*
        El useEffect se ejecuta cada vez que se renderiza el componente
        Tiene 2 parametros:
        1. La funcion que se va a ejecutar
        2. Un array de dependencias, si el array esta vacio, la funcion se ejecuta solo la primera vez
        Si no hay dependencias (no hay array), se ejecuta cada vez que se renderiza el componente
    */ 
    useEffect(() => {
        console.log('useEffect')
    }, [])

    return (
        <main className="board">
            <h1>Tic Tac Toe</h1>
            <button onClick={resetGame}>
                Empezar de nuevo
            </button>

            <Board board={board} updateBoard={updateBoard}/>

            <section className="turn">
                <Square isSelected = {turn === TURNS.X}>
                    {TURNS.X}
                </Square>

                <Square isSelected = {turn === TURNS.O}>
                    {TURNS.O}
                </Square>
            </section>

            <WinnerModal winner={winner} resetGame={resetGame}/>
        </main>
    )
}

export default App