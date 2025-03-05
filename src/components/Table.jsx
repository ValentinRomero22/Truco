import { useState, useEffect } from 'react'

import backCards from '../assets/cardImages/tapa.png'

import { giveCards, getPoints, getTurn } from '../../helpers/dealCards'
import { checkTrick } from '../../helpers/checkHand'

import Board from './Board'
import Card from './Card'

const Table = ({ playerHand, setPcGamePoints, setPlayerGamePoints, setWinner }) => {
    // estado para manejar las manos que se van jugando (NO EL JUGADOR QUE ES MANO)
    const [hand, setHand] = useState(0)

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

    // estado para saber el turno del jugador que corresponde (0: PC | 1: jugador)
    const [turn, setTurn] = useState(null)

    useEffect(() => {
        if (hand === 0) {
            setTurn(playerHand)
        } else if (hand % 2 === 0) {
            setTurn(playerHand)
        } else {
            playerHand === 0
                ? setTurn(1)
                : setTurn(0)
        }

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
        } = getPoints(arrayPlayerCards, arrayPcCards)

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

    }, [playerHand, hand])

    useEffect(() => {
        console.log(turn)
        if (pcFlower === true && turn === 0) {
            setTimeout(() => {
                alert('flor')
            }, 500)
        }
    }, [pcFlower])

    // estado para saber si ya se cantó o no --> false = se puede tantear
    const [points, setPoints] = useState(true)

    // estado para saber la carta que está colocada en su momento
    const [currentCard, setCurrentCard] = useState({})

    // estado del tablero
    const [board, setBoard] = useState(
        Array(2).fill().map(() =>
            Array(3).fill(null)
        )
    )

    const updateTable = (card, index) => {
        const newBoard = [...board]

        let row = turn
        /* turn === turns.player
            ? row = 1
            : row = 0 */

        /* console.log(row, index) */
        /* console.log(newBoard[row].length) */
        for (let i = 0; i < newBoard[row].length; i++) {
            if (newBoard[row][i] == null) {
                newBoard[row][i] = card
                break
            }
        }
        /* console.log(newBoard) */

        if (row === 1) {
            playerCards.splice(index, 1)
            console.log(playerCards)
            setPlayerCards(playerCards)
        } else {
            pcCards.splice(index, 1)
            console.log(pcCards)
            setPcCards(pcCards)
        }

        setBoard(newBoard)
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

    if (playerHand !== null) {
        return (
            <main className='table'>
                <h1>TRUCO!</h1>
                <section className='cardsBox'>
                    {
                        pcCards.map((card, index) => {
                            return (
                                <Card
                                    key={index}
                                    updateTable={updateTable}
                                    card={card}
                                    index={index}>
                                    <img src={card.image} alt='Carta' />
                                </Card>
                            )
                        })
                    }
                </section>
                <Board
                    board={board}>
                </Board>
                <section className='cardsBox playerCards'>
                    {
                        playerCards.map((card, index) => {
                            return (
                                <Card
                                    key={index}
                                    updateTable={updateTable}
                                    card={card}
                                    index={index}>
                                    <img src={card.image} alt='Carta' />
                                </Card>
                            )
                        })
                    }
                </section>
                <section className='buttons'>
                    <button>
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
                    <button
                        onClick={(() => {
                            /* console.log(turn) */
                            const newTurn = turn === 1 ? 0 : 1
                            console.log(newTurn)
                            setTurn(newTurn)
                            const trick = checkTrick(pcCards, board[1])
                            console.log(trick)
                        })}>
                        CAMBIAR TURNO
                    </button>
                    <button
                        onClick={(() => {
                            setHand(hand + 1)
                        })}>
                        FINALIZAR MANO
                    </button>
                </section>
            </main>
        )
    } else {
        return (
            <div>Cargando...</div>
        )
    }
}

export default Table