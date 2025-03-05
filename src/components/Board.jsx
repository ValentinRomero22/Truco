import Card from "./Card"
import CardBoard from "./CardBoard"

const Board = ({ board }) => {
    return (
        <section className='board'>
            {
                board.map((row, rowIndex) =>
                    row.map((card, columnIndex) => {
                        if (card == null) {
                            return (
                                <CardBoard
                                    key={`${rowIndex} ${columnIndex}`}>
                                </CardBoard>
                            )
                        } else {
                            return (
                                <CardBoard
                                    key={`${rowIndex} ${columnIndex}`}
                                    cardImage={card.image}>
                                </CardBoard>
                            )
                        }
                    })
                )
            }
        </section >
    )
}

export default Board