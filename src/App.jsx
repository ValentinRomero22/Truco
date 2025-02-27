import { useEffect, useState } from 'react'
import './index.css'

import backCards from './assets/cardImages/tapa.png'

import { giveCards, checkPoints } from '../helpers/dealCards.js'

const TURNS = { PC: 'PC', PLAYER: 'PLAYER' }

const Cell = ({ children, index, updateTable }) => {
    return (
        <div className='cell'>
            {children}
        </div>
    )
}

function App() {

    // estado de las manos de los jugadores
    const [pcCards, setPcCards] = useState([])
    const [playerCards, setPlayerCards] = useState([])

    // estado para saber si hay flores --> false = no es posible cantar flor
    const [playerFlower, setPlayerFlower] = useState(false)
    const [pcFlower, setPcFlower] = useState(false)

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

        console.log(`Flor PC: ${dataPcFlower} | Points: ${dataPcFlowerPoints}`)
        console.log(`Flor player: ${dataPlayerFlower} | Points: ${dataPlayerFlowerPoints}`)
        console.log(`Puntos player: ${dataPlayerPoints}`)
    }, [])

    // estado para saber si ya se cantó o no --> true = se puede tantear
    const [points, setPoints] = useState(true)

    // estado para saber la carta que está colocada en su momento
    const [currentCard, setCurrentCard] = useState({})

    // estado del tablero
    const [table, setTable] = useState(Array(6).fill(null))

    // estado para saber el turno del jugador que corresponde
    const [turn, setTurn] = useState(TURNS.PLAYER)

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
                    pcCards.map((cell, index) => {
                        return (
                            <Cell
                                key={index}
                                updateCards={updateCards}>
                                <img src={cell.image} alt='Cartas PC' />
                            </Cell>
                        )
                    })
                }
            </section>
            <section className='table'>
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
            </section>
            <section className='playerCards'>
                {
                    playerCards.map((cell, index) => {
                        return (
                            <Cell
                                key={index}
                                updateCards={updateCards}>
                                <img src={cell.image} alt='Cartas jugador' />
                            </Cell>
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

export default App
