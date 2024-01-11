/* ***** Funciones ***** */

// Solicito el nombre
function solicitarNombre(){
    nombreSolicitado = prompt("Ingrese su nombre de jugador (entre 5 y 10 caracteres)");
    nombreSolicitado = nombreSolicitado.replace(/\s+/g, '');
    return nombreSolicitado
}

// Valido el nombre suministrado por el usuario, entre 5 y 10 caracteres, no puede arrancar con números
function validarNombre(nombre) {
    if ( nombre.length >= 5 && nombre.length <= 10 && isNaN(parseInt(nombre)) ) {
        return true
    } else {
        return false
    }
}

// Solicito la clase
function solicitarClase(){
    claseSolicitada = prompt("Ingrese una clase ('g' = guerrero, 'b' = bárbaro, 'r' = rogue, 'a' = aleatorio)");
    claseSolicitada = claseSolicitada.toLowerCase();
    if ( claseSolicitada == "a" ) {
        sorteo = Math.random();
        if ( sorteo > 0.67 ) {
            claseSolicitada = "g";
        } else if ( sorteo > 0.34 ){
            claseSolicitada = "b";
        } else {
            claseSolicitada = "r";
        }
    }
    return claseSolicitada
}

// Valido la clase suministrada por el usuario, puede ser: 'g' = guerrero, 'b' = bárbaro, 'r' = rogue, 'a' = aleatorio, este último se sortea en la función solicitarClase()
function validarClase(clase) {
    if ( clase == "g" || clase == "b" || clase == "r" ) {
        return true
    } else {
        return false
    }
}

// Función que asigna el ataque en función de la clase
function asignarAtaque(clase) {
    sorteo = Math.random();
    if ( clase == "g" ) {
        ataque = Math.round( 15 + 5 * ( sorteo - 0.4 ) );
    } else if ( clase == "b" ) {
        ataque = Math.round( 19 + 7 * ( sorteo - 0.5 ) );
    } else {
        ataque = Math.round( 13 + 10 * ( sorteo - 0.6 ) );
    }
    return ataque
}

// Función que asignan los HP (Hit Points) en función de la clase
function asignarHp(clase) {
    sorteo = Math.random();
    if ( clase == "g" ) {
        hp = Math.round( 100 + 20 * ( sorteo - 0.5 ) );
    } else if ( clase == "b" ) {
        hp = Math.round( 120 + 15 * ( sorteo - 0.6 ) );
    } else {
        hp = Math.round( 85 + 10 * ( sorteo - 0.25 ) );
    }
    return hp
}

// Función que asigna la precisión en función de la clase
function asignarPrecision(clase) {
    if ( clase == "g" ) {
        precision = 0.95;
    } else if ( clase == "b" ) {
        precision = 0.75;
    } else {
        precision = 1;
    }
    return precision
}

// Función que asigna la evasión en función de la clase
function asignarEvasion(clase) {
    if ( clase == "g" ) {
        evasion = 0.05;
    } else if ( clase == "b" ) {
        evasion = 0.01;
    } else {
        evasion = 0.2;
    }
    return evasion
}

// Función que asignan la velocidad en función de la clase
function asignarVelocidad(clase) {
    sorteo = Math.random();
    if ( clase == "g" ) {
        velocidad = Math.round( 12 + 5 * ( sorteo - 0.3 ) );
    } else if ( clase == "b" ) {
        velocidad = Math.round( 10 + 3 * ( sorteo - 0.4 ) );
    } else {
        velocidad = Math.round( 15 + 7 * ( sorteo - 0.25 ) );
    }
    return velocidad
}

// Función que controla si el ataque se dirige al objetivo
function preciso(precision) {
    sorteo = Math.random();
    if ( precision >= sorteo ) {
        return true
    } else {
        return false
    }
}

// Función que controla si el objetivo evade el ataque
function evadido(evasion) {
    sorteo = Math.random();
    if ( evasion >= sorteo ) {
        return true
    } else {
        return false
    }
}

// Función que designa el ataque del jugador
function jugadorAtacar() {
    controlPrecision = preciso(precisionJugador);
    controlEvasion = evadido(evasionRival);
    if ( controlPrecision && !controlEvasion ) {
        hpRival = hpRival - ataqueJugador;
        if ( hpRival <= 0 ) {
            mensaje = "El Rival ha sido derrotado";
            hpRival = 0;
        } else {
            mensaje = "Al Rival le queda " + hpRival + " de HP";
        }
    } else {
        mensaje = "El ataque de " + nombreJugador + " ha fallado";
    }
    console.log(mensaje);
}

// Función que designa el ataque del rival
function rivalAtacar() {
    controlPrecision = preciso(precisionRival);
    controlEvasion = evadido(evasionJugador);
    if ( controlPrecision && !controlEvasion ) {
        hpJugador = hpJugador - ataqueRival;
        if ( hpJugador <= 0 ) {
            mensaje = nombreJugador + " ha sido derrotado";
            hpJugador = 0;
        } else {
            mensaje = "A " + nombreJugador + " le queda " + hpJugador + " de HP";
        }
    } else {
        mensaje = "El ataque de Rival ha fallado";
    }
    console.log(mensaje);
}

/* Empiezo a crear variables y a utilizar las funciones */

// Defino las variables
let nombreJugador = "";
let claseJugador = "";
let claseRival = "";

// Solicito y valido el nombre al usuario
while ( ! validarNombre( nombreJugador ) ) {
    nombreJugador = solicitarNombre();
}

// Solicito y valido la clase del usuario

alert("Seleccione su clase")

while ( ! validarClase( claseJugador ) ) {
    claseJugador = solicitarClase();
}

// Solicito y valido la clase del rival del usuario

alert("Seleccione la clase de su rival")

while ( ! validarClase( claseRival ) ) {
    claseRival = solicitarClase();
}

// Cálculo de stats del jugador

let ataqueJugador = asignarAtaque(claseJugador);
let hpJugador = asignarHp(claseJugador);
let precisionJugador = asignarPrecision(claseJugador);
let evasionJugador = asignarEvasion(claseJugador);
let velocidadJugador = asignarVelocidad(claseJugador);

// Cálculo de stats del rival

let ataqueRival = asignarAtaque(claseRival);
let hpRival = asignarHp(claseRival);
let precisionRival = asignarPrecision(claseRival);
let evasionRival = asignarEvasion(claseRival);
let velocidadRival = asignarVelocidad(claseRival);

// Presento Stats

console.log("Los stats de " + nombreJugador + " son:");
console.log("HP: " + hpJugador );
console.log("Ataque: " + ataqueJugador );
console.log("Precisión: " + precisionJugador );
console.log("Evasión: " + evasionJugador );
console.log("Velocidad: " + velocidadJugador );
console.log("La clase de " + nombreJugador +  " es " + claseJugador );
console.log("*************");
console.log("Los stats del Rival son:");
console.log("HP: " + hpRival );
console.log("Ataque: " + ataqueRival );
console.log("Precisión: " + precisionRival );
console.log("Evasión: " + evasionRival );
console.log("Velocidad: " + velocidadRival );
console.log("La clase del rival es " + claseRival );
console.log("*************");

inicio = confirm("Los stats aparecen en la consola, deseas continuar?");

if ( inicio ) {
    if ( velocidadJugador >= velocidadRival ) {
        while ( hpJugador > 0 && hpRival > 0 ) {
            jugadorAtacar();
            if ( hpRival == 0 ) {
                break
            }
            rivalAtacar();
        }
    } else {
        while ( hpJugador > 0 && hpRival > 0 ) {
            rivalAtacar();
            if ( hpJugador == 0 ) {
                break
            }
            jugadorAtacar();
        }
    }
}

alert("Finalizado");