import { Square } from "./Square"

export const Board = ({ board, updateBoard }) => {
    return (
        <section className="game">
        {
            // se recorre el tablero y se crea un componente Square por cada casilla
            // la _ es el valor de la primera casilla, pero no se usa, por eso se pone _
            board.map((_, index) => {
                return (
                    <Square
                        key={index}
                        index={index}
                        // aqui no se le pasa la ejecucion de la funcion, ya que se ejecutaria al renderizar (9 veces)
                        // se le pasa la referencia a la funcion, para que se ejecute cuando se haga click
                        updateBoard={updateBoard}
                    >
                        {board[index]}
                    </Square>
                )
            })
        }
        </section>
    )
}


