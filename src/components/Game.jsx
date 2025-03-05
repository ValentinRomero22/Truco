import { useEffect, useState } from "react"

import Table from "./Table"

import { getTurn } from "../../helpers/dealCards"

const Game = () => {
    const [pcGamePoints, setPcGamePoints] = useState(0)
    const [playerGamePoints, setPlayerGamePoints] = useState(0)

    const [playerHand, setPlayerHand] = useState(null)

    const [winner, setWinner] = useState(null)

    useEffect(() => {
        const hand = getTurn()
        console.log(`Game devuelve ${hand}`)
        setPlayerHand(hand)
    }, [winner])

    return (
        <Table
            playerHand={playerHand}
            setPcGamePoints={setPcGamePoints}
            setPlayerGamePoints={setPlayerGamePoints}
            setWinner={setWinner}>
        </Table>
    )
}

export default Game