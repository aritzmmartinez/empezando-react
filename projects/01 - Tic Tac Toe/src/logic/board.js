import { WINNING_COMBINATIONS } from '../constants'

// se ejecuta cada vez que se actualiza el tablero
export const checkWinner = (boardToCheck) => {
    for (const combination of WINNING_COMBINATIONS) {
        const [a, b, c] = combination
        if (
            boardToCheck[a] !== null && // 0 --> X || O
            boardToCheck[a] === boardToCheck[b] && // 0 y 1 --> X --> X || O --> O
            boardToCheck[a] === boardToCheck[c] // 0 y 2 --> X --> X || O --> O
        ) {
            return boardToCheck[a] // X || O
        }
    }
    // si no hay ganador
    return null
}

export const checkEndGame = (newBoard) => {
    // si todas las casillas estan ocupadas y no hay un ganador, entonces hay un empate
    return newBoard.every((square) => square !== null)
}