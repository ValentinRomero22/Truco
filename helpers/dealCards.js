import { cards } from '../data/cards.js'

// FUNCIÓN BARAJAR Y REPARTIR LAS CARTAS
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

// FUNCIÓN PARA VERIFICAR FLOR, PUNTOS DE LA FLOR Y PUNTOS DEL ENVIDO
const checkPoints = (arrayPlayerCards, arrayPcCards) => {
    let dataPcFlower = false, dataPlayerFlower = false
    let dataPcFlowerPoints = 0, dataPlayerFlowerPoints = 0, dataPcPoints = 0, dataPlayerPoints = 0

    // LÓGICA PARA EL JUGADOR
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
            // SI TAMBIÉN ES TRUE HAY FLOR, CAMBIO EL VALOR DE LA BANDERA Y CUENTO LOS PUNTOS
            dataPlayerFlower = true
            dataPlayerFlowerPoints = 20

            for (let i = 0; i < arrayPlayerCards.length; i++) {
                arrayPlayerCards[i].number > 7
                    ? dataPlayerFlowerPoints = dataPlayerFlowerPoints
                    : dataPlayerFlowerPoints = dataPlayerFlowerPoints + arrayPlayerCards[i].number
            }

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

    // LÓGICA PARA LA PC
    if (arrayPcCards[0].suit === arrayPcCards[1].suit) {
        // ACÁ NO SÉ SI HAY FLOR PERO YA PUEDO CONTAR LOS PUNTOS PARA EL ENVIDO...
        dataPcPoints = 20

        // SI ES BLANCA SUMO LA CARTA, SI NO DEJO EL VALOR COMO ESTABA
        arrayPcCards[0].number < 10
            ? dataPcPoints = dataPcPoints + arrayPcCards[0].number
            : dataPcPoints = dataPcPoints

        // SI ES BLANCA SUMO LA CARTA, SI NO DEJO EL VALOR COMO ESTABA
        arrayPcCards[1].number < 10
            ? dataPcPoints = dataPcPoints + arrayPcCards[1].number
            : dataPcPoints = dataPcPoints

        if (arrayPcCards[0].suit === arrayPcCards[2].suit) {
            // SI TAMBIÉN ES TRUE HAY FLOR, CAMBIO EL VALOR DE LA BANDERA Y CUENTO LOS PUNTOS
            dataPlayerFlower = true
            dataPlayerFlowerPoints = 20

            for (let i = 0; i < arrayPcCards.length; i++) {
                arrayPcCards[i].number > 7
                    ? dataPlayerFlowerPoints = dataPlayerFlowerPoints
                    : dataPlayerFlowerPoints = dataPlayerFlowerPoints + arrayPcCards[i].number
            }

            // ACÁ TENGO QUE VER CON QUÉ CARTAS ME QUEDO PARA LOS PUNTOS DEL ENVIDO
            // SI LA CARTA 2 ES BLANCA TENGO QUE VER SI ES MAYOR A ALGUNA QUE LAS ANTERIORES
            if (arrayPcCards[2].number < 10) {
                if (arrayPcCards[0].number > 7 || arrayPcCards[1].number > 7) {
                    // SI ALGUNA DE LAS DOS ES UNA NEGRA, SUMO EL PUNTO DE LA TERCERA CARTA
                    dataPcPoints = dataPcPoints + arrayPcCards[2].number
                } else {
                    // SI NINGUNA DE LAS DOS ES UNA NEGRA
                    // TENGO QUE VER CUÁL DE LAS TRES BLANCAS ES MÁS GRANDE
                    // YA TENGO CONTADAS LAS CARTAS 0 Y 1 POR LO QUE COMPARO CON LA CARTA 2
                    if (arrayPcCards[2].number > arrayPcCards[0].number) {
                        dataPcPoints = dataPcPoints + arrayPcCards[2].number

                        if (arrayPcCards[1].number > arrayPcCards[0].number) {
                            dataPcPoints = dataPcPoints - arrayPcCards[0].number
                        } else {
                            dataPcPoints = dataPcPoints - arrayPcCards[1].number
                        }
                    }
                }
            }
        }
    } else if (arrayPcCards[0].suit === arrayPcCards[2].suit) {
        // ACÁ YA SÉ QUE NO HAY FLOR, NO LO SÉ DE ANTES PORQUE NO ENTRÉ EN EL IF ANTERIOR
        // SI LLEGO HASTA ACÁ TENGO QUE SUMAR LOS PUNTOS DE LAS CARTAS 0 Y 2
        dataPcPoints = 20

        if (arrayPcCards[0].number < 10)
            dataPcPoints = dataPcPoints + arrayPcCards[0].number

        if (arrayPcCards[2].number < 10)
            dataPcPoints = dataPcPoints + arrayPcCards[2].number
    } else if (arrayPcCards[1].suit === arrayPcCards[2].suit) {
        // SI LLEGO HASTA ACÁ TENGO QUE SUMAR LOS PUNTOS DE LAS CARTAS 1 Y 2
        dataPcPoints = 20

        if (arrayPcCards[1].number < 10)
            dataPcPoints = dataPcPoints + arrayPcCards[1].number

        if (arrayPcCards[2].number < 10)
            dataPcPoints = dataPcPoints + arrayPcCards[2].number
    } else {
        // SI LLEGO HASTA ACÁ ES QUE NO HAY CARTAS DEL MISMO PALO
        // TENGO QUE VER SI TODAS SON NEGRAS O CUAL ES LA MÁS ALTA DE LAS BLANCAS
        for (let i = 0; i < arrayPcCards.length; i++) {
            if (i == 0) {
                if (arrayPcCards[i].number < 10) dataPcPoints = arrayPcCards[i].number
            } else {
                if (arrayPcCards[i].number < 10 && arrayPcCards[i].number > dataPcPoints)
                    dataPcPoints = arrayPcCards[i].number
            }
        }
    }

    return {
        dataPlayerFlower,
        dataPcFlower,
        dataPcFlowerPoints,
        dataPlayerFlowerPoints,
        dataPlayerPoints,
        dataPcPoints
    }
}

export { giveCards, checkPoints }