const checkTrick = (pcCards, playedCards) => {
    let cardsLevel = 0

    for (let i = 0; i < pcCards.length; i++) {
        cardsLevel += pcCards[i].level
    }

    cardsLevel = Math.floor(cardsLevel / 3)

    return cardsLevel

    // ALGORITMO COMPARANDO CARTA POR CARTA
    /*console.log(playedCards)

    let trick = false

    if (playedCards[2] != null) {
        console.log('hay 3a carta')

        if (playedCards[2].level < pcCards[2].level) {
            trick = true
        } else {
            let random = Math.floor(Math.random() * 3)
            random === 0
                ? trick = true
                : trick = false
        }
    } else if (playedCards[1] != null) {
        console.log('hay 2a carta')

        if (playedCards[1].level < pcCards[1].level) {
            trick = true
        } else {
            let random = Math.floor(Math.random() * 3)
            random === 0
                ? trick = true
                : trick = false
        }
    } else if (playedCards[0] != null) {
        console.log('hay 1a carta')

        if (playedCards[0].level < pcCards[0].level) {
            trick = true
        } else {
            let random = Math.floor(Math.random() * 3)
            console.log(random)
            random === 0
                ? trick = true
                : trick = false
        }
    } else {
        console.log('no hay cartas')
    }

    return trick*/
}

export { checkTrick }

// POSIBLE MANEJO DE CANTAR / RETRUCAR SEGÚN LA MANO,
// LAS CARTAS JUGADAS Y SI SE VAN GANANDO LAS MANOS

/*function evaluarFuerzaCartas(cartas) {
    const valores = {
        '1E': 14, '1B': 13, '7E': 12, '7O': 11,
        '3': 10, '2': 9, '1C': 8, '1O': 8,
        '12': 7, '11': 6, '10': 5, '7B': 4, '7C': 4,
        '6': 3, '5': 2, '4': 1
    };

    return cartas.reduce((total, carta) => total + (valores[carta] || 0), 0);
}

function compararCartas(maquina, jugador) {
    // Devuelve 1 si la máquina gana, -1 si pierde, 0 si es empate
    const valores = {
        '1E': 14, '1B': 13, '7E': 12, '7O': 11,
        '3': 10, '2': 9, '1C': 8, '1O': 8,
        '12': 7, '11': 6, '10': 5, '7B': 4, '7C': 4,
        '6': 3, '5': 2, '4': 1
    };

    let valorMaquina = valores[maquina] || 0;
    let valorJugador = valores[jugador] || 0;

    return valorMaquina > valorJugador ? 1 : valorMaquina < valorJugador ? -1 : 0;
}

function decisionTruco(cartasMaquina, cartasJugador, trucoCantado, rondaPerdida) {
    let puntaje = evaluarFuerzaCartas(cartasMaquina);

    // Analizar cartas jugadas por el jugador
    let ventaja = 0;  // +1 si la máquina va ganando, -1 si va perdiendo
    for (let i = 0; i < cartasJugador.length; i++) {
        ventaja += compararCartas(cartasMaquina[i], cartasJugador[i]);
    }

    // Si la máquina tiene cartas fuertes, canta Truco
    if (!trucoCantado && puntaje >= 24) {
        return "Cantar Truco";
    }

    // Si el jugador ya cantó Truco, decidir si aceptarlo o subir la apuesta
    if (trucoCantado) {
        if (puntaje >= 22 && ventaja >= 0) {
            return "ReTruco";
        } else if (puntaje >= 18 && ventaja >= 0) {
            return "Quiero Truco";
        } else {
            return "No quiero";
        }
    }

    // Si la máquina ya perdió una ronda, ser más conservadora
    if (rondaPerdida && puntaje < 20) {
        return "No quiero";
    }

    return "Jugar normal";
}

// Ejemplo de uso:
const cartasMaquina = ['1E', '7O', '5'];  // Mano fuerte
const cartasJugador = ['6', '5'];  // Cartas que ya jugó el jugador
const trucoCantado = true;  // El jugador cantó Truco
const rondaPerdida = false;  // La máquina no perdió la primera ronda

console.log(decisionTruco(cartasMaquina, cartasJugador, trucoCantado, rondaPerdida));
// Salida esperada: "ReTruco" o "Quiero Truco"
*/

// ESTRATEGIA PARA JUGAR AGRESIVO O DEFENSIVO EN FUNCIÓN DE
// LAS CARTAS DISPONIBLES Y LAS MANOS QUE SE ESTÉN JUGANDO

/*function evaluarFuerzaCartas(cartas) {
    const valores = {
        '1E': 14, '1B': 13, '7E': 12, '7O': 11,
        '3': 10, '2': 9, '1C': 8, '1O': 8,
        '12': 7, '11': 6, '10': 5, '7B': 4, '7C': 4,
        '6': 3, '5': 2, '4': 1
    };

    return cartas.map(carta => valores[carta] || 0);
}

function compararCartas(maquina, jugador) {
    // Devuelve 1 si la máquina gana, -1 si pierde, 0 si es empate
    const valores = {
        '1E': 14, '1B': 13, '7E': 12, '7O': 11,
        '3': 10, '2': 9, '1C': 8, '1O': 8,
        '12': 7, '11': 6, '10': 5, '7B': 4, '7C': 4,
        '6': 3, '5': 2, '4': 1
    };

    let valorMaquina = valores[maquina] || 0;
    let valorJugador = valores[jugador] || 0;

    return valorMaquina > valorJugador ? 1 : valorMaquina < valorJugador ? -1 : 0;
}

function elegirCartaAJugar(cartasMaquina, cartasJugador, rondasGanadas, rondasPerdidas) {
    let cartasOrdenadas = evaluarFuerzaCartas(cartasMaquina)
        .map((valor, i) => ({ carta: cartasMaquina[i], valor, index: i }))
        .sort((a, b) => a.valor - b.valor); // Ordenamos de menor a mayor

    // Estrategia basada en la ronda
    if (cartasJugador.length === 0) {
        // Primera jugada: Si la máquina es agresiva, juega la más fuerte, sino juega la intermedia
        return rondasGanadas > 0 ? cartasOrdenadas[2] : cartasOrdenadas[1];
    } else {
        let cartaJugador = cartasJugador[cartasJugador.length - 1]; // Última carta jugada por el rival
        let mejoresOpciones = cartasOrdenadas.filter(c => compararCartas(c.carta, cartaJugador) >= 0);
        
        if (mejoresOpciones.length > 0) {
            // Jugar la menor carta que aún gane
            return mejoresOpciones[0];
        } else {
            // No puede ganar, jugar la peor carta disponible
            return cartasOrdenadas[0];
        }
    }
}

// Ejemplo de uso:
const cartasMaquina = ['1E', '7O', '5'];  // Mano fuerte
const cartasJugador = ['6'];  // El jugador ya jugó una carta
const rondasGanadas = 1;  // La máquina ya ganó una ronda
const rondasPerdidas = 0;  // La máquina no ha perdido ninguna

let cartaAJugar = elegirCartaAJugar(cartasMaquina, cartasJugador, rondasGanadas, rondasPerdidas);
console.log(`La máquina juega: ${cartaAJugar.carta}`); 
*/