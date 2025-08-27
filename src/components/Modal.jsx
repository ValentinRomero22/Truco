const Modal = ({ move, playerFlower, isVisible, onClose }) => {
    /* console.log(isVisible) */

    /* if (move.action == 'TRUCO') {
        console.log('el move es truco')
    }

    if (move.action == 'FLOR') {
        playerFlower
            ? console.log('ambos tienen flor')
            : console.log('solo la pc tiene flor')
    } */

    const handleClick = () => {
        console.log('handle click')
        onClose()
    }

    if (!isVisible) return null

    return (
        <div className="modalBox">
            <div className="modal">
                <p>PC dice:</p>
                <h2>{move.action}</h2>
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
                                HASTA ACÁ LLEGÓ EL OLOR
                            </button>
                        </div>
                }

            </div>
        </div>
    )
}

export default Modal