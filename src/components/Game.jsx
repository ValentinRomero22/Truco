import { useEffect, useState } from "react"

import Table from "./Table"

import { getTurn } from "../../helpers/dealCards"

const Game = () => {
    const [pcGamePoints, setPcGamePoints] = useState(0)
    const [playerGamePoints, setPlayerGamePoints] = useState(0)

    const [firtsHand, setFirstHand] = useState(true)

    const [playerHand, setPlayerHand] = useState(null)

    const [winner, setWinner] = useState(null)

    useEffect(() => {
        if (firtsHand) {
            const hand = getTurn()
            setPlayerHand(hand)

            setFirstHand(false)
        } else {
            playerHand === 0
                ? setPlayerHand(1)
                : setPlayerHand(0)
        }
    }, [winner])

    return (
        <main className="game">
            <section className="gameControls">
                <div className="control">
                    PUNTOS TOTALES: 15
                </div>
                <div className="control">
                    MIS PUNTOS: {playerGamePoints}
                </div>
                <div className="control">
                    PUNTOS PC: {playerGamePoints}
                </div>
                <div className="control">
                    SALIR X
                </div>
            </section>
            <Table
                pcGamePoints={pcGamePoints}
                playerGamePoints={playerGamePoints}
                setPcGamePoints={setPcGamePoints}
                setPlayerGamePoints={setPlayerGamePoints}
                firtsHand={firtsHand}
                /* setFirstHand={setFirstHand} */
                playerHand={playerHand}
                setWinner={setWinner}>
            </Table>
        </main>
    )
}

export default Game