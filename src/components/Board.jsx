import Card from "./Card"

const Board = ({ board, updateTable }) => {
    return (
        <section className='table'>
            {
                board.map((card, index) => {
                    return (
                        <Card
                            key={index}
                            index={index}
                            updateTable={updateTable}>
                            {card}
                        </Card>
                    )
                })
            }
        </section>
    )
}

export default Board