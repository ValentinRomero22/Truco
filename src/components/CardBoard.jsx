const CardBoard = ({ cardImage }) => {
    if (cardImage) {
        return (
            <div className="card">
                <img src={cardImage} alt="Carta" />
            </div>
        )
    } else {
        return (
            <div className="card"></div>
        )
    }

}

export default CardBoard