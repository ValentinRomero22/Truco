import { useState, useEffect } from 'react'

import backCards from '../assets/cardImages/tapa.png'

import { giveCards, checkPoints } from '../../helpers/dealCards'

import Board from './Board'
import Card from './Card'

const turns = { pc: 'pc', player: 'player' }

const Table = () => {
    const [pcCards, setPcCards] = useState([])
    const [playerCards, setPlayerCards] = useState([])

    // estado para saber si hay flores --> false = no es posible cantar flor
    const [playerFlower, setPlayerFlower] = useState(false)
    const [pcFlower, setPcFlower] = useState(false)

    // estados para los puntos de las flores
    const [playerFlowerPoints, setPlayerFlowerPoints] = useState(0)
    const [pcFlowerPoints, setPcFlowerPoints] = useState(0)

    // estados para los puntos de los jugadores (envidos)
    const [playerPoints, setPlayerPoints] = useState(0)
    const [pcPoints, setPcPoints] = useState(0)

    useEffect(() => {
        const {
            arrayPlayerCards,
            arrayPcCards
        } = giveCards()

        setPlayerCards(arrayPlayerCards)
        setPcCards(arrayPcCards)

        const {
            dataPlayerFlower,
            dataPcFlower,
            dataPcFlowerPoints,
            dataPlayerFlowerPoints,
            dataPcPoints,
            dataPlayerPoints
        } = checkPoints(arrayPlayerCards, arrayPcCards)

        setPlayerFlower(dataPlayerFlower)
        setPcFlower(dataPcFlower)
        setPlayerFlowerPoints(dataPlayerFlowerPoints)
        setPcFlowerPoints(dataPcFlowerPoints)
        setPlayerPoints(dataPlayerPoints)
        setPcPoints(dataPcPoints)

        console.log(`Flor PC: ${dataPcFlower} | Points: ${dataPcFlowerPoints}`)
        console.log(`Flor player: ${dataPlayerFlower} | Points: ${dataPlayerFlowerPoints}`)
        console.log(`Puntos PC: ${dataPcPoints}`)
        console.log(`Puntos player: ${dataPlayerPoints}`)
    }, [])

    // estado para saber si ya se cantó o no --> true = se puede tantear
    const [points, setPoints] = useState(true)

    // estado para saber la carta que está colocada en su momento
    const [currentCard, setCurrentCard] = useState({})

    // estado del tablero
    const [board, setBoard] = useState(Array(6).fill(null))

    // para el caso de utilizar una matriz se puede plantear:
    /* const [board, setBoard] = useState(
        Array(2).fill().map(() =>
            Array(3).fill(null)
        )
    ) */

    // estado para saber el turno del jugador que corresponde
    const [turn, setTurn] = useState(turns.player)

    const updateTable = (index) => {

    }

    const updateCards = (card) => {

    }

    /* const playCard = (card, player) => {
        if (turn != player) return // esto bloquea al jugador para que no pueda jugar una carta

        player === 1
            ? setPlayerOneCards(playerOneCards.filter((c) => c !== card))
            : setPlayerTwoCards(playerTwoCards.filter((c) => c !== card))

        setTable([...table, { card, player }])
        setCurrentCard(card)
        setTurn(player === 1 ? 2 : 1)
    } */

    return (
        <main className='main'>
            <h1>TRUCO!</h1>
            <section className='pcCards'>
                {
                    pcCards.map((card, index) => {
                        return (
                            <Card
                                key={index}
                                updateCards={updateCards}>
                                <img src={card.image} alt='Cartas PC' />
                            </Card>
                        )
                    })
                }
            </section>
            <Board
                board={board}
                updateTable={updateTable}>
            </Board>
            {/* <section className='table'>
                {
                    table.map((cell, index) => {
                        return (
                            <Cell
                                key={index}
                                index={index}
                                updateTable={updateTable}>
                                {cell}
                            </Cell>
                        )
                    })
                }
            </section> */}
            <section className='playerCards'>
                {
                    playerCards.map((card, index) => {
                        return (
                            <Card
                                key={index}
                                updateCards={updateCards}>
                                <img src={card.image} alt='Cartas jugador' />
                            </Card>
                        )
                    })
                }
            </section>
            <section className='buttons'>
                <button disabled>
                    ENVIDO
                </button>
                <button disabled>
                    REAL ENVIDO
                </button>
                <button disabled>
                    FALTA ENVIDO
                </button>
                <button disabled>
                    TRUCO
                </button>
                <button disabled>
                    RE TRUCO
                </button>
                <button disabled>
                    VALE CUATRO
                </button>
                <button disabled={!playerFlower}>
                    FLOR
                </button>
                <button disabled>
                    QUIERO
                </button>
                <button disabled>
                    NO QUIERO
                </button>
            </section>
        </main>
    )
}

export default Table