const Modal = ({ move }) => {
    console.log('modal')

    return (
        <div className="modal">
            <span>{move}</span>
            <button
                onClick={console.log('quiero')}>
                QUIERO
            </button>
            <button
                onClick={console.log('no quiero')}>
                NO QUIERO
            </button>
        </div>
    )
}

export default Modal