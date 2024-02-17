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
    - Raza: ${this.raza}
    - Clase: ${this.clase}
    - Nivel: ${this.nivel}
    - Experiencia: ${this.experiencia}
    - Precisión del arma: ${this.precisionArma}

Atributos principales:
    - Agilidad: ${this.agilidad}
    - Constitución: ${this.constitucion}
    - Destreza: ${this.destreza}
    - Fuerza: ${this.fuerza}
    - Inteligencia: ${this.inteligencia}

Atributos derivados:
    - Ataque: ${this.ataque}
    - Vida: ${this.vida}
    - Maná: ${this.mana}
    - Precisión: ${this.precision}
    - Evasión: ${this.evasion}
    - Velocidad: ${this.velocidad}

Personaje número: ${this.indice}

`;

        } else {
            caja.innerText = `Los stats de ${this.nombre} son:

Atributos generales:
    - Raza: ${this.raza}
    - Clase: ${this.clase}
    - Nivel: ${this.nivel}
    - Experiencia: ${this.experiencia}
    - Precisión del arma: ${this.precisionArma}

Atributos principales:
    - Agilidad: ${this.agilidad}
    - Constitución: ${this.constitucion}
    - Destreza: ${this.destreza}
    - Fuerza: ${this.fuerza}
    - Inteligencia: ${this.inteligencia}

Atributos derivados:
    - Ataque: ${this.ataque}
    - Vida: ${this.vida}
    - Maná: ${this.mana}
    - Precisión: ${this.precision}
    - Evasión: ${this.evasion}
    - Velocidad: ${this.velocidad}

`;
            
        }
    }

    // Realiza la copia de un personaje
    copiarPersonaje( personajeACopiar ){
        // crea una instancia de la clase
        const copia = new Personaje( personajeACopiar.nombre, personajeACopiar.raza, personajeACopiar.clase, personajeACopiar.imagen );

        // Copia los valores en la nueva instancia
        copia.nivel = personajeACopiar.nivel;
        copia.experiencia = personajeACopiar.experiencia;
        copia.indice = personajeACopiar.indice;
        copia.agilidad = personajeACopiar.agilidad;
        copia.constitucion = personajeACopiar.constitucion;
        copia.destreza = personajeACopiar.destreza;
        copia.fuerza = personajeACopiar.fuerza;
        copia.inteligencia = personajeACopiar.inteligencia;

        // Calculo los atributos derivados en función de los principales
        copia.calculoAtributosDerivados();

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

        this.referencia1; // Para los Event Listeners
        this.referencia2; // Para los Event Listeners
        this.referenciaInstrucciones; // Para los Event Listeners de las instrucciones
        this.nombre = ""; // Nombre seleccionado
        this.raza = ""; // Raza seleccionada
        this.clase = ""; // Clase seleccionada
        this.imagen = ""; // Imagen seleccionada
        this.nombreRival = ""; // Nombre seleccionado del rival
        this.jugador = ""; // Personaje creado para el jugador
        this.jugadorRival = ""; // Personaje creado para el rival
        this.personajes = ""; // 9 personajes creados para que pueda elegir
        this.mensaje = ""; // Lista los eventos del combate
        this.victoriasJugador = 0; // Contador de victorias del jugador
        this.victoriasRival = 0; // Contador de victorias del rival
        this.seccion = document.querySelector('#seccion'); // Selecciono la sección que se va a modificar
        this.btnInstrucciones = document.querySelector('#ayuda'); // Selecciono el botón para mostrar la ayuda
        this.tituloInstrucciones = ""; // Rótulo de las instrucciones que se muestran al apretar el botón de instrucciones
        this.instrucciones = ""; // Instrucciones que se muestran al apretar el botón de instrucciones
        this.imagenes = []; // Para listar las imágenes importadas del JSON
        this.razas = []; // Para listar las razas importadas del JSON
        this.clases = []; // Para listar las clases importadas del JSON

        // Función para iniciar el juego
        this.iniciarJuego();

    }

    /* --------------------------------- Métodos -------------------------------- */
    
    // Función para dar inicio al juego
    iniciarJuego(){
        this.importarJSON(); // Importo los arrays del JSON
        this.chequearPartidaGuardada(); // Chequeo si hay alguna partida guardada

    }

    // Chequeo si hay alguna partida guardada
    chequearPartidaGuardada(){
        // Descargo la información alojada en el local storage
        const objetoDescargado = JSON.parse( localStorage.getItem( 'juego' ) );

        // Reviso si existe información alojada
        if ( objetoDescargado ) {
            this.conPartidaGuardada();
        } else {
            this.sinPartidaGuardada();
        }
    }

    // Inicio el juego con una partida guardada
    conPartidaGuardada(){

        // Indico título y detalle de las instrucciones
        this.tituloInstrucciones = "Seleccionar partida";
        this.instrucciones = `De existir una partida anterior guardada, la misma se puede recuperar seleccionando "Reestablecer Partida Anterior", sino se puede pulsar "Iniciar Partida Nueva".`;

        // Creo el Event Listener que muestra el cartel con las instrucciones
        this.btnInstrucciones.addEventListener('click', this.referenciaInstrucciones = () => {
            Swal.fire({
                title: this.tituloInstrucciones,
                html: this.instrucciones,
                icon: "info",
                color: "#fff",
                background: "#000009",
                confirmButtonColor: "#2f4f4f",
                confirmButtonText: "Entendido"
            });

        });

        // Genero el código HTML
        this.seccion.innerHTML = //html
            `<div class="row justify-content-center">
                <p id="statsAnteriores" class="fondoTexto row justify-content-center">
                </p>
            </div>

            <div class="row justify-content-center">
                <button id="iniciarJuego" class="botonInicio"> Iniciar Partida Nueva </button>
                <button id="reiniciarJuego" class="botonInicio"> Reestablecer Partida Anterior </button>
            </div>`;

        // Selecciono el botón para iniciar un juego nuevo
        const botonIniciarJuego = document.querySelector('#iniciarJuego');

        // Selecciono el botón para reiniciar partida anterior
        const botonReiniciarJuego = document.querySelector('#reiniciarJuego');

        // Muestro los datos del personaje de la partida anterior
        this.personajeLocalStorage();

        // Creo el Event Listener que levante si el jugador decide iniciar un juego nuevo
        botonIniciarJuego.addEventListener('click', this.referencia1 = () => {

            // Elimino la información del local storage
            localStorage.clear();

            // Remuevo los Event Listeners
            botonIniciarJuego.removeEventListener('click', this.referencia1);
            botonReiniciarJuego.removeEventListener('click', this.referencia2);
            this.btnInstrucciones.removeEventListener('click', this.referenciaInstrucciones);

            // Inicio la pantalla para indicar el nombre
            this.pantallaIndicarNombre();
        });

        // Creo el Event Listener que levante si el jugador decide reiniciar la partida anterior
        botonReiniciarJuego.addEventListener('click', this.referencia2 = () => {

            // Remuevo los Event Listeners
            botonIniciarJuego.removeEventListener('click', this.referencia1);
            botonReiniciarJuego.removeEventListener('click', this.referencia2);
            this.btnInstrucciones.removeEventListener('click', this.referenciaInstrucciones);

            // Inicio la función para descargar la información del local storage
            this.descargarLocalStorage();
        });

    }

    // Inicio el juego sin una partida guardada
    sinPartidaGuardada(){

        // Indico título y detalle de las instrucciones
        this.tituloInstrucciones = "Seleccionar partida";
        this.instrucciones = `De existir una partida anterior guardada, la misma se puede recuperar seleccionando "Reestablecer Partida Anterior", sino se puede pulsar "Iniciar Partida Nueva".`;

        // Creo el Event Listener que muestra el cartel con las instrucciones
        this.btnInstrucciones.addEventListener('click', this.referenciaInstrucciones = () => {
            Swal.fire({
                title: this.tituloInstrucciones,
                html: this.instrucciones,
                icon: "info",
                color: "#fff",
                background: "#000009",
                confirmButtonColor: "#2f4f4f",
                confirmButtonText: "Entendido"
            });

        });

        // Genero el código HTML
        this.seccion.innerHTML = //html
            `<div class="row justify-content-center">
                <button id="iniciarJuego" class="botonInicio"> Iniciar Partida Nueva </button>
            </div>`;

        // Selecciono el botón para iniciar un juego nuevo
        const botonIniciarJuego = document.querySelector('#iniciarJuego');

        // Creo el Event Listener que levante si el jugador decide iniciar un juego nuevo
        botonIniciarJuego.addEventListener('click', this.referencia1 = () => {

            // Remuevo el Event Listener
            botonIniciarJuego.removeEventListener('click', this.referencia1);
            this.btnInstrucciones.removeEventListener('click', this.referenciaInstrucciones);

            // Inicio la pantalla para indicar el nombre
            this.pantallaIndicarNombre();
        });

    }
    
    // Importar arrays de imagenes, razas y clases desde JSON
    async importarJSON(){
        try {
            // Indico la ruta del json
            const endPoint = '../models/data.json';
            // Intento conectarme con la ruta
            const response  = await fetch(endPoint);
            // Intento levantar la informaicón
            const json = await response.json();
            // Importo los arrays
            this.imagenes = json.imagenes;
            this.razas = json.razas;
            this.clases = json.clases;

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo encontrar el archivo.",
              });
        }
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
        const jugador1 = player1.copiarPersonaje( player1 );
        const jugador2 = player2.copiarPersonaje( player2 );

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

        // Indico título y detalle de las instrucciones
        this.tituloInstrucciones = "Indicar nombre";
        this.instrucciones = `Complete el nombre del jugador y del rival (entre 3 y 15 caracteres).`;

        // Creo el Event Listener que muestra el cartel con las instrucciones
        this.btnInstrucciones.addEventListener('click', this.referenciaInstrucciones = () => {
            Swal.fire({
                title: this.tituloInstrucciones,
                html: this.instrucciones,
                icon: "info",
                color: "#fff",
                background: "#000009",
                confirmButtonColor: "#2f4f4f",
                confirmButtonText: "Entendido"
            });

        });
        
        // Genero el código HTML
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

        // Linkeo los ID de los input y del botón
        const nombreIndicado = document.querySelector('#nombreIndicado');
        const nombreRivalIndicado = document.querySelector('#nombreRivalIndicado');
        const nombresSubmitidos = document.querySelector('#nombreSubmitido');

        // Controlo si al intentar submitir los nombres los mismos superan la validación
        nombresSubmitidos.addEventListener('click',  this.referencia1 = () => {
            this.nombre = nombreIndicado.value;
            this.nombre = this.nombre.replace(/\s+/g, ''); // Elimino los espacios
            this.nombreRival = nombreRivalIndicado.value;
            this.nombreRival = this.nombreRival.replace(/\s+/g, ''); // Elimino los espacios

            // Si pasa la validación avanzo a la siguiente pantalla
            if ( this.validarNombre( this.nombre ) && this.validarNombre( this.nombreRival ) ) {

                //Remuevo los Event Listeners
                nombresSubmitidos.removeEventListener('click', this.referencia1);
                this.btnInstrucciones.removeEventListener('click', this.referenciaInstrucciones);

                // Inicio la pantalla de selección de raza
                this.pantallaSeleccionRaza();

            } else {

                // Si no pasa la validación destaco el comentario del input que no está cumpliendo con el mismo
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

        // Indico título y detalle de las instrucciones
        this.tituloInstrucciones = "Seleccionar raza";
        this.instrucciones = `Elija entre las 6 razas:<br>
        - Humano ("h"): enfocado en inteligencia y constitución que implican maná y vida.<br>
        - Elfo ("e"): enfocado en agilidad, destreza e inteligencia que implican velocidad, evasión, precisión y maná.<br>
        - Elfo Oscuro ("eo"): enfocado en agilidad, destreza e inteligencia que implican velocidad, evasión, precisión y maná.<br>
        - Enano ("en"): enfocado en constitución, fuerza y destreza que implican vida, ataque, precisión y evasión.<br>
        - Gnomo ("g"): enfocado en inteligencia, agilidad y destreza que implican maná, velocidad, evasión y precisión.<br>
        - Orco ("o"): enfocado en fuerza y constitución que implican ataque y vida.`;

        // Creo el Event Listener que muestra el cartel con las instrucciones
        this.btnInstrucciones.addEventListener('click', this.referenciaInstrucciones = () => {
            Swal.fire({
                title: this.tituloInstrucciones,
                html: this.instrucciones,
                icon: "info",
                color: "#fff",
                background: "#000009",
                confirmButtonColor: "#2f4f4f",
                confirmButtonText: "Entendido"
            });

        });

        // Genero el código HTML
        this.seccion.innerHTML = //html
            `<div id="cajaRaza" class="row justify-content-center m-4"></div>`;

        // Selecciono el contenedor para el listado de razas
        const divRaza = document.querySelector('#cajaRaza');
        // Genero el arreglo con imágenes aleatorias de las distintas razas
        const arregloRaza = this.grupoImagenesRazas();

        // Despliego en una caja el listado de razas
        arregloRaza.forEach( item => {
            divRaza.innerHTML += //html
                `<div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 d-flex flex-column">
                    <h3 class="titulo tituloResponsive"> ${item.raza} </h3>
                    <img id="${item.id}" class="imgPersonaje" src="../img/${item.id}.jpg" alt="Imagen de un ${item.raza} con clase ${item.clase}">
                </div>`;
        })
    
        // Selecciono las imágenes de las razas
        const imgRazas = document.querySelectorAll('.imgPersonaje');
    
        // Levanto la raza que se selecciona
        imgRazas.forEach( imgRaza => {
            imgRaza.addEventListener('click', this.referencia1 = this.listenerRaza.bind(this));
        })

    }

    // Event Listener que reconoce la raza seleccionada
    listenerRaza( evento ){

        // Identifico el ID de la raza seleccionada
        const id = evento.target.id;
        // Lo comparo con las imágenes para identificarla
        const razaSeleccionada = this.imagenes.filter( item => item.id === id)[0];
        // Tomo la raza de la imagen seleccionada
        this.raza = razaSeleccionada.raza;

        // Selecciono las imágenes de las razas
        const imgRazas = document.querySelectorAll('.imgPersonaje');
    
        // Remuevo los Event Listeners
        imgRazas.forEach( imgRaza => {
            imgRaza.removeEventListener('click', this.referencia1);
        });
        this.btnInstrucciones.removeEventListener('click', this.referenciaInstrucciones);

        // Inicio la pantalla de selección de clase
        this.pantallaSeleccionClase();

    }

    // Función que levanta la clase seleccionada
    pantallaSeleccionClase(){
        
        // Indico título y detalle de las instrucciones
        this.tituloInstrucciones = "Seleccionar clase";
        this.instrucciones = `Elija entre las tres clases de luchadores:<br>
        - Guerrero ("g"): enfocado en destreza, fuerza y constitución que implican precisión, ataque, vida y evasión.<br>
        - Bárbaro ("b"): enfocado en fuerza y constitución que implican ataque y vida.<br>
        - Rogue ("r"): enfocado en destreza y agilidad que implican precisión, evasión y velocidad.`;

        // Creo el Event Listener que muestra el cartel con las instrucciones
        this.btnInstrucciones.addEventListener('click', this.referenciaInstrucciones = () => {
            Swal.fire({
                title: this.tituloInstrucciones,
                html: this.instrucciones,
                icon: "info",
                color: "#fff",
                background: "#000009",
                confirmButtonColor: "#2f4f4f",
                confirmButtonText: "Entendido"
            });

        });

        // Genero el código HTML
        this.seccion.innerHTML = //html
            `<div id="cajaClase" class="row justify-content-center m-4"></div>`;

        // Selecciono el contenedor para el listado de clases
        const divClase = document.querySelector('#cajaClase');
        // Genero el arreglo con imágenes aleatorias de las distintas clases
        const arregloClase = this.grupoImagenesClases( this.raza );

        // Despliego en una caja el listado de clases
        arregloClase.forEach( item => {
            divClase.innerHTML += //html
                `<div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 d-flex flex-column">
                    <h3 class="titulo tituloResponsive"> ${item.clase} </h3>
                    <img id="${item.id}" class="imgPersonaje" src="../img/${item.id}.jpg" alt="Imagen de un ${item.raza} con clase ${item.clase}">
                </div>`;
        });
    
        // Selecciono las imágenes de las clases
        const imgClases = document.querySelectorAll('.imgPersonaje');
    
        // Levanto la clase que se selecciona
        imgClases.forEach( imgClase => {
            imgClase.addEventListener('click', this.referencia1 = this.listenerClase.bind(this));
        });

    }

    // Event Listener que reconoce la clase seleccionada
    listenerClase( evento ){

        // Identifico el ID de la clase seleccionada
        const id = evento.target.id;
        // Lo comparo con las imágenes para identificarla
        const claseSeleccionada = this.imagenes.filter( item => item.id === id)[0];
        // Tomo la clase de la imagen seleccionada
        this.clase = claseSeleccionada.clase;
    
        // Selecciono las imágenes de las clases
        const imgClases = document.querySelectorAll('.imgPersonaje');
    
        // Remuevo los Event Listeners
        imgClases.forEach( imgClase => {
            imgClase.removeEventListener('click', this.referencia1);
        });      
        this.btnInstrucciones.removeEventListener('click', this.referenciaInstrucciones);

        // Fijo la imagen seleccionada
        this.imagen = this.imagenes.filter( item => item.id === id)[0].id;

        // Inicio la pantalla de selección de personaje
        this.pantallaSeleccionPoolPersonaje();

    }

    // Función que corre las funciones para levantar el personaje seleccionado
    pantallaSeleccionPoolPersonaje(){

        // Indico título y detalle de las instrucciones
        this.tituloInstrucciones = "Seleccionar personaje";
        this.instrucciones = `Analice los 9 personajes creados, seleccionándolos y comparando 
        los atributos haciendo que figuren a la izquierda o derecha clickeando en los 
        switches de off y on. Con borde amarillo aparecen los que tienen el máximo en 
        Vida, Precisión, Evasión o Velocidad. Finalizado el análisis puede seleccionar uno.`;

        // Creo el Event Listener que muestra el cartel con las instrucciones
        this.btnInstrucciones.addEventListener('click', this.referenciaInstrucciones = () => {
            Swal.fire({
                title: this.tituloInstrucciones,
                html: this.instrucciones,
                icon: "info",
                color: "#fff",
                background: "#000009",
                confirmButtonColor: "#2f4f4f",
                confirmButtonText: "Entendido"
            });

        });

        // Creo al personaje del rival
        this.crearJugadorRival();

        // Creo Pool de Personajes
        this.personajes = new PoolPersonajes( this.nombre, this.raza, this.clase, this.imagen );
        
        // Genero el nuevo layout
        this.seccion.innerHTML = //html
            `<div class="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 d-flex flex-column align-items-center">
                <img id="switch1" class="switch" src="../img/switch-on.png" alt="activo">
                <p id="statsPersonaje1" class="fondoTexto descripcionPersonaje cajaSeleccion1">
                </p>
                <button id="seleccionarPersonaje1"> Seleccionar personaje </button>
            </div>

            <div id="cajaPoolPersonajes"
                class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 d-flex flex-wrap justify-content-center">
            </div>

            <div class="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 d-flex flex-column align-items-center">
                <img id="switch2" class="switch" src="../img/switch-off.png" alt="inactivo">
                <p id="statsPersonaje2" class="fondoTexto descripcionPersonaje cajaSeleccion2">
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
                `<div class="col-4">
                    <span class="imagenSeleccion">
                        <img id="${item.indice}" class="imgPersonaje" src="../img/${item.imagen}.jpg" alt="Imagen de un ${item.raza} con clase ${item.clase}">
                        <span class="numeroSeleccion">${item.indice}</span>
                    </span>
                </div>`
        });

        // Selecciono las imágenes de los personajes
        const imgPool = document.querySelectorAll('.imgPersonaje');

        // Marco imágenes seleccionadas
        imgPool[0].classList.add('seleccionado1');
        imgPool[1].classList.add('seleccionado2');
        
        // Event Listener que reconoce el personaje seleccionado para análisis
        imgPool.forEach( imgEnPool => {
            imgEnPool.addEventListener('click', this.referencia1 = ( evento ) => {
                // Identifico la ID de la imagen
                const id = evento.target.id;

                // Busco el ID en el arreglo
                const personajePreSeleccionado = this.personajes.arreglo.filter( item => item.indice === parseInt(id) )[0];

                // Muestro los stats del personaje en la caja correspondiente
                if ( switch1.alt === "activo" ) {

                    // Elimino el borde del anterior seleccionado
                    imgPool[(personajeEnCaja1.indice)-1].classList.remove('seleccionado1');

                    // Muestro los stats del nuevo seleccionado
                    personajePreSeleccionado.mostrarStats( statsPersonaje1, true );
                    personajeEnCaja1 = personajePreSeleccionado;

                    // Agrego el borde al nuevo seleccionado
                    imgPool[(personajeEnCaja1.indice)-1].classList.add('seleccionado1');

                } else {

                    // Elimino el borde del anterior seleccionado
                    imgPool[(personajeEnCaja2.indice)-1].classList.remove('seleccionado2');

                    // Muestro los stats del nuevo seleccionado
                    personajePreSeleccionado.mostrarStats( statsPersonaje2, true );
                    personajeEnCaja2 = personajePreSeleccionado;

                    // Agrego el borde al nuevo seleccionado
                    imgPool[(personajeEnCaja2.indice)-1].classList.add('seleccionado2');
                    
                }
            })
        })

        // Declaro la constante que va a contener los máximos
        const maximo = [];

        // Identifico los máximos
        maximo.push(...this.personajes.maxVida());
        maximo.push(...this.personajes.maxPrecision());
        maximo.push(...this.personajes.maxEvasion());
        maximo.push(...this.personajes.maxVelocidad());

        // Quito los duplicados
        const maximoIndice = [];
        maximo.forEach( item => {
            if (maximoIndice.indexOf( item.indice ) === -1) {
                maximoIndice.push( item.indice );
            }
        } );

        // Cambio el fondo a las imágenes con máximos
        imgPool.forEach( imgEnPool => {
            const id = parseInt( imgEnPool.id );
            if ( maximoIndice.indexOf( id ) != -1 ) {
                imgEnPool.classList.add('maximo');
            }
        });
      
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

            // Remuevo los Event Listeners
            seleccionarPersonaje1.removeEventListener("click", refSel1);
            seleccionarPersonaje2.removeEventListener("click", refSel2);
            switch1.removeEventListener("click", refSwitch1);
            switch2.removeEventListener("click", refSwitch2);
            this.btnInstrucciones.removeEventListener('click', this.referenciaInstrucciones);
            imgPool.forEach( imgEnPool => {
                imgEnPool.removeEventListener('click', this.referencia1);
            })

            // Inicia la pantalla de combate
            this.pantallaCombate();

        })

        // Event Listener para cuando se define el personaje
        seleccionarPersonaje2.addEventListener("click", refSel2 = () => {
            // Defino el personaje escogido por el jugador
            this.jugador = personajeEnCaja2;

            // Remuevo los Event Listeners
            seleccionarPersonaje1.removeEventListener("click", refSel1);
            seleccionarPersonaje2.removeEventListener("click", refSel2);
            switch1.removeEventListener("click", refSwitch1);
            switch2.removeEventListener("click", refSwitch2);
            this.btnInstrucciones.removeEventListener('click', this.referenciaInstrucciones);
            imgPool.forEach( imgEnPool => {
                imgEnPool.removeEventListener('click', this.referencia1);
            })

            // Inicia la pantalla de combate
            this.pantallaCombate();

        })

    }

    // Función que presenta la pantalla de combate y da lugar a iniciarlo
    pantallaCombate(){

        // Indico título y detalle de las instrucciones
        this.tituloInstrucciones = "Iniciar combate";
        this.instrucciones = `De inicio el combate presionando el botón.`;

        // Creo el Event Listener que muestra el cartel con las instrucciones
        this.btnInstrucciones.addEventListener('click', this.referenciaInstrucciones = () => {
            Swal.fire({
                title: this.tituloInstrucciones,
                html: this.instrucciones,
                icon: "info",
                color: "#fff",
                background: "#000009",
                confirmButtonColor: "#2f4f4f",
                confirmButtonText: "Entendido"
            });

        });

        // Reseteo el mensaje
        this.mensaje = "";

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
        iniciarCombate.addEventListener("click", this.referencia1 = () => {

            // Desestructuro el return de combate
            let [vidaJ1, vidaJ2] = this.combate( this.jugador, this.jugadorRival );
            
            // Le concedo la victoria al que corresponda
            if ( vidaJ1 === 0 ) {
                this.victoriasRival += 1;
            } else {
                this.victoriasJugador+= 1;
            }

            // Subo la información en JSON a local storage
            this.subirLocalStorage();

            // Genero el nuevo layout
            cajaCombate.innerHTML = // html
                `<h2 class="incidenciasTitulo">Incidencias</h2>
                <p id="listaEventos" class="eventos">${this.mensaje}
                </p>
                <div class="row justify-content-center">
                    <button id="reiniciarCombate" class="botonInicio"> Combatir de nuevo </button>
                    <button id="cambiarRival" class="botonInicio"> Cambiar Rival </button>
                </div>`;
            
            // Remuevo los Event Listeners
            iniciarCombate.removeEventListener("click", this.referencia1);
            this.btnInstrucciones.removeEventListener('click', this.referenciaInstrucciones);

            // Muestro las victorias de cada jugador
            victorias1.innerHTML = `Victorias: ${this.victoriasJugador}`;
            victorias2.innerHTML = `Victorias: ${this.victoriasRival}`;

            // Muestro la vida final de cada jugador
            vida1.innerHTML = `Vida: ${vidaJ1}`;
            vida2.innerHTML = `Vida: ${vidaJ2}`;

            // Inicio la siguiente función
            this.continuar();

        })

    }

    // Función que presenta la opción de reiniciar el combate o cambiar el rival
    continuar(){

        // Indico título y detalle de las instrucciones
        this.tituloInstrucciones = "Volver a jugar";
        this.instrucciones = `Se puede repetir el mismo combate o cambiar el rival..`;

        // Creo el Event Listener que muestra el cartel con las instrucciones
        this.btnInstrucciones.addEventListener('click', this.referenciaInstrucciones = () => {
            Swal.fire({
                title: this.tituloInstrucciones,
                html: this.instrucciones,
                icon: "info",
                color: "#fff",
                background: "#000009",
                confirmButtonColor: "#2f4f4f",
                confirmButtonText: "Entendido"
            });

        });

        // Identifico el ID para reiniciar el combate
        const reiniciarCombate = document.querySelector("#reiniciarCombate");

        // Identifico el ID para cambiar el rival
        const cambiarRival = document.querySelector("#cambiarRival");

        // Event Listener para identificar cuándo se opta por reiniciar el combate
        reiniciarCombate.addEventListener("click", this.referencia1 = () => {

            // Remuevo los event listeners
            reiniciarCombate.removeEventListener("click", this.referencia1);
            cambiarRival.removeEventListener("click", this.referencia2);
            this.btnInstrucciones.removeEventListener('click', this.referenciaInstrucciones);

            // Vuelvo a iniciar el combate
            this.pantallaCombate();
            
        })

        // Event Listener para identificar cuándo se opta por cambiar el rival
        cambiarRival.addEventListener("click", this.referencia2 = () => {

            // Remuevo los event listeners
            reiniciarCombate.removeEventListener("click", this.referencia1);
            cambiarRival.removeEventListener("click", this.referencia2);
            this.btnInstrucciones.removeEventListener('click', this.referenciaInstrucciones);

            // Creo al nuevo rival
            this.crearJugadorRival();

            // Vuelvo a iniciar el combate
            this.pantallaCombate();
            
        })

    }

    // Función que sube this a local storage
    subirLocalStorage(){
        const objetoSubido = JSON.stringify(this);
        localStorage.setItem("juego", objetoSubido);
    }

    // Función que descarga el personaje alojado en local storage
    personajeLocalStorage(){
        // Descargo la información alojada en el local storage
        const objetoDescargado = JSON.parse( localStorage.getItem( 'juego' ) );
        // Tomo la información del personaje creado para el jugador
        const { jugador } = objetoDescargado;
        // Tomo la información requerida para crear un personaje nuevo
        const {  nombre, raza, clase, imagen } = jugador;
        // Creo un personaje nuevo
        const nuevoPersonaje = new Personaje( nombre, raza, clase, imagen );
        // Lo utilizo para generar la copia del personaje con la información del local storage
        const jugadorDescargado = nuevoPersonaje.copiarPersonaje(jugador);
        // Selecciono la caja en donde se van a mostrar los stats
        const statsAnteriores = document.querySelector("#statsAnteriores");
        // Muestro los stats
        jugadorDescargado.mostrarStats( statsAnteriores, false );
    }

    // Función que descarga el local storage si el jugador decide reiniciar una partida guardada
    descargarLocalStorage(){
        // Descargo la información alojada en el local storage
        const objetoDescargado = JSON.parse( localStorage.getItem( 'juego' ) );

        // Desestructuro toda la información relevante del local storage
        const { nombre, raza, clase, imagen, nombreRival,
            jugador, jugadorRival, personajes,
            victoriasJugador, victoriasRival } = objetoDescargado;

        // Tomo los datos desestructurados para el juego
        this.nombre = nombre;
        this.raza = raza;
        this.clase = clase;
        this.imagen = imagen;
        this.nombreRival = nombreRival;
        this.jugador = jugador;
        this.jugadorRival = jugadorRival;
        this.personajes = personajes;
        this.victoriasJugador = victoriasJugador;
        this.victoriasRival = victoriasRival;

        //Creo un personaje para utilizarlo en el copiado
        const personaje = new Personaje( this.nombre, this.raza, this.clase, this.imagen );

        // Copio los personajes alojados en el local storage
        this.jugador = personaje.copiarPersonaje( this.jugador );
        this.jugadorRival = personaje.copiarPersonaje( this.jugadorRival );

        // Cambio la disposición del contenedor
        this.seccion.classList.add('row');

        // Inicio la pantalla para el combate
        this.pantallaCombate();

    }

}

// Creo una instancia del juego
const juego = new ElJuego();