import { cards } from '../data/cards.js'

// barajar y repartir las cartas
const giveCards = () => {
    const arrayPlayerCards = []
    const arrayPcCards = []
    let dataPcFlower, dataPlayerFlower, dataPcPoints, dataPlayerPoints

    for (let i = cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    const cardsToGive = cards.splice(0, 6)

    for (let i = 0; i < cardsToGive.length; i++) {
        i % 2 == 0
            ? arrayPlayerCards.push(cardsToGive[i])
            : arrayPcCards.push(cardsToGive[i])
    }

    arrayPlayerCards[0].suit === arrayPlayerCards[1].suit
        ? arrayPlayerCards[1].suit === arrayPlayerCards[2].suit
            ? dataPlayerFlower = true
            : dataPlayerFlower = false
        : dataPlayerFlower = false

    arrayPcCards[0].suit === arrayPcCards[1].suit
        ? arrayPcCards[1].suit === arrayPcCards[2].suit
            ? dataPcFlower = true
            : dataPcFlower = false
        : dataPcFlower = false

    return {
        arrayPlayerCards,
        arrayPcCards,
        dataPcFlower,
        dataPlayerFlower,
        dataPcPoints,
        dataPlayerPoints
    }
}

export { giveCards }