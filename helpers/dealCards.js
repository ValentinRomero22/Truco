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
    //console.log(arrayPlayerCards)
    //console.log('leyó el array')

    let dataPcFlower = false, dataPlayerFlower = false
    let dataPcFlowerPoints = 0, dataPlayerFlowerPoints = 0, dataPcPoints = 0, dataPlayerPoints = 0

    // PARA SABER SI EL JUGADOR TIENE FLOR
    /* arrayPlayerCards[0].suit === arrayPlayerCards[1].suit
        ? arrayPlayerCards[1].suit === arrayPlayerCards[2].suit
            ? dataPlayerFlower = true
            : dataPlayerFlower = false
        : dataPlayerFlower = false */

    if (arrayPlayerCards[0].suit === arrayPlayerCards[1].suit) {
        // ACÁ NO SÉ SI HAY FLOR PERO YA PUEDO CONTAR LOS PUNTOS PARA EL ENVIDO...
        dataPlayerPoints = 20

        // SI ES BLANCA SUMO LA CARTA, SI NO DEJO EL VALOR COMO ESTABA
        arrayPlayerCards[0].number < 10
            ? dataPlayerPoints = dataPlayerPoints + arrayPlayerCards[0].number
            : dataPlayerPoints = dataPlayerPoints

        // SI ES BLANCA SUMO LA CARTA, SI NO DEJO EL VALOR COMO ESTABA
        arrayPlayerCards[1].number < 10
            ? dataPlayerPoints = dataPlayerPoints + arrayPlayerCards[1].number
            : dataPlayerPoints = dataPlayerPoints

        if (arrayPlayerCards[0].suit === arrayPlayerCards[2].suit) {
            // SI TAMBIÉN ES TRUE HAY FLOR
            dataPlayerFlower = true

            // ACÁ TENGO QUE VER CON QUÉ CARTAS ME QUEDO PARA LOS PUNTOS DEL ENVIDO
            // SI LA CARTA 2 ES BLANCA TENGO QUE VER SI ES MAYOR A ALGUNA QUE LAS ANTERIORES
            if (arrayPlayerCards[2].number < 10) {
                if (arrayPlayerCards[0].number > 7 || arrayPlayerCards[1].number > 7) {
                    // SI ALGUNA DE LAS DOS ES UNA NEGRA, SUMO EL PUNTO DE LA TERCERA CARTA
                    dataPlayerPoints = dataPlayerPoints + arrayPlayerCards[2].number
                } else {
                    // SI NINGUNA DE LAS DOS ES UNA NEGRA
                    // TENGO QUE VER CUÁL DE LAS TRES BLANCAS ES MÁS GRANDE
                    // YA TENGO CONTADAS LAS CARTAS 0 Y 1 POR LO QUE COMPARO CON LA CARTA 2
                    if (arrayPlayerCards[2].number > arrayPlayerCards[0].number) {
                        dataPlayerPoints = dataPlayerPoints + arrayPlayerCards[2].number

                        if (arrayPlayerCards[1].number > arrayPlayerCards[0].number) {
                            dataPlayerPoints = dataPlayerPoints - arrayPlayerCards[0].number
                        } else {
                            dataPlayerPoints = dataPlayerPoints - arrayPlayerCards[1].number
                        }
                    }
                }
            }
        }
    } else if (arrayPlayerCards[0].suit === arrayPlayerCards[2].suit) {
        // ACÁ YA SÉ QUE NO HAY FLOR, NO LO SÉ DE ANTES PORQUE NO ENTRÉ EN EL IF ANTERIOR
        // SI LLEGO HASTA ACÁ TENGO QUE SUMAR LOS PUNTOS DE LAS CARTAS 0 Y 2
        dataPlayerPoints = 20

        if (arrayPlayerCards[0].number < 10)
            dataPlayerPoints = dataPlayerPoints + arrayPlayerCards[0].number

        if (arrayPlayerCards[2].number < 10)
            dataPlayerPoints = dataPlayerPoints + arrayPlayerCards[2].number
    } else if (arrayPlayerCards[1].suit === arrayPlayerCards[2].suit) {
        // SI LLEGO HASTA ACÁ TENGO QUE SUMAR LOS PUNTOS DE LAS CARTAS 1 Y 2
        dataPlayerPoints = 20

        if (arrayPlayerCards[1].number < 10)
            dataPlayerPoints = dataPlayerPoints + arrayPlayerCards[1].number

        if (arrayPlayerCards[2].number < 10)
            dataPlayerPoints = dataPlayerPoints + arrayPlayerCards[2].number
    } else {
        // SI LLEGO HASTA ACÁ ES QUE NO HAY CARTAS DEL MISMO PALO
        // TENGO QUE VER SI TODAS SON NEGRAS O CUAL ES LA MÁS ALTA DE LAS BLANCAS
        for (let i = 0; i < arrayPlayerCards.length; i++) {
            if (i == 0) {
                if (arrayPlayerCards[i].number < 10) dataPlayerPoints = arrayPlayerCards[i].number
            } else {
                if (arrayPlayerCards[i].number < 10 && arrayPlayerCards[i].number > dataPlayerPoints)
                    dataPlayerPoints = arrayPlayerCards[i].number
            }
        }
    }

    /* if (dataPlayerFlower) {
        // SI TIENE FLOR CUENTO LOS PUNTOS DE LA FLOR, O DEL ENVIDO EN CASO DE QUE NO LA CANTE
        for (let i = 0; i < arrayPlayerCards.length; i++) {
            arrayPlayerCards[i].number > 7
                ? dataPlayerFlowerPoints = dataPlayerFlowerPoints
                : dataPlayerFlowerPoints = dataPlayerFlowerPoints + arrayPlayerCards[i].number

            //console.log(`${dataPlayerFlowerPoints} índice ${i}`)
        }

        // SI LA FLOR ES 10, 11 Y 12 LOS PUNTOS DE LA FLOR Y EL ENVIDO SON 20
        //if (dataPlayerFlowerPoints != 0) dataPlayerFlowerPoints = dataPlayerFlowerPoints + 20
        dataPlayerFlowerPoints = dataPlayerFlowerPoints + 20

        //console.log(dataPlayerFlowerPoints)
    } else {
        // SI NO TIENE FLOR, CUENTO LOS PUNTOS DEL ENVIDO
    } */

    // PARA SABER SI LA PC TIENE FLOR
    arrayPcCards[0].suit === arrayPcCards[1].suit
        ? arrayPcCards[1].suit === arrayPcCards[2].suit
            ? dataPcFlower = true
            : dataPcFlower = false
        : dataPcFlower = false

    if (dataPcFlower) {
        for (let i = 0; i < arrayPcCards.length; i++) {
            arrayPcCards[i].number > 7
                ? dataPcFlowerPoints = dataPcFlowerPoints
                : dataPcFlowerPoints = dataPcFlowerPoints + arrayPcCards[i].number
        }

        if (dataPcFlowerPoints != 0) dataPcFlowerPoints = dataPcFlowerPoints + 20

        //console.log(dataPcFlowerPoints)
    }

    // primero tomo las dos cartas del mismo palo si es que las hay
    // luego tomo los puntos de esas cartas
    // en caso de que no haya cartas del mismo palo tomo la de mayor valor

    /* for (let i = 0; i < arrayPlayerCards.length - 1; i++) {
        if ()
    } */

    /* arrayPlayerCards[0].suit === arrayPlayerCards[1].suit
        ? dataPlayerPoints = 20
        : arrayPlayerCards[0].suit === arrayPlayerCards[2].suit
            ? dataPlayerPoints = 20
            : arrayPlayerCards[1].suit === arrayPlayerCards[2].suit
                ? dataPlayerPoints = 20
                : dataPlayerPoints = 0 */


    return {
        dataPlayerFlower,
        dataPcFlower,
        dataPcFlowerPoints,
        dataPlayerFlowerPoints,
        dataPlayerPoints,
        dataPcPoints
        /* dataPcTotalPoints,
        dataPlayerTotalPoints */
    }
}

export { giveCards, checkPoints }