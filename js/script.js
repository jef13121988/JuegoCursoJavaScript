// Clase en la que se arma al personaje
class Personaje {

    /* -------------------------------- Atributos ------------------------------- */

    constructor( nombre, raza, clase ) {

        // Atributos generales
        this.nombre = nombre;
        this.raza = raza;
        this.clase = clase;
        this.nivel = 1; // No tiene aplicación práctica en esta versión, pero se puede aumentar
        this.experiencia = 0; // No tiene aplicación práctica en esta versión
        this.experienciaOtorgada = 50; // No tiene aplicación práctica en esta versión
        this.indice = 0; // Para indexar los personajes del arreglo del pool

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

    // Funciones para la utilización de la distribución estándar
    boxMullerTransform() {
        const u1 = Math.random();
        const u2 = Math.random();
        
        const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
        
        return z0;
    }

    // Función que genera el valor aleatorio (media = 20, desviación estándar = 2)
    getNormallyDistributedRandomNumber(mean, stddev) {
        const z0 = this.boxMullerTransform();
        
        return Math.round(z0 * stddev + mean);
}

    // Cálculo de atributos principales base sin modificadores de raza y clase
    calcularAtributo(){
        return this.getNormallyDistributedRandomNumber(20, 2);
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
            this.fuerza += 4;
            this.inteligencia += -2;
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
            this.fuerza += 4;
            this.inteligencia += -1;
        }
    }

    // Cálculo de los atributos derivados iniciales en función de la clase seleccionada
    calculoAtributosDerivados(){
        if( this.clase === "rogue" ){
            this.ataque = Math.round(14*(1+(this.agilidad+this.destreza+this.fuerza)/300));
            this.vida = Math.round(30+this.constitucion*3);
            this.mana = Math.round(20+this.inteligencia*1.3);
            this.precision = Math.round(this.destreza*2);
            this.evasion = Math.round((this.agilidad*4/3+this.destreza*2/3)*1.5);
            this.velocidad = Math.round(this.agilidad*1.5);
            this.precisionArma = 1;
        } else if( this.clase === "guerrero" ){
            this.ataque = Math.round(19*(1+(this.destreza*0.25+this.fuerza*0.75)/100));
            this.vida = Math.round(40+this.constitucion*3);
            this.mana = Math.round(15+this.inteligencia);
            this.precision = Math.round(this.destreza*2);
            this.evasion = Math.round((this.agilidad*4/3+this.destreza*2/3)*1.3);
            this.velocidad = Math.round(this.agilidad);
            this.precisionArma = 1;
        } else {
            this.ataque = Math.round(25*(1+this.fuerza/100));
            this.vida = Math.round(50+this.constitucion*3);
            this.mana = Math.round(10+this.inteligencia);
            this.precision = Math.round(this.destreza*2);
            this.evasion = Math.round(this.agilidad*4/3+this.destreza*2/3);
            this.velocidad = Math.round(this.agilidad);
            this.precisionArma = 1;
        }
    }

    // Realiza el ataque contra un objetivo
    atacar( objetivo ){
        const controlPrecision = this.precisionAtaque( objetivo );
        let mensaje = "";
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
    precisionAtaque( objetivo ){
        const preciso = this.precisionArma*this.precision/objetivo.evasion;
        const sorteo = Math.random();
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
            this.destreza += 0;
            this.fuerza += 0;
            this.inteligencia += 1;
        } else if( this.raza === "elfo" ){
            this.agilidad += 1;
            this.constitucion += 0;
            this.destreza += 1;
            this.fuerza += -1;
            this.inteligencia += 1;
        } else if( this.raza === "elfo oscuro" ){
            this.agilidad += 2;
            this.constitucion += 0;
            this.destreza += 1;
            this.fuerza += -1;
            this.inteligencia += 0;
        } else if( this.raza === "enano" ){
            this.agilidad += -1;
            this.constitucion += 2;
            this.destreza += 0;
            this.fuerza += 1;
            this.inteligencia += 0;
        } else if( this.raza === "gnomo" ){
            this.agilidad += 1;
            this.constitucion += 0;
            this.destreza += 0;
            this.fuerza += -1;
            this.inteligencia += 2;
        } else {
            this.agilidad += 0;
            this.constitucion += 1;
            this.destreza += 0;
            this.fuerza += 2;
            this.inteligencia += -1;
        }
        
        // Finalmente varía en función de la clase
        if( this.clase === "rogue" ){
            this.agilidad += 2;
            this.constitucion += -1;
            this.destreza += 3;
            this.fuerza += -1;
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

    // Muestra los stats del personaje
    mostrarStats(){
        console.log(`Los stats de ${this.nombre} son:

Atributos generales:
    - Raza: ${this.raza}.
    - Clase: ${this.clase}.
    - Nivel: ${this.nivel}.
    - Experiencia: ${this.experiencia}.
    - Precisión del arma: ${this.precisionArma}.

Atributos principales:
    - Agilidad: ${this.agilidad}.
    - Constitución: ${this.constitucion}.
    - Destreza: ${this.destreza}.
    - Fuerza: ${this.fuerza}.
    - Inteligencia: ${this.inteligencia}.

Atributos derivados:
    - Ataque: ${this.ataque}.
    - Vida: ${this.vida}.
    - Maná: ${this.mana}.
    - Precisión: ${this.precision}.
    - Evasión: ${this.evasion}.
    - Velocidad: ${this.velocidad}.

`)
    }

    // Realiza la copia de un personaje
    copiarPersonaje(){
        // crea una instancia de la clase
        const copia = new Personaje( this.nombre, this.raza, this.clase );

        // Copia los valores en la nueva instancia
        copia.nivel = this.nivel;
        copia.nivel = this.experiencia;
        copia.nivel = this.experienciaOtorgada;
        copia.nivel = this.indice;
        copia.agilidad = this.agilidad;
        copia.constitucion = this.constitucion;
        copia.destreza = this.destreza;
        copia.fuerza = this.fuerza;
        copia.inteligencia = this.inteligencia;
        copia.ataque = this.ataque;
        copia.vida = this.vida;
        copia.mana = this.mana;
        copia.precision = this.precision;
        copia.evasion = this.evasion;
        copia.velocidad = this.velocidad;
        copia.precisionArma = this.precisionArma;

        return copia;
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
            this.arreglo[i].indice = i + 1;
        }

    }
    
    // Busco el máximo en agilidad
    maxAgilidad(){
        // Calculo el máximo
        const maximo=this.arreglo.reduce((acumulado,item)=>((acumulado<item.agilidad) ? (acumulado=item.agilidad) : acumulado),0);

        // Filtro el máximo y lo retorno
        return this.arreglo.filter(item => item.agilidad === maximo);
    }

    // Busco el máximo en constitución
    maxConstitucion(){
        // Calculo el máximo
        const maximo=this.arreglo.reduce((acumulado,item)=>((acumulado<item.constitucion) ? (acumulado=item.constitucion) : acumulado),0);

        // Filtro el máximo y lo retorno
        return this.arreglo.filter(item => item.constitucion === maximo);
    }

    // Busco el máximo en destreza
    maxDestreza(){
        // Calculo el máximo
        const maximo=this.arreglo.reduce((acumulado,item)=>((acumulado<item.destreza) ? (acumulado=item.destreza) : acumulado),0);

        // Filtro el máximo y lo retorno
        return this.arreglo.filter(item => item.destreza === maximo);
    }

    // Busco el máximo en fuerza
    maxFuerza(){
        // Calculo el máximo
        const maximo=this.arreglo.reduce((acumulado,item)=>((acumulado<item.fuerza) ? (acumulado=item.fuerza) : acumulado),0);

        // Filtro el máximo y lo retorno
        return this.arreglo.filter(item => item.fuerza === maximo);
    }

    // Busco el máximo en inteligencia
    maxInteligencia(){
        // Calculo el máximo
        const maximo=this.arreglo.reduce((acumulado,item)=>((acumulado<item.inteligencia) ? (acumulado=item.inteligencia) : acumulado),0);

        // Filtro el máximo y lo retorno
        return this.arreglo.filter(item => item.inteligencia === maximo);
    }

    // Busco el máximo en ataque
    maxAtaque(){
        // Calculo el máximo
        const maximo=this.arreglo.reduce((acumulado,item)=>((acumulado<item.ataque) ? (acumulado=item.ataque) : acumulado),0);

        // Filtro el máximo y lo retorno
        return this.arreglo.filter(item => item.ataque === maximo);
    }

    // Busco el máximo en vida
    maxVida(){
        // Calculo el máximo
        const maximo=this.arreglo.reduce((acumulado,item)=>((acumulado<item.vida) ? (acumulado=item.vida) : acumulado),0);

        // Filtro el máximo y lo retorno
        return this.arreglo.filter(item => item.vida === maximo);
    }

    // Busco el máximo en maná
    maxMana(){
        // Calculo el máximo
        const maximo=this.arreglo.reduce((acumulado,item)=>((acumulado<item.mana) ? (acumulado=item.mana) : acumulado),0);

        // Filtro el máximo y lo retorno
        return this.arreglo.filter(item => item.mana === maximo);
    }

    // Busco el máximo en precisión
    maxPrecision(){
        // Calculo el máximo
        const maximo=this.arreglo.reduce((acumulado,item)=>((acumulado<item.precision) ? (acumulado=item.precision) : acumulado),0);

        // Filtro el máximo y lo retorno
        return this.arreglo.filter(item => item.precision === maximo);
    }

    // Busco el máximo en evasión
    maxEvasion(){
        // Calculo el máximo
        const maximo=this.arreglo.reduce((acumulado,item)=>((acumulado<item.evasion) ? (acumulado=item.evasion) : acumulado),0);

        // Filtro el máximo y lo retorno
        return this.arreglo.filter(item => item.evasion === maximo);
    }

    // Busco el máximo en velocidad
    maxVelocidad(){
        // Calculo el máximo
        const maximo=this.arreglo.reduce((acumulado,item)=>((acumulado<item.velocidad) ? (acumulado=item.velocidad) : acumulado),0);

        // Filtro el máximo y lo retorno
        return this.arreglo.filter(item => item.velocidad === maximo);
    }

}

class ElJuego {

    /* -------------------------------- Atributos ------------------------------- */

    constructor(){

        this.nombre = "";
        this.raza = "";
        this.clase = "";
        this.nombreRival = "";
        this.jugador = "";
        this.jugadorRival = "";

        this.controlNombre();
        this.controlRaza();
        this.controlClase();
        this.controlNombreRival();
        this.crearJugadorRival();
        this.empezar();

    }

    /* --------------------------------- Métodos -------------------------------- */
    
    // Solicito el nombre
    solicitarNombre(){
        let nombreSolicitado = prompt("Ingrese su nombre de jugador (entre 3 y 15 caracteres)");
        nombreSolicitado = nombreSolicitado.replace(/\s+/g, ''); // Elimino los espacios
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
        nombreSolicitado = nombreSolicitado.replace(/\s+/g, ''); // Elimino los espacios
        return nombreSolicitado;
    }

    // Solicito y valido el nombre del rival
    controlNombreRival(){
        while ( ! this.validarNombre( this.nombreRival ) ) {
            this.nombreRival = this.solicitarNombreRival();
        }
    }

    // Solicito la raza
    solicitarRaza(){
        let razaSolicitada = prompt("Ingrese una raza ('h' = humano, 'e' = elfo, 'eo' = elfo oscuro, 'en' = enano, 'g' = gnomo, 'o' = orco, 'a' = aleatorio)");
        razaSolicitada = razaSolicitada.toLowerCase();

        if ( razaSolicitada === "a" ) {
            const sorteo = Math.random();
            if ( sorteo > 5/6 ) {
                razaSolicitada = "h";
            } else if ( sorteo > 2/3 ){
                razaSolicitada = "e";
            } else if ( sorteo > 0.5 ){
                razaSolicitada = "eo";
            } else if ( sorteo > 1/3 ){
                razaSolicitada = "en";
            } else if ( sorteo > 1/6 ){
                razaSolicitada = "g";
            } else {
                razaSolicitada = "o";
            }
        }

        return razaSolicitada
    }

    // Valido la raza suministrada por el usuario, puede ser: 'h' = humano, 'e' = elfo, 'eo' = elfo oscuro,
    // 'en' = enano, 'g' = gnomo, 'o' = orco, 'a' = aleatorio, este último se sortea en la función solicitarRaza()
    validarRaza( raza ) {
        if ( raza === "h" || raza === "e" || raza === "eo" || raza === "en" || raza === "g" || raza === "o" ) {
            return true
        } else {
            return false
        }
    }

    // Solicito y valido la raza del usuario
    controlRaza(){
        while ( ! this.validarRaza( this.raza ) ) {
            this.raza = this.solicitarRaza();
        }

        if ( this.raza === "h" ) {
            this.raza = "humano";
        } else if ( this.raza === "e" ) {
            this.raza = "elfo";
        } else if ( this.raza === "eo" ) {
            this.raza = "elfo oscuro";
        } else if ( this.raza === "en" ) {
            this.raza = "enano";
        } else if ( this.raza === "g" ) {
            this.raza = "gnomo";
        } else {
            this.raza = "orco";
        }

    }

    // Solicito la clase
    solicitarClase(){
        let claseSolicitada = prompt("Ingrese una clase ('g' = guerrero, 'b' = bárbaro, 'r' = rogue, 'a' = aleatorio)");
        claseSolicitada = claseSolicitada.toLowerCase();

        if ( claseSolicitada === "a" ) {
            const sorteo = Math.random();
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
        if ( clase === "g" || clase === "b" || clase === "r" ) {
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

        if ( this.clase === "g" ) {
            this.clase = "guerrero";
        } else if ( this.clase === "b" ) {
            this.clase = "bárbaro";
        } else {
            this.clase = "rogue";
        }

    }

    // Creo el pool de personajes e indico como interactuar
    empezar(){
        this.personajes = new PoolPersonajes( this.nombre, this.raza, this.clase );

        alert(`Se crearon 10 personajes con los parámetros indicados para que pueda elegir el más conveniente.`);

        alert(`Escribiendo en la consola 'juego.personajes.funcion()', siendo 'funcion()' la función de máximos deseada, puede ir navegando indagando en los atributos de los personajes.`);
        
        alert(`Se accede al array mediante 'juego.personajes.arreglo', así se podrá visualizar personajes específicos o aplicar funciones de arrays.`);

        alert(`Cuando haya definido el personaje a utilizar, fíjese el el índice del mismo, escribe en la consola 'juego.seguir()' y se le solicitará el índice seleccionado.`);

        console.log(`Se crearon 10 personajes con los parámetros indicados para que pueda elegir el más conveniente.

Escribiendo en la consola 'juego.personajes.funcion()', siendo 'funcion()' la función de máximos deseada, puede ir navegando indagando en los atributos de los personajes.

Se accede al array mediante 'juego.personajes.arreglo', así se podrá visualizar personajes específicos o aplicar funciones de arrays.

Cuando haya definido el personaje a utilizar, fíjese el el índice del mismo, escribe en la consola 'juego.seguir()' y se le solicitará el índice seleccionado.
        `);

    }

    // Se selecciona un personaje para que el juego avance
    seguir(){
        let personajeElegido = prompt("Indique el índice del personaje con el que desea continuar");

        while ( isNaN(parseInt(personajeElegido)) || parseInt(personajeElegido)<1 || parseInt(personajeElegido)>10 ){
            personajeElegido = prompt("Indique el índice del personaje con el que desea continuar");
        }

        personajeElegido = parseInt(personajeElegido)-1;

        this.jugador = this.personajes.arreglo[personajeElegido];

        this.jugador.mostrarStats();
        this.jugadorRival.mostrarStats();

        const combatir = confirm(`Los stats aparecen en la consola.
Confirme si quiere iniciar el combate o finalizamos`);

        if ( combatir ){
            this.combate( this.jugador, this.jugadorRival );
        }
        
    }

    // Creo al personaje del rival
    crearJugadorRival(){
        let razaRival = "";
        let claseRival = "";

        // Sorteo la raza
        const sorteo1 = Math.random();
        if ( sorteo1 > 5/6 ) {
            razaRival = "humano";
        } else if ( sorteo1 > 2/3 ){
            razaRival = "elfo";
        } else if ( sorteo1 > 0.5 ){
            razaRival = "elfo oscuro";
        } else if ( sorteo1 > 1/3 ){
            razaRival = "enano";
        } else if ( sorteo1 > 1/6 ){
            razaRival = "gnomo";
        } else {
            razaRival = "orco";
        }

        // Sorteo la clase
        const sorteo2 = Math.random();
        if ( sorteo2 > 0.67 ) {
            claseRival = "guerrero";
        } else if ( sorteo2 > 0.34 ){
            claseRival = "bárbaro";
        } else {
            claseRival = "rogue";
        }

        // Creo el personaje
        this.jugadorRival = new Personaje( this.nombreRival, razaRival, claseRival )
        this.jugadorRival.indice = -1;
    }

    // La función controla la velocidad y da lugar al combate entre los jugadores
    combate( player1, player2 ){

        // Realiza una copia para no pisar los atributos originales
        const jugador1 = player1.copiarPersonaje();
        const jugador2 = player2.copiarPersonaje();

        while( jugador1.vida > 0 && jugador2.vida >0 ){

            if( jugador1.velocidad > jugador2.velocidad ){
                jugador1.atacar( jugador2 );

                if( jugador2.vida > 0 ){
                    jugador2.atacar( jugador1 );
                }
                
            } else if( jugador1.velocidad < jugador2.velocidad ){
                jugador2.atacar( jugador1 );

                if( jugador1.vida > 0 ){
                    jugador1.atacar( jugador2 );
                }

            } else {
                const sorteo = Math.random();

                if( sorteo >= 0.5){
                    jugador1.atacar( jugador2 );

                    if( jugador2.vida > 0 ){
                        jugador2.atacar( jugador1 );
                    }

                } else {
                    jugador2.atacar( jugador1 );

                    if( jugador1.vida > 0 ){
                        jugador1.atacar( jugador2 );
                    }

                }

            }
        }

        const jugarDeNuevo = confirm("¿Desea jugar de nuevo?");

        if( jugarDeNuevo ){
            console.log("********************");
            this.combate( player1, player2 );
        } else {
            alert("Juego finalizado.");
        }

    }

    // hacer control con velocidad ataque, inicia el ataque del jugador y del rival
    // iniciar pelea

}

// Creo una instancia del juego
//const juego = new ElJuego();

const seccion = document.querySelector('#seccion')
const iniciarJuegos = document.querySelector('#iniciarJuego');
let elNombre = "";
const razas = [
    { id: 0, nombre: "Elfo", ruta: "e-r" },
    { id: 1, nombre: "Elfo Oscuro", ruta: "eo-r" },
    { id: 2, nombre: "Enano", ruta: "en-b" },
    { id: 3, nombre: "Gnomo", ruta: "g-r" },
    { id: 4, nombre: "Humano", ruta: "h-g" },
    { id: 5, nombre: "Orco", ruta: "o-b" }
]

const clases = [
    { id: 0, nombre: "Bárbaro", ruta: "eo-b" },
    { id: 1, nombre: "Guerrero", ruta: "eo-g" },
    { id: 2, nombre: "Rogue", ruta: "eo-r" }
]

function indicarNombre(){
    seccion.innerHTML = `<div class="row justify-content-center">
                            <input id="nombreIndicado" class="col" type="text" placeholder="Complete su nombre"></input>
                        </div>
                        <div class="row justify-content-center">
                            <button id="nombreSubmitido" class="col"> Enviar </button>
                        </div>`;

    const nombreIndicados = document.querySelector('#nombreIndicado');
    const nombreSubmitidos = document.querySelector('#nombreSubmitido');
    nombreSubmitidos.addEventListener('click', () => {
        elNombre = nombreIndicados.value;
        seleccionRaza();
    })
}

function seleccionRaza(){
    seccion.innerHTML = `<div id="cajaRaza" class="row justify-content-center m-4"></div>`;
    const divRaza = document.querySelector('#cajaRaza');
    console.log(seccion.innerHTML);
    razas.forEach( raza => {
        divRaza.innerHTML += `<div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 d-flex flex-column">
                                <h3 class="titulo tituloResponsive"> ${raza.nombre} </h3>
                                <img id="${raza.ruta}" class="imgPersonaje" src="../img/${raza.ruta}.jpg" alt="Imagen de un ${raza.nombre}">
                            </div>`;
    });

    const imgRazas = document.querySelectorAll('.imgPersonaje');

    imgRazas.forEach( imgRaza => {
        imgRaza.addEventListener('click', listenerRaza);
    });
}

function listenerRaza(evento){
    console.log( evento.target );
    const id = evento.target.id;
    console.log( id );
    seleccionClase();

    const imgRazas = document.querySelectorAll('.imgPersonaje');

    imgRazas.forEach( imgRaza => {
        imgRaza.removeEventListener('click', listenerRaza);
    });
}

function seleccionClase(){
    seccion.innerHTML = `<div id="cajaRaza" class="row justify-content-center m-4"></div>`;
    const divClase = document.querySelector('#cajaRaza');
    console.log(seccion.innerHTML);
    clases.forEach( clase => {
        divClase.innerHTML += `<div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 d-flex flex-column">
                                <h3 class="titulo tituloResponsive"> ${clase.nombre} </h3>
                                <img id="${clase.ruta}" class="imgPersonaje" src="../img/${clase.ruta}.jpg" alt="Imagen de un ${clase.nombre}">
                            </div>`;
    });

    const imgClases = document.querySelectorAll('.imgPersonaje');

    imgClases.forEach( imgClase => {
        imgClase.addEventListener('click', listenerClase);
    });
}

function listenerClase(evento){
    console.log( evento.target );
    const id = evento.target.id;
    console.log( id );
    seleccionClase();

    const imgClases = document.querySelectorAll('.imgPersonaje');

    imgClases.forEach( imgClase => {
        imgClase.removeEventListener('click', listenerClase);
    });
}

iniciarJuegos.addEventListener('click', () => {indicarNombre()});

