const Modal = ({ move, playerFlower }) => {
    console.log(playerFlower)

    if (move == 'TRUCO') {
        console.log('el move es truco')
    }

    if (move == 'FLOR') {
        playerFlower
            ? console.log('ambos tienen flor')
            : console.log('solo la pc tiene flor')
    }

    const handleClick = () => {
        console.log('QUIERO')
    }


    return (
        <div className="modalBox">
            <div className="modal">
                <p>PC dice:</p>
                <h2>{move}</h2>
                {
                    playerFlower
                        ?
                        <div className="modalButtonsContainer">
                            <button
                                className="button"
                                onClick={handleClick}>
                                CON FLOR ME ACHICO
                            </button>
                            <button
                                className="button"
                                onClick={handleClick}>
                                FLOR
                            </button>
                            <button
                                className="button"
                                onClick={handleClick}>
                                CONTRA FLOR
                            </button>
                            <button
                                className="button"
                                onClick={handleClick}>
                                CONTRA FLOR AL RESTO
                            </button>
                            <button
                                className="button"
                                onClick={handleClick}>
                                HASTA ACÁ LLEGÓ EL OLOR
                            </button>
                        </div>
                        :
                        <div className="modalButtonsContainer">
                            <button
                                className="button"
                                onClick={handleClick}>
                                QUIERO
                            </button>
                            <button
                                className="button"
                                onClick={handleClick}>
                                NO QUIERO
                            </button>
                        </div>
                }

            </div>
        </div>
    )
}

export default Modal