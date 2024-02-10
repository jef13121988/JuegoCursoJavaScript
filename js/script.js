// Clase en la que se arma al personaje
class Personaje {

    /* -------------------------------- Atributos ------------------------------- */

    constructor( nombre, raza, clase, imagen ) {

        // Atributos generales
        this.nombre = nombre;
        this.raza = raza.toLowerCase();
        this.clase = clase.toLowerCase();
        this.imagen = imagen;
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
                mensaje = `${this.nombre} ha ganado. ${objetivo.nombre} ha sido derrotado.<br>`;
                objetivo.vida = 0;
            } else {
                mensaje = `El ataque de ${this.nombre} dejó a ${objetivo.nombre} con ${objetivo.vida} de vida.<br>`;
            }
        } else {
            mensaje = `El ataque de ${this.nombre} ha fallado.<br>`;
        }
        
        return mensaje;
    }

    // Define si el ataque va a impactar
    precisionAtaque( objetivo ){
        const preciso = this.precisionArma*this.precision/objetivo.evasion;
        const sorteo = Math.random();
        return ( preciso >= sorteo ) ? true: false;

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
    mostrarStats( caja, trueOrFalse ){

        if ( trueOrFalse ) {

            caja.innerText = `Los stats de ${this.nombre} son:

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

Personaje número: ${this.indice}

`;

        } else {
            caja.innerText = `Los stats de ${this.nombre} son:

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

`;
            
        }
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

// Clase que arma el pool con 9 personajes para elegir al que tenga mejores atributos
class PoolPersonajes {

    /* -------------------------------- Atributos ------------------------------- */

    constructor( nombre, raza, clase, imagen ) {

        this.nombre = nombre;
        this.raza = raza;
        this.clase = clase;
        this.imagen = imagen;
        this.arreglo = [];

        this.crearPersonajes();
    }

    /* --------------------------------- Métodos -------------------------------- */

    // Creo el array con 9 Personajes
    crearPersonajes(){
        for (let i = 0; i < 9; i++) {
            this.arreglo.push(new Personaje( this.nombre, this.raza, this.clase, this.imagen ));
            this.arreglo[i].indice = i + 1;
        }

    }
    
    // Busco el máximo en agilidad
    maxAgilidad(){
        // Calculo el máximo
        const maximo = Math.max( ...this.arreglo.map( item => item.agilidad ) );

        // Filtro el máximo y lo retorno
        return this.arreglo.filter(item => item.agilidad === maximo);
    }

    // Busco el máximo en constitución
    maxConstitucion(){
        // Calculo el máximo
        const maximo = Math.max( ...this.arreglo.map( item => item.constitucion ) );

        // Filtro el máximo y lo retorno
        return this.arreglo.filter(item => item.constitucion === maximo);
    }

    // Busco el máximo en destreza
    maxDestreza(){
        // Calculo el máximo
        const maximo = Math.max( ...this.arreglo.map( item => item.destreza ) );

        // Filtro el máximo y lo retorno
        return this.arreglo.filter(item => item.destreza === maximo);
    }

    // Busco el máximo en fuerza
    maxFuerza(){
        // Calculo el máximo
        const maximo = Math.max( ...this.arreglo.map( item => item.fuerza ) );

        // Filtro el máximo y lo retorno
        return this.arreglo.filter(item => item.fuerza === maximo);
    }

    // Busco el máximo en inteligencia
    maxInteligencia(){
        // Calculo el máximo
        const maximo = Math.max( ...this.arreglo.map( item => item.inteligencia ) );

        // Filtro el máximo y lo retorno
        return this.arreglo.filter(item => item.inteligencia === maximo);
    }

    // Busco el máximo en ataque
    maxAtaque(){
        // Calculo el máximo
        const maximo = Math.max( ...this.arreglo.map( item => item.ataque ) );

        // Filtro el máximo y lo retorno
        return this.arreglo.filter(item => item.ataque === maximo);
    }

    // Busco el máximo en vida
    maxVida(){
        // Calculo el máximo
        const maximo = Math.max( ...this.arreglo.map( item => item.vida ) );

        // Filtro el máximo y lo retorno
        return this.arreglo.filter(item => item.vida === maximo);
    }

    // Busco el máximo en maná
    maxMana(){
        // Calculo el máximo
        const maximo = Math.max( ...this.arreglo.map( item => item.mana ) );

        // Filtro el máximo y lo retorno
        return this.arreglo.filter(item => item.mana === maximo);
    }

    // Busco el máximo en precisión
    maxPrecision(){
        // Calculo el máximo
        const maximo = Math.max( ...this.arreglo.map( item => item.precision ) );

        // Filtro el máximo y lo retorno
        return this.arreglo.filter(item => item.precision === maximo);
    }

    // Busco el máximo en evasión
    maxEvasion(){
        // Calculo el máximo
        const maximo = Math.max( ...this.arreglo.map( item => item.evasion ) );

        // Filtro el máximo y lo retorno
        return this.arreglo.filter(item => item.evasion === maximo);
    }

    // Busco el máximo en velocidad
    maxVelocidad(){
        // Calculo el máximo
        const maximo = Math.max( ...this.arreglo.map( item => item.velocidad ) );

        // Filtro el máximo y lo retorno
        return this.arreglo.filter(item => item.velocidad === maximo);
    }

}

// Clase que hace que el juego avance en las distintas pantallas
class ElJuego {

    /* -------------------------------- Atributos ------------------------------- */

    constructor(){

        this.referencia; // Para los Event Listeners
        this.nombre = ""; // Nombre seleccionado
        this.raza = ""; // Raza seleccionada
        this.clase = ""; // Clase seleccionada
        this.imagen = ""; // Imagen seleccionada
        this.nombreRival = ""; // Nombre seleccionado del rival
        this.jugador = ""; // Personaje creado para el jugador
        this.jugadorRival = ""; // Personaje creado para el rival
        this.personajes = ""; // 9 personajes creados para que pueda elegir
        this.mensaje = ""; // Lista los eventos del combate
        [ this.victoriasJugador, this.victoriasRival ] = this.descargarJSON(); // Levanta del storage las victorias del jugador, de existir
        //this.victoriasRival = 0; // Levanta del storage las victorias del rival, de existir
        // Selecciono la sección que se va a modificar
        this.seccion = document.querySelector('#seccion');
        // Selecciono el botón para iniciar el juego
        this.botonIniciarJuego = document.querySelector('#iniciarJuego');
        // Listo las imágenes
        this.imagenes = [
            { id: "e-b", raza: "Elfo", clase: "Bárbaro" },
            { id: "e-g", raza: "Elfo", clase: "Guerrero" },
            { id: "e-r", raza: "Elfo", clase: "Rogue" },
            { id: "e-b0", raza: "Elfo", clase: "Bárbaro" },
            { id: "e-g0", raza: "Elfo", clase: "Guerrero" },
            { id: "e-r0", raza: "Elfo", clase: "Rogue" },
            { id: "e-b1", raza: "Elfo", clase: "Bárbaro" },
            { id: "e-g1", raza: "Elfo", clase: "Guerrero" },
            { id: "e-r1", raza: "Elfo", clase: "Rogue" },
            { id: "eo-b", raza: "Elfo Oscuro", clase: "Bárbaro" },
            { id: "eo-g", raza: "Elfo Oscuro", clase: "Guerrero" },
            { id: "eo-r", raza: "Elfo Oscuro", clase: "Rogue" },
            { id: "eo-b0", raza: "Elfo Oscuro", clase: "Bárbaro" },
            { id: "eo-g0", raza: "Elfo Oscuro", clase: "Guerrero" },
            { id: "eo-r0", raza: "Elfo Oscuro", clase: "Rogue" },
            { id: "eo-b1", raza: "Elfo Oscuro", clase: "Bárbaro" },
            { id: "eo-g1", raza: "Elfo Oscuro", clase: "Guerrero" },
            { id: "eo-r1", raza: "Elfo Oscuro", clase: "Rogue" },
            { id: "en-b", raza: "Enano", clase: "Bárbaro" },
            { id: "en-g", raza: "Enano", clase: "Guerrero" },
            { id: "en-r", raza: "Enano", clase: "Rogue" },
            { id: "en-b0", raza: "Enano", clase: "Bárbaro" },
            { id: "en-g0", raza: "Enano", clase: "Guerrero" },
            { id: "en-r0", raza: "Enano", clase: "Rogue" },
            { id: "en-b1", raza: "Enano", clase: "Bárbaro" },
            { id: "en-g1", raza: "Enano", clase: "Guerrero" },
            { id: "en-r1", raza: "Enano", clase: "Rogue" },
            { id: "h-b", raza: "Humano", clase: "Bárbaro" },
            { id: "h-g", raza: "Humano", clase: "Guerrero" },
            { id: "h-r", raza: "Humano", clase: "Rogue" },
            { id: "h-b0", raza: "Humano", clase: "Bárbaro" },
            { id: "h-g0", raza: "Humano", clase: "Guerrero" },
            { id: "h-r0", raza: "Humano", clase: "Rogue" },
            { id: "h-b1", raza: "Humano", clase: "Bárbaro" },
            { id: "h-g1", raza: "Humano", clase: "Guerrero" },
            { id: "h-r1", raza: "Humano", clase: "Rogue" },
            { id: "g-b", raza: "Gnomo", clase: "Bárbaro" },
            { id: "g-g", raza: "Gnomo", clase: "Guerrero" },
            { id: "g-r", raza: "Gnomo", clase: "Rogue" },
            { id: "g-b0", raza: "Gnomo", clase: "Bárbaro" },
            { id: "g-g0", raza: "Gnomo", clase: "Guerrero" },
            { id: "g-r0", raza: "Gnomo", clase: "Rogue" },
            { id: "g-b1", raza: "Gnomo", clase: "Bárbaro" },
            { id: "g-g1", raza: "Gnomo", clase: "Guerrero" },
            { id: "g-r1", raza: "Gnomo", clase: "Rogue" },
            { id: "o-b", raza: "Orco", clase: "Bárbaro" },
            { id: "o-g", raza: "Orco", clase: "Guerrero" },
            { id: "o-r", raza: "Orco", clase: "Rogue" },
            { id: "o-b0", raza: "Orco", clase: "Bárbaro" },
            { id: "o-g0", raza: "Orco", clase: "Guerrero" },
            { id: "o-r0", raza: "Orco", clase: "Rogue" },
            { id: "o-b1", raza: "Orco", clase: "Bárbaro" },
            { id: "o-g1", raza: "Orco", clase: "Guerrero" },
            { id: "o-r1", raza: "Orco", clase: "Rogue" }   
        ]
        // Listo las razas
        this.razas = [ "Elfo", "Elfo Oscuro", "Enano", "Gnomo", "Humano", "Orco" ];
        // Listo las clases
        this.clases = [ "Bárbaro", "Guerrero", "Rogue" ];

        // Función para iniciar el juego
        this.iniciarJuego();

    }

    /* --------------------------------- Métodos -------------------------------- */
    
    // Listener para iniciar el juego y levantar el nombre
    iniciarJuego(){
        this.botonIniciarJuego.addEventListener('click', this.referencia = this.pantallaIndicarNombre.bind(this));
    }

    // Valido el nombre suministrado por el usuario, entre 3 y 15 caracteres, no puede arrancar con números
    validarNombre( nombre ) {
        return ( nombre.length >= 3 && nombre.length <= 15 && isNaN(parseInt(nombre)) ) ? true : false;
        
    }

    // Creo al personaje del rival
    crearJugadorRival(){
        let razaRival = "";
        let claseRival = "";

        // Sorteo la raza
        const sorteo1 = Math.floor(Math.random() * this.razas.length);
        razaRival = this.razas[sorteo1];

        // Sorteo la clase
        const sorteo2 = Math.floor(Math.random() * this.clases.length);
        claseRival = this.clases[sorteo2];

        // Filtro las imágenes que cumplen con la raza y la clase sorteadas
        let imagenRival = this.imagenes.filter( item => (item.raza.toLowerCase() === razaRival.toLowerCase()) && (item.clase.toLowerCase() === claseRival.toLowerCase()) );
        // Sorteo la imagen
        const sorteo3 = Math.floor(Math.random() * imagenRival.length);
        imagenRival = imagenRival[sorteo3];

        // Creo el personaje
        this.jugadorRival = new Personaje( this.nombreRival, imagenRival.raza, imagenRival.clase, imagenRival.id )
        this.jugadorRival.indice = -1;
    }

    // La función controla la velocidad y da lugar al combate entre los jugadores
    combate( player1, player2 ){

        // Realiza una copia para no pisar los atributos originales
        const jugador1 = player1.copiarPersonaje();
        const jugador2 = player2.copiarPersonaje();

        while( jugador1.vida > 0 && jugador2.vida >0 ){

            if( jugador1.velocidad > jugador2.velocidad ){
                this.mensaje += jugador1.atacar( jugador2 );

                if( jugador2.vida > 0 ){
                    this.mensaje += jugador2.atacar( jugador1 );
                }
                
            } else if( jugador1.velocidad < jugador2.velocidad ){
                this.mensaje += jugador2.atacar( jugador1 );

                if( jugador1.vida > 0 ){
                    this.mensaje += jugador1.atacar( jugador2 );
                }

            } else {
                const sorteo = Math.random();

                if( sorteo >= 0.5){
                    this.mensaje += jugador1.atacar( jugador2 );

                    if( jugador2.vida > 0 ){
                        this.mensaje += jugador2.atacar( jugador1 );
                    }

                } else {
                    this.mensaje += jugador2.atacar( jugador1 );

                    if( jugador1.vida > 0 ){
                        this.mensaje += jugador1.atacar( jugador2 );
                    }

                }

            }
        }

        // Retorno la vida con la que finalizó cada jugador
        return [jugador1.vida, jugador2.vida];

    }

    // Armo el grupo de imágenes para seleccionar la raza
    grupoImagenesRazas(){
        const arregloRaza = [];
        this.razas.forEach( raza => {
            let listaRaza = this.imagenes.filter( item => item.raza === raza );
            let sorteo = Math.floor(Math.random() * listaRaza.length);
            arregloRaza.push( listaRaza[sorteo] );
        });
            
        return arregloRaza;

    }

    // Armo el grupo de imágenes para seleccionar la clase
    grupoImagenesClases(){
        const listaRaza = this.imagenes.filter( item => item.raza === this.raza );
        const arregloClase = [];
        this.clases.forEach( clase => {
            let listaClase = listaRaza.filter( item => item.clase === clase );
            let sorteo = Math.floor(Math.random() * listaClase.length);
            arregloClase.push( listaClase[sorteo] );
        });
        
        return arregloClase;
    
    }

    // Tomo el nombre de usuario
    pantallaIndicarNombre(){
        this.seccion.innerHTML = //html
            `<div class="row justify-content-center text-center">
                <p id="aviso" class="text-light">Ingrese su nombre de jugador (entre 3 y 15 caracteres)</p>
            </div>
            <div class="row justify-content-center">
                <input id="nombreIndicado" type="text" placeholder="Complete su nombre"></input>
            </div>
            <div class="row justify-content-center text-center mt-3">
                <p id="avisoRival" class="text-light">Ingrese el nombre de su rival (entre 3 y 15 caracteres)</p>
            </div>
            <div class="row justify-content-center">
                <input id="nombreRivalIndicado" type="text" placeholder="Complete el nombre de su rival"></input>
            </div>
            <div class="row justify-content-center">
                <button id="nombreSubmitido" class="botonInicio"> Enviar </button>
            </div>`;

        this.botonIniciarJuego.removeEventListener('click', this.referencia);
        
        const nombreIndicado = document.querySelector('#nombreIndicado');
        const nombreRivalIndicado = document.querySelector('#nombreRivalIndicado');
        const nombresSubmitidos = document.querySelector('#nombreSubmitido');

        nombresSubmitidos.addEventListener('click',  this.referencia = () => {
            this.nombre = nombreIndicado.value;
            this.nombre = this.nombre.replace(/\s+/g, ''); // Elimino los espacios
            this.nombreRival = nombreRivalIndicado.value;
            this.nombreRival = this.nombreRival.replace(/\s+/g, ''); // Elimino los espacios

            if ( this.validarNombre( this.nombre ) && this.validarNombre( this.nombreRival ) ) {
                nombresSubmitidos.removeEventListener('click', this.referencia);
                this.pantallaSeleccionRaza();

            } else {
                if ( ! this.validarNombre( this.nombre ) ) {
                    let aviso = document.querySelector('#aviso');

                    if ( aviso.classList.contains('text-light')){
                        aviso.classList.remove('text-light');
                        aviso.classList.add('text-danger');
                    }

                    if ( this.validarNombre( this.nombreRival ) ) {
                        let avisoRival = document.querySelector('#avisoRival');

                        if ( avisoRival.classList.contains('text-danger')){
                            avisoRival.classList.remove('text-danger');
                            avisoRival.classList.add('text-light');
                        }
                    }
                }                

                if ( ! this.validarNombre( this.nombreRival ) ) {
                    let avisoRival = document.querySelector('#avisoRival');
    
                    if ( avisoRival.classList.contains('text-light')){
                        avisoRival.classList.remove('text-light');
                        avisoRival.classList.add('text-danger');
                    }
    
                    if ( this.validarNombre( this.nombre ) ) {
                        let aviso = document.querySelector('#aviso');
    
                        if ( aviso.classList.contains('text-danger')){
                            aviso.classList.remove('text-danger');
                            aviso.classList.add('text-light');
                        }
                    }
                }

            }  

        })


    }

    // Función que levanta la raza seleccionada
    pantallaSeleccionRaza(){
        this.seccion.innerHTML = //html
            `<div id="cajaRaza" class="row justify-content-center m-4"></div>`;

        const divRaza = document.querySelector('#cajaRaza');
        const arregloRaza = this.grupoImagenesRazas();

        // Despliego en una caja el listado de razas
        arregloRaza.forEach( item => {
            divRaza.innerHTML += //html
                `<div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 d-flex flex-column">
                    <h3 class="titulo tituloResponsive"> ${item.raza} </h3>
                    <img id="${item.id}" class="imgPersonaje" src="../img/${item.id}.jpg" alt="Imagen de un ${item.raza} con clase ${item.clase}">
                </div>`;
        })
    
        const imgRazas = document.querySelectorAll('.imgPersonaje');
    
        // Levanto la raza que se selecciona
        imgRazas.forEach( imgRaza => {
            imgRaza.addEventListener('click', this.referencia = this.listenerRaza.bind(this));
        })

    }

    // Event Listener que reconoce la raza seleccionada
    listenerRaza( evento ){
        const id = evento.target.id;
        const razaSeleccionada = this.imagenes.filter( item => item.id === id)[0];
        
        // Tomo la raza
        this.raza = razaSeleccionada.raza;

        const imgRazas = document.querySelectorAll('.imgPersonaje');
    
        imgRazas.forEach( imgRaza => {
            imgRaza.removeEventListener('click', this.referencia);
        });

        this.pantallaSeleccionClase();

    }

    // Función que levanta la clase seleccionada
    pantallaSeleccionClase(){
        this.seccion.innerHTML = //html
            `<div id="cajaClase" class="row justify-content-center m-4"></div>`;

        const divClase = document.querySelector('#cajaClase');
        const arregloClase = this.grupoImagenesClases( this.raza );

        // Despliego en una caja el listado de clases
        arregloClase.forEach( item => {
            divClase.innerHTML += //html
                `<div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 d-flex flex-column">
                    <h3 class="titulo tituloResponsive"> ${item.clase} </h3>
                    <img id="${item.id}" class="imgPersonaje" src="../img/${item.id}.jpg" alt="Imagen de un ${item.raza} con clase ${item.clase}">
                </div>`;
        });
    
        const imgClases = document.querySelectorAll('.imgPersonaje');
    
        // Levanto la clase que se selecciona
        imgClases.forEach( imgClase => {
            imgClase.addEventListener('click', this.referencia = this.listenerClase.bind(this));
        });

    }

    // Event Listener que reconoce la clase seleccionada
    listenerClase( evento ){
        const id = evento.target.id;
        const claseSeleccionada = this.imagenes.filter( item => item.id === id)[0];
        
        // Tomo la clase
        this.clase = claseSeleccionada.clase;
    
        const imgClases = document.querySelectorAll('.imgPersonaje');
    
        imgClases.forEach( imgClase => {
            imgClase.removeEventListener('click', this.referencia);
        });      

        // Fijo la imagen seleccionada
        this.imagen = this.imagenes.filter( item => item.id === id)[0].id;

        this.pantallaSeleccionPoolPersonaje();

    }

    // Función que corre las funciones para levantar el personaje seleccionado
    pantallaSeleccionPoolPersonaje(){

        // Creo al personaje del rival
        this.crearJugadorRival();

        // Creo Pool de Personajes
        this.personajes = new PoolPersonajes( this.nombre, this.raza, this.clase, this.imagen );
        
        // Genero el nuevo layout
        this.seccion.innerHTML = //html
            `<div class="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 d-flex flex-column align-items-center">
                <img id="switch1" class="switch" src="../img/switch-on.png" alt="activo">
                <p id="statsPersonaje1" class="fondoTexto descripcionPersonaje">
                </p>
                <button id="seleccionarPersonaje1"> Seleccionar personaje </button>
            </div>

            <div id="cajaPoolPersonajes"
                class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 d-flex flex-wrap justify-content-center">
            </div>

            <div class="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 d-flex flex-column align-items-center">
                <img id="switch2" class="switch" src="../img/switch-off.png" alt="inactivo">
                <p id="statsPersonaje2" class="fondoTexto descripcionPersonaje">
                </p>
                <button id="seleccionarPersonaje2"> Seleccionar personaje </button>
            </div>`;

        // Cambio la disposición del contenedor
        this.seccion.classList.add('row');

        // Identifico los IDs de todos los elementos
        const switch1 = document.querySelector("#switch1");
        const switch2 = document.querySelector("#switch2");
        const statsPersonaje1 = document.querySelector("#statsPersonaje1");
        const statsPersonaje2 = document.querySelector("#statsPersonaje2");
        const seleccionarPersonaje1 = document.querySelector("#seleccionarPersonaje1");
        const seleccionarPersonaje2 = document.querySelector("#seleccionarPersonaje2");
        const cajaPoolPersonajes = document.querySelector("#cajaPoolPersonajes");
        let personajeEnCaja1 = this.personajes.arreglo[0]; // Contiene el personaje seleccionado en la caja de párrafo 1
        let personajeEnCaja2 = this.personajes.arreglo[1]; // Contiene el personaje seleccionado en la caja de párrafo 2
        let refSwitch1; // Fórmula para Event Listener del swtich1
        let refSwitch2; // Fórmula para Event Listener del swtich2
        let refSel1; // Fórmula para Event Listener del seleccionarPersonaje1
        let refSel2; // Fórmula para Event Listener del seleccionarPersonaje2

        // Muestro Stats en las cajas
        personajeEnCaja1.mostrarStats( statsPersonaje1, true );
        personajeEnCaja2.mostrarStats( statsPersonaje2, true );

        // Despliego en una caja el listado de personajes del pool
        this.personajes.arreglo.forEach( item => {
            cajaPoolPersonajes.innerHTML += // html
                `<div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                    <span class="imagenSeleccion">
                        <img id="${item.indice}" class="imgPersonaje" src="../img/${item.imagen}.jpg" alt="Imagen de un ${item.raza} con clase ${item.clase}">
                        <span class="numeroSeleccion">${item.indice}</span>
                    </span>
                </div>`
        });
    
        const imgPool = document.querySelectorAll('.imgPersonaje');
        
        // Event Listener que reconoce el personaje seleccionado para análisis
        imgPool.forEach( imgEnPool => {
            imgEnPool.addEventListener('click', this.referencia = ( evento ) => {
                // Identifico la ID de la imagen
                const id = evento.target.id;

                // Busco el ID en el arreglo
                const personajePreSeleccionado = this.personajes.arreglo.filter( item => item.indice === parseInt(id))[0];

                // Muestro los stats del personaje en la caja correspondiente
                if ( switch1.alt === "activo" ) {
                    personajePreSeleccionado.mostrarStats( statsPersonaje1, true );
                    personajeEnCaja1 = personajePreSeleccionado;
                } else {
                    personajePreSeleccionado.mostrarStats( statsPersonaje2, true );
                    personajeEnCaja2 = personajePreSeleccionado;
                }
            })
        })

        // Agrego Event Listener que identifica el estado del switch 1
        switch1.addEventListener("click", refSwitch1 = () => {
            if ( switch1.alt === "activo" ) {
                switch1.src = "../img/switch-off.png";
                switch1.alt = "inactivo";
                switch2.src = "../img/switch-on.png";
                switch2.alt = "activo";
            } else {
                switch1.src = "../img/switch-on.png";
                switch1.alt = "activo";
                switch2.src = "../img/switch-off.png";
                switch2.alt = "inactivo";
            }
        })
        
        // Agrego Event Listener que identifica el estado del switch 2
        switch2.addEventListener("click", refSwitch2 = () => {
            if ( switch2.alt === "activo" ) {
                switch2.src = "../img/switch-off.png";
                switch2.alt = "inactivo";
                switch1.src = "../img/switch-on.png";
                switch1.alt = "activo";
            } else {
                switch2.src = "../img/switch-on.png";
                switch2.alt = "activo";
                switch1.src = "../img/switch-off.png";
                switch1.alt = "inactivo";
            }
        })

        // Event Listener para cuando se define el personaje
        seleccionarPersonaje1.addEventListener("click", refSel1 = () => {
            // Defino el personaje escogido por el jugador
            this.jugador = personajeEnCaja1;

            seleccionarPersonaje1.removeEventListener("click", refSel1);
            seleccionarPersonaje2.removeEventListener("click", refSel2);
            switch1.removeEventListener("click", refSwitch1);
            switch2.removeEventListener("click", refSwitch2);
            imgPool.forEach( imgEnPool => {
                imgEnPool.removeEventListener('click', this.referencia);
            })

            // Inicia la función siguiente
            this.pantallaCombate();

        })

        // Event Listener para cuando se define el personaje
        seleccionarPersonaje2.addEventListener("click", refSel2 = () => {
            // Defino el personaje escogido por el jugador
            this.jugador = personajeEnCaja2;

            seleccionarPersonaje1.removeEventListener("click", refSel1);
            seleccionarPersonaje2.removeEventListener("click", refSel2);
            switch1.removeEventListener("click", refSwitch1);
            switch2.removeEventListener("click", refSwitch2);
            imgPool.forEach( imgEnPool => {
                imgEnPool.removeEventListener('click', this.referencia);
            })

            // Inicia la función siguiente
            this.pantallaCombate();

        })

    }

    // Función que presenta la pantalla de combate y da lugar a iniciarlo
    pantallaCombate(){

        // Genero el nuevo layout
        this.seccion.innerHTML = //html
            `<div class="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 d-flex flex-column">
                <p id="victorias1" class="align-self-center m-0 text-light">Victorias: ${this.victoriasJugador}</p>
                <h2 class="vidaTitulo my-1">${this.jugador.nombre}</h2>
                <p id="vida1" class="vida align-self-center">Vida: ${this.jugador.vida}</p>
                <p id="statsPersonaje1" class="fondoTexto">
                </p>
                <img class="imgPersonaje" src="../img/${this.jugador.imagen}.jpg" alt="Imagen de un ${this.jugador.raza} con clase ${this.jugador.clase}">
            </div>

            <div id="cajaCombate" class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 text-center">
                <button id="iniciarCombate" class="botonInicio"> Iniciar Combate </button>
            </div>

            <div class="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 d-flex flex-column">
                <p id="victorias2" class="align-self-center m-0 text-light">Victorias: ${this.victoriasRival}</p>
                <h2 class="vidaTitulo my-1">${this.jugadorRival.nombre}</h2>
                <p id="vida2" class="vida align-self-center">Vida: ${this.jugadorRival.vida}</p>
                <p id="statsPersonaje2" class="fondoTexto">
                </p>
                <img class="imgPersonaje" src="../img/${this.jugadorRival.imagen}.jpg" alt="Imagen de un ${this.jugadorRival.raza} con clase ${this.jugadorRival.clase}">
            </div>`;

        // Identifico los IDs de todos los elementos
        const cajaCombate = document.querySelector("#cajaCombate");
        const iniciarCombate = document.querySelector("#iniciarCombate");
        const victorias1 = document.querySelector("#victorias1");
        const victorias2 = document.querySelector("#victorias2");
        const vida1 = document.querySelector("#vida1");
        const vida2 = document.querySelector("#vida2");
        const statsPersonaje1 = document.querySelector("#statsPersonaje1");
        const statsPersonaje2 = document.querySelector("#statsPersonaje2");

        // Muestro Stats en las cajas
        this.jugador.mostrarStats( statsPersonaje1, false );
        this.jugadorRival.mostrarStats( statsPersonaje2, false );

        // Event Listener para identificar cuándo inicia el combate
        iniciarCombate.addEventListener("click", this.referencia = () => {

            // Desestructuro el return de combate
            let [vidaJ1, vidaJ2] = this.combate( this.jugador, this.jugadorRival );
            
            // Le concedo la victoria al que corresponda
            if ( vidaJ1 === 0 ) {
                this.victoriasRival += 1;
            } else {
                this.victoriasJugador+= 1;
            }

            // Subo el archivo JSON a local storage
            this.subirJSON();

            // Genero el nuevo layout
            cajaCombate.innerHTML = // html
                `<h2 class="incidenciasTitulo">Incidencias</h2>
                <p id="listaEventos" class="eventos">${this.mensaje}
                </p>
                <button id="reiniciarCombate" class="botonInicio"> Combatir de nuevo </button>`;
            
            iniciarCombate.removeEventListener("click", this.referencia);

            // Muestro las victorias de cada jugador
            victorias1.innerHTML = `Victorias: ${this.victoriasJugador}`;
            victorias2.innerHTML = `Victorias: ${this.victoriasRival}`;

            // Muestro la vida final de cada jugador
            vida1.innerHTML = `Vida: ${vidaJ1}`;
            vida2.innerHTML = `Vida: ${vidaJ2}`;

            // Inicio la siguiente función
            this.combatirDeNuevo();

        })

    }

    // Función que presenta la la opción de reiniciar el combate
    combatirDeNuevo(){

        // Identifico el ID para reiniciar el combate
        const reiniciarCombate = document.querySelector("#reiniciarCombate");

        // Event Listener para identificar cuándo reinicia el combate
        reiniciarCombate.addEventListener("click", this.referencia = () => {

            reiniciarCombate.removeEventListener("click", this.referencia);

            // Reseteo el mensaje
            this.mensaje = "";

            // Vuelvo a iniciar el combate
            this.pantallaCombate();
            
        })

    }

    // Función que sube this a local storage
    subirJSON(){
        const objetoSubido = JSON.stringify(this);
        localStorage.setItem("juego", objetoSubido);
    }

    // Función que descarga las victorias desde local storage
    descargarJSON(){
        const objetoDescargado = JSON.parse( localStorage.getItem( 'juego' ) );
        if ( objetoDescargado ) {
            const { victoriasJugador, victoriasRival } = objetoDescargado;
            return [ victoriasJugador, victoriasRival ];
        } else {
            return [ 0, 0 ];
        }
        
    }

}

// Creo una instancia del juego
const juego = new ElJuego();