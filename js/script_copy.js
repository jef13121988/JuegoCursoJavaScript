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

    /* -------------------------------- Atributos ------------------------------- */

    constructor( nombre, raza, clase ) {

        this.nombre = nombre;
        this.raza = raza;
        this.clase = clase;
        this.nivel = 1; // No tiene aplicación práctica en esta versión, pero se puede aumentar
        this.experiencia = 0;
        this.experienciaOtorgada = 50;

        // Atributos principales
        this.agilidad = this.calcularAtributo();
        this.constitucion = this.calcularAtributo();
        this.destreza = this.calcularAtributo();
        this.fuerza = this.calcularAtributo();
        this.inteligencia = this.calcularAtributo(); // No tiene aplicación práctica en esta versión, pero se puede aumentar
        // Atributos derivados
        this.ataque = 0;
        this.vida = 0;
        this.mana = 0; // No tiene aplicación práctica en esta versión, pero se puede aumentar
        this.precision = 0;
        this.evasion = 0;
        this.velocidad = 0;
        this.precisionArma = 0;

        // Métodos para definir atributos
        this.calculoAtributosPrincipales();
        this.calculoAtributosDerivados();
    }
    
    /* --------------------------------- Métodos -------------------------------- */

    // Cálculo de atributos principales base sin modificadores de raza y clase
    calcularAtributo(){
        return getNormallyDistributedRandomNumber(20, 2);
    }
    
    // Cálculo de los atributos principales iniciales en función de la raza y la clase seleccionadas
    calculoAtributosPrincipales(){
        if( this.raza === "humano" ){
            this.agilidad += 1;
            this.constitucion += 1;
            this.destreza += 1;
            this.fuerza += 1;
            this.inteligencia += 1;
        } else if( this.raza === "elfo" ){
            this.agilidad += 2;
            this.constitucion += 0;
            this.destreza += 2;
            this.fuerza += -1;
            this.inteligencia += 2;
        } else if( this.raza === "elfo oscuro" ){
            this.agilidad += 3;
            this.constitucion += -1;
            this.destreza += 3;
            this.fuerza += -1;
            this.inteligencia += 1;
        } else if( this.raza === "enano" ){
            this.agilidad += -1;
            this.constitucion += 3;
            this.destreza += 1;
            this.fuerza += 2;
            this.inteligencia += 0;
        } else if( this.raza === "gnomo" ){
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

        if( this.clase === "rogue" ){
            this.agilidad += 3;
            this.constitucion += 0;
            this.destreza += 3;
            this.fuerza += -1;
            this.inteligencia += 0;
        } else if( this.clase === "guerrero" ){
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

    // Cálculo de los atributos derivados iniciales en función de la clase seleccionada
    calculoAtributosDerivados(){
        if( this.clase === "rogue" ){
            this.ataque = Math.round(14*(1+(this.agilidad+this.destreza+this.fuerza)/300));
            this.vida = Math.round(30+this.constitucion*3);
            this.mana = Math.round(20+this.inteligencia*2);
            this.precision = Math.round(this.destreza*2);
            this.evasion = Math.round((this.agilidad+this.destreza)*1.5);
            this.velocidad = Math.round(this.agilidad*1.5);
            this.precisionArma = 1;
        } else if( this.clase === "guerrero" ){
            this.ataque = Math.round(17*(1+(this.destreza*0.25+this.fuerza*0.75)/100));
            this.vida = Math.round(40+this.constitucion*3);
            this.mana = Math.round(15+this.inteligencia);
            this.precision = Math.round(this.destreza*2);
            this.evasion = Math.round((this.agilidad+this.destreza)*1.2);
            this.velocidad = Math.round(this.agilidad);
            this.precisionArma = 0.95;
        } else {
            this.ataque = Math.round(22*(1+this.fuerza/100));
            this.vida = Math.round(50+this.constitucion*3);
            this.mana = Math.round(10+this.inteligencia);
            this.precision = Math.round(this.destreza*2);
            this.evasion = Math.round(this.agilidad+this.destreza);
            this.velocidad = Math.round(this.agilidad);
            this.precisionArma = 0.9;
        }
    }

    // Realiza el ataque contra un objetivo
    atacar( objetivo ){
        controlPrecision = precisiónAtaque(objetivo);
        if ( controlPrecision ) {
            objetivo.vida = objetivo.vida - this.ataque;
            if ( objetivo.vida <= 0 ) {
                mensaje = `${this.nombre} ha ganado. ${objetivo.nombre} ha sido derrotado`;
                objetivo.vida = 0;
            } else {
                mensaje = `A ${objetivo.nombre} le queda ${objetivo.vida} de vida`;
            }
        } else {
            mensaje = `El ataque de ${this.nombre} ha fallado`;
        }
        console.log(mensaje);
    }

    // Define si el ataque va a impactar
    precisiónAtaque( objetivo ){
        preciso = this.precisionArma*this.precision/objetivo.evasion;
        sorteo = Math.random();
        if ( preciso >= sorteo ) {
            return true;
        } else {
            return false;
        }
    }

    // Aumenta en un nivel y actualiza los atributos
    subirNivel(){
        this.nivel += 1
        this.experiencia = 0;

        // Se le agrega un mínimo a cada habilidad
        this.agilidad += 5;
        this.constitucion += 5;
        this.destreza += 5;
        this.fuerza += 5;
        this.inteligencia += 5;

        // Luego varía en función de la raza
        if( this.raza === "humano" ){
            this.agilidad += 0;
            this.constitucion += 1;
            this.destreza += 1;
            this.fuerza += 0;
            this.inteligencia += 1;
        } else if( this.raza === "elfo" ){
            this.agilidad += 1;
            this.constitucion += 0;
            this.destreza += 1;
            this.fuerza += 0;
            this.inteligencia += 1;
        } else if( this.raza === "elfo oscuro" ){
            this.agilidad += 2;
            this.constitucion += 0;
            this.destreza += 1;
            this.fuerza += 0;
            this.inteligencia += 0;
        } else if( this.raza === "enano" ){
            this.agilidad += 0;
            this.constitucion += 2;
            this.destreza += 0;
            this.fuerza += 1;
            this.inteligencia += 0;
        } else if( this.raza === "gnomo" ){
            this.agilidad += 1;
            this.constitucion += 0;
            this.destreza += 0;
            this.fuerza += 0;
            this.inteligencia += 2;
        } else {
            this.agilidad += 0;
            this.constitucion += 1;
            this.destreza += 0;
            this.fuerza += 2;
            this.inteligencia += 0;
        }
        
        // Finalmente varía en función de la clase
        if( this.clase === "rogue" ){
            this.agilidad += 2;
            this.constitucion += -1;
            this.destreza += 2;
            this.fuerza += 0;
            this.inteligencia += 0;
        } else if( this.clase === "guerrero" ){
            this.agilidad += -1;
            this.constitucion += 1;
            this.destreza += 2;
            this.fuerza += 2;
            this.inteligencia += -1;
        } else {
            this.agilidad += -1;
            this.constitucion += 2;
            this.destreza += 0;
            this.fuerza += 3;
            this.inteligencia += -1;
        }

        calculoAtributosDerivados();
    }

}

// Clase que arma el pool con 10 personajes para elegir al que tenga mejores atributos
class PoolPersonajes {

    /* -------------------------------- Atributos ------------------------------- */

    constructor( nombre, raza, clase ) {

        this.nombre = nombre;
        this.raza = raza;
        this.clase = clase;
        this.arreglo = [];

        this.crearPersonajes();
    }

    /* --------------------------------- Métodos -------------------------------- */

    // Creo el array con 10 Personajes
    crearPersonajes(){
        for (let i = 0; i < 10; i++) {
            this.arreglo.push(new Personaje( this.nombre, this.raza, this.clase ));
        }

    }
    
    // Busco el máximo en agilidad
    calcularMaxAgilidad(){
        // Calculo el máximo
        const maximo=this.arreglo.reduce((acumulado,item)=>((acumulado<item.agilidad) ? (acumulado=item.agilidad) : acumulado),0);

        // Filtro el máximo y lo retorno
        return this.arreglo.filter(item => item.agilidad === maximo);
    }

    // Busco el máximo en constitución
    calcularMaxConstitucion(){
        // Calculo el máximo
        const maximo=this.arreglo.reduce((acumulado,item)=>((acumulado<item.constitucion) ? (acumulado=item.constitucion) : acumulado),0);

        // Filtro el máximo y lo retorno
        return this.arreglo.filter(item => item.constitucion === maximo);
    }

    // Busco el máximo en destreza
    calcularMaxDestreza(){
        // Calculo el máximo
        const maximo=this.arreglo.reduce((acumulado,item)=>((acumulado<item.destreza) ? (acumulado=item.destreza) : acumulado),0);

        // Filtro el máximo y lo retorno
        return this.arreglo.filter(item => item.destreza === maximo);
    }

    // Busco el máximo en fuerza
    calcularMaxFuerza(){
        // Calculo el máximo
        const maximo=this.arreglo.reduce((acumulado,item)=>((acumulado<item.fuerza) ? (acumulado=item.fuerza) : acumulado),0);

        // Filtro el máximo y lo retorno
        return this.arreglo.filter(item => item.fuerza === maximo);
    }

    // Busco el máximo en inteligencia
    calcularMaxInteligencia(){
        // Calculo el máximo
        const maximo=this.arreglo.reduce((acumulado,item)=>((acumulado<item.inteligencia) ? (acumulado=item.inteligencia) : acumulado),0);

        // Filtro el máximo y lo retorno
        return this.arreglo.filter(item => item.inteligencia === maximo);
    }

    // Busco el máximo en ataque
    calcularMaxAtaque(){
        // Calculo el máximo
        const maximo=this.arreglo.reduce((acumulado,item)=>((acumulado<item.ataque) ? (acumulado=item.ataque) : acumulado),0);

        // Filtro el máximo y lo retorno
        return this.arreglo.filter(item => item.ataque === maximo);
    }

    // Busco el máximo en vida
    calcularMaxVida(){
        // Calculo el máximo
        const maximo=this.arreglo.reduce((acumulado,item)=>((acumulado<item.vida) ? (acumulado=item.vida) : acumulado),0);

        // Filtro el máximo y lo retorno
        return this.arreglo.filter(item => item.vida === maximo);
    }

    // Busco el máximo en maná
    calcularMaxMana(){
        // Calculo el máximo
        const maximo=this.arreglo.reduce((acumulado,item)=>((acumulado<item.mana) ? (acumulado=item.mana) : acumulado),0);

        // Filtro el máximo y lo retorno
        return this.arreglo.filter(item => item.mana === maximo);
    }

    // Busco el máximo en precisión
    calcularMaxPrecision(){
        // Calculo el máximo
        const maximo=this.arreglo.reduce((acumulado,item)=>((acumulado<item.precision) ? (acumulado=item.precision) : acumulado),0);

        // Filtro el máximo y lo retorno
        return this.arreglo.filter(item => item.precision === maximo);
    }

    // Busco el máximo en evasión
    calcularMaxEvasion(){
        // Calculo el máximo
        const maximo=this.arreglo.reduce((acumulado,item)=>((acumulado<item.evasion) ? (acumulado=item.evasion) : acumulado),0);

        // Filtro el máximo y lo retorno
        return this.arreglo.filter(item => item.evasion === maximo);
    }

    // Busco el máximo en velocidad
    calcularMaxVelocidad(){
        // Calculo el máximo
        const maximo=this.arreglo.reduce((acumulado,item)=>((acumulado<item.velocidad) ? (acumulado=item.velocidad) : acumulado),0);

        // Filtro el máximo y lo retorno
        return this.arreglo.filter(item => item.velocidad === maximo);
    }

}

class Juego {

    /* -------------------------------- Atributos ------------------------------- */

    constructor(){

        this.nombre = "";
        this.raza = "";
        this.clase = "";
        this.nombreRival = "";

        this.controlNombre();
        this.controlNombreRival();
    }

    /* --------------------------------- Métodos -------------------------------- */
    
    // Solicito el nombre
    solicitarNombre(){
        let nombreSolicitado = prompt("Ingrese su nombre de jugador (entre 3 y 15 caracteres)");
        nombreSolicitado = nombreSolicitado.replace(/\s+/g, '');
        return nombreSolicitado;
    }

    // Valido el nombre suministrado por el usuario, entre 3 y 15 caracteres, no puede arrancar con números
    validarNombre( nombre ) {
        if ( nombre.length >= 3 && nombre.length <= 15 && isNaN(parseInt(nombre)) ) {
            return true;
        } else {
            return false;
        }
    }

    // Solicito y valido el nombre al usuario
    controlNombre(){
        while ( ! this.validarNombre( this.nombre ) ) {
            this.nombre = this.solicitarNombre();
        }
    }

    // Solicito el nombre del rival
    solicitarNombreRival(){
        let nombreSolicitado = prompt("Ingrese el nombre de su rival (entre 3 y 15 caracteres)");
        nombreSolicitado = nombreSolicitado.replace(/\s+/g, '');
        return nombreSolicitado;
    }

    // Solicito y valido el nombre del rival
    controlNombreRival(){
        while ( ! this.validarNombre( this.nombreRival ) ) {
            this.nombreRival = this.solicitarNombreRival();
        }
    }

    // Solicito la clase
    solicitarClase(){
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
    validarClase( clase ) {
        if ( clase == "g" || clase == "b" || clase == "r" ) {
            return true
        } else {
            return false
        }
    }

    // Solicito y valido la clase del usuario
    controlClase(){
        while ( ! this.validarClase( this.clase ) ) {
            this.clase = this.solicitarClase();
        }
    }
    // hacer control con velocidad ataque, inicia el ataque del jugador y del rival
    // generar rival
    // solicitar raza y clase
    // definir raza y clase para crear Personaje
}

/* ***** Funciones ***** */


/* Empiezo a crear variables y a utilizar las funciones */

// Solicito y valido la clase del rival del usuario

alert("Seleccione la clase de su rival")

while ( ! validarClase( claseRival ) ) {
    claseRival = solicitarClase();
}

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
