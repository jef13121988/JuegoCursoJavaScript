// Funciones para la utilización de la distribución estándar
function boxMullerTransform() {
    const u1 = Math.random();
    const u2 = Math.random();
    
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    
    return z0;
}

//                                           20      2
function getNormallyDistributedRandomNumber(mean, stddev) {
    const z0 = boxMullerTransform();
    
    return Math.round(z0 * stddev + mean);
}

// Clase en la que se arma al personaje
class Personaje {
    constructor( raza, clase ) {
        this.raza = raza;
        this.clase = clase;
        this.nivel = 1;
        // Atributos principales
        this.agilidad = this.calcularAtributo();
        this.constitucion = this.calcularAtributo();
        this.destreza = this.calcularAtributo();
        this.fuerza = this.calcularAtributo();
        this.inteligencia = this.calcularAtributo();
        // Atributos derivados
        this.ataque = 0;
        this.vida = 0;
        this.mana = 0;
        this.precision = 0;
        this.evasion = 0;
        this.velocidad = 0;
        this.calculoAgilidad( this.raza, this.clase );
        this.calculoConstitucion( this.raza, this.clase );
        this.calculoDestreza( this.raza, this.clase );
        this.calculoFuerza( this.raza, this.clase );
        this.calculoInteligencia( this.raza, this.clase );
        this.calculoAtaque( this.clase );
        this.calculoVida( this.clase );
        this.calculoMana( this.clase );
        this.calculoPrecision( this.clase );
        this.calculoEvasion( this.clase );
        this.calculoVelocidad( this.clase );
        }
    
    // Cálculo de atributos principales base sin modificadores de raza y clase
    calcularAtributo(){
        return getNormallyDistributedRandomNumber(20, 2);
    }
    
    // Cálculo de los atributos principales inicial en función de la raza y la clase seleccionadas
    calculoAtributosPrincipales( raza, clase ){
        if( raza == "humano" ){
            this.agilidad += 1;
            this.constitucion += 1;
            this.destreza += 1;
            this.fuerza += 1;
            this.inteligencia += 1;
        } else if( raza == "elfo" ){
            this.agilidad += 2;
            this.constitucion += 0;
            this.destreza += 2;
            this.fuerza += -1;
            this.inteligencia += 2;
        } else if( raza == "elfo oscuro" ){
            this.agilidad += 3;
            this.constitucion += -1;
            this.destreza += 3;
            this.fuerza += -1;
            this.inteligencia += 1;
        } else if( raza == "enano" ){
            this.agilidad += -1;
            this.constitucion += 3;
            this.destreza += 1;
            this.fuerza += 2;
            this.inteligencia += 0;
        } else if( raza == "gnomo" ){
            this.agilidad += 2;
            this.constitucion += -1;
            this.destreza += 1;
            this.fuerza += -1;
            this.inteligencia += 4;
        } else {
            this.agilidad += 0;
            this.constitucion += 3;
            this.destreza += 0;
            this.fuerza += 5;
            this.inteligencia += -3;
        }

        if( clase == "rogue" ){
            this.agilidad += 3;
            this.constitucion += 0;
            this.destreza += 3;
            this.fuerza += -1;
            this.inteligencia += 0;
        } else if( clase == "guerrero" ){
            this.agilidad += 0;
            this.constitucion += 1;
            this.destreza += 3;
            this.fuerza += 2;
            this.inteligencia += -1;
        } else {
            this.agilidad += 0;
            this.constitucion += 2;
            this.destreza += 0;
            this.fuerza += 5;
            this.inteligencia += -2;
        }
    }

    // Cálculo de la agilidad inicial en función de la raza y la clase seleccionadas
    calculoAgilidad( raza, clase ){
        if( raza == "humano" ){
            this.agilidad += 1;
        } else if( raza == "elfo" ){
            this.agilidad += 2;
        } else if( raza == "elfo oscuro" ){
            this.agilidad += 3;
        } else if( raza == "enano" ){
            this.agilidad += -1;
        } else if( raza == "gnomo" ){
            this.agilidad += 2;
        } else {
            this.agilidad += 0;
        }

        if( clase == "rogue" ){
            this.agilidad += 3;
        } else if( clase == "guerrero" ){
            this.agilidad += 0;
        } else {
            this.agilidad += 0;
        }
    }

    // Cálculo de la constitucion inicial en función de la raza y la clase seleccionadas
    calculoConstitucion( raza, clase ){
        if( raza == "humano" ){
            this.constitucion += 1;
        } else if( raza == "elfo" ){
            this.constitucion += 0;
        } else if( raza == "elfo oscuro" ){
            this.constitucion += -1;
        } else if( raza == "enano" ){
            this.constitucion += 3;
        } else if( raza == "gnomo" ){
            this.constitucion += -1;
        } else {
            this.constitucion += 3;
        }

        if( clase == "rogue" ){
            this.constitucion += 0;
        } else if( clase == "guerrero" ){
            this.constitucion += 1;
        } else {
            this.constitucion += 2;
        }
    }

    // Cálculo de la destreza inicial en función de la raza y la clase seleccionadas
    calculoDestreza( raza, clase ){
        if( raza == "humano" ){
            this.destreza += 1;
        } else if( raza == "elfo" ){
            this.destreza += 2;
        } else if( raza == "elfo oscuro" ){
            this.destreza += 3;
        } else if( raza == "enano" ){
            this.destreza += 1;
        } else if( raza == "gnomo" ){
            this.destreza += 1;
        } else {
            this.destreza += 0;
        }

        if( clase == "rogue" ){
            this.destreza += 3;
        } else if( clase == "guerrero" ){
            this.destreza += 3;
        } else {
            this.destreza += 0;
        }
    }

    // Cálculo de la fuerza inicial en función de la raza y la clase seleccionadas
    calculoFuerza( raza, clase ){
        if( raza == "humano" ){
            this.fuerza += 1;
        } else if( raza == "elfo" ){
            this.fuerza += -1;
        } else if( raza == "elfo oscuro" ){
            this.fuerza += -1;
        } else if( raza == "enano" ){
            this.fuerza += 2;
        } else if( raza == "gnomo" ){
            this.fuerza += -1;
        } else {
            this.fuerza += 5;
        }

        if( clase == "rogue" ){
            this.fuerza += -1;
        } else if( clase == "guerrero" ){
            this.fuerza += 2;
        } else {
            this.fuerza += 5;
        }
    }

    // Cálculo de la inteligencia inicial en función de la raza y la clase seleccionadas
    calculoInteligencia( raza, clase ){
        if( raza == "humano" ){
            this.inteligencia += 1;
        } else if( raza == "elfo" ){
            this.inteligencia += 2;
        } else if( raza == "elfo oscuro" ){
            this.inteligencia += 1;
        } else if( raza == "enano" ){
            this.inteligencia += 0;
        } else if( raza == "gnomo" ){
            this.inteligencia += 4;
        } else {
            this.inteligencia += -3;
        }

        if( clase == "rogue" ){
            this.inteligencia += 0;
        } else if( clase == "guerrero" ){
            this.inteligencia += -1;
        } else {
            this.inteligencia += -2;
        }
    }

    // Cálculo del ataque inicial en función de la clase seleccionada
    calculoAtaque( clase ){
        if( clase == "rogue" ){
            this.ataque = Math.round(14*(1+(this.agilidad+this.destreza+this.fuerza)/300));
        } else if( clase == "guerrero" ){
            this.ataque = Math.round(17*(1+(this.destreza*0.25+this.fuerza*0.75)/100));
        } else {
            this.ataque = Math.round(22*(1+this.fuerza/100));
        }
    }

    // Cálculo de la vida inicial en función de la clase seleccionada
    calculoVida( clase ){
        if( clase == "rogue" ){
            this.vida = Math.round(30+this.constitucion*3);
        } else if( clase == "guerrero" ){
            this.vida = Math.round(40+this.constitucion*3);
        } else {
            this.vida = Math.round(50+this.constitucion*3);
        }
    }

    // Cálculo del maná inicial en función de la clase seleccionada
    calculoMana( clase ){
        if( clase == "rogue" ){
            this.mana = Math.round(20+this.inteligencia*2);
        } else if( clase == "guerrero" ){
            this.mana = Math.round(15+this.inteligencia);
        } else {
            this.mana = Math.round(10+this.inteligencia);
        }
    }

    // Cálculo de la precisión inicial en función de la clase seleccionada
    calculoPrecision( clase ){
        if( clase == "rogue" ){
            this.precision = Math.round(this.destreza*2);
        } else if( clase == "guerrero" ){
            this.precision = Math.round(this.destreza*2);
        } else {
            this.precision = Math.round(this.destreza*2);
        }
    }

    // Cálculo de la evasión inicial en función de la clase seleccionada
    calculoEvasion( clase ){
        if( clase == "rogue" ){
            this.evasion = Math.round((this.agilidad+this.destreza)*1.5);
        } else if( clase == "guerrero" ){
            this.evasion = Math.round((this.agilidad+this.destreza)*1.2);
        } else {
            this.evasion = Math.round(this.agilidad+this.destreza);
        }
    }

    // Cálculo de la velocidad inicial en función de la clase seleccionada
    calculoVelocidad( clase ){
        if( clase == "rogue" ){
            this.velocidad = Math.round(this.agilidad*1.5);
        } else if( clase == "guerrero" ){
            this.velocidad = Math.round(this.agilidad);
        } else {
            this.velocidad = Math.round(this.agilidad);
        }
    }

}

/* ***** Funciones ***** */

// Solicito el nombre
function solicitarNombre(){
    nombreSolicitado = prompt("Ingrese su nombre de jugador (entre 3 y 15 caracteres)");
    nombreSolicitado = nombreSolicitado.replace(/\s+/g, '');
    return nombreSolicitado
}

// Valido el nombre suministrado por el usuario, entre 3 y 15 caracteres, no puede arrancar con números
function validarNombre(nombre) {
    if ( nombre.length >= 3 && nombre.length <= 15 && isNaN(parseInt(nombre)) ) {
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
