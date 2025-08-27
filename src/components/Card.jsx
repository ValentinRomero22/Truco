const Card = ({ children, card, index, updateTable, disabled }) => {
    const handleClick = () => {
        if (disabled) return null

        updateTable(card, index)
    }

    return (
        <div
            disabled={disabled}
            className='card'
            onClick={handleClick}>
            {children}
        </div>
    )
}

export default Card