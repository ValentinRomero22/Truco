import { cards } from '../data/cards.js'

// barajar y repartir las cartas
const giveCards = () => {
    const arrayPlayerCards = []
    const arrayPcCards = []

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



    return {
        arrayPlayerCards,
        arrayPcCards
    }
}

const checkPoints = (arrayPlayerCards, arrayPcCards) => {
    console.log(arrayPlayerCards)
    console.log('leyó el array')

    let dataPcFlower, dataPlayerFlower
    let dataPcFlowerPoints = 0, dataPlayerFlowerPoints = 0, dataPcPoints = 0, dataPlayerPoints = 0

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

    if (dataPlayerFlower) {
        for (let i = 0; i < arrayPlayerCards.length; i++) {
            arrayPlayerCards[i].number > 7
                ? dataPlayerFlowerPoints = dataPlayerFlowerPoints
                : dataPlayerFlowerPoints = dataPlayerFlowerPoints + arrayPlayerCards[i].number

            console.log(`${dataPlayerFlowerPoints} índice ${i}`)
        }

        if (dataPlayerFlowerPoints != 0) dataPlayerFlowerPoints = dataPlayerFlowerPoints + 20

        console.log(dataPlayerFlowerPoints)
    }

    if (dataPcFlower) {
        for (let i = 0; i < arrayPcCards.length; i++) {
            arrayPcCards[i].number > 7
                ? dataPcFlowerPoints = dataPcFlowerPoints
                : dataPcFlowerPoints = dataPcFlowerPoints + arrayPcCards[i].number
        }

        if (dataPcFlowerPoints != 0) dataPcFlowerPoints = dataPcFlowerPoints + 20

        console.log(dataPcFlowerPoints)
    }

        return {
            dataPlayerFlower,
            dataPcFlower,
            dataPcFlowerPoints,
            dataPlayerFlowerPoints,
            dataPcPoints,
            dataPlayerPoints
        }
}

export { giveCards, checkPoints }