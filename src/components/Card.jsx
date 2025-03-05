const Card = ({ children, card, index, updateTable }) => {
    const handleClick = () => {
        updateTable(card, index)
    }

    return (
        <div className='card'
            onClick={handleClick} >
            {children}
        </div>
    )
}

export default Card