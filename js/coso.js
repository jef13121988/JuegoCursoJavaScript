let referencia;

const arreglo = [
    {
    agilidad: 23,
    ataque: 17,
    clase: "rogue",
    constitucion: 16,
    destreza: 31,
    evasion: 77,
    experiencia: 0,
    experienciaOtorgada: 50,
    fuerza: 16,
    imagen: "eo-r",
    indice: 1,
    inteligencia: 24,
    mana: 51,
    nivel: 1,
    nombre: "Jonás",
    precision: 62,
    precisionArma: 1,
    raza: "elfo oscuro",
    velocidad: 35,
    vida: 78
    },

    {
    agilidad: 24,
    ataque: 17,
    clase: "rogue",
    constitucion: 19,
    destreza: 25,
    evasion: 73,
    experiencia: 0,
    experienciaOtorgada: 50,
    fuerza: 19,
    imagen: "eo-r",
    indice: 2,
    inteligencia: 22,
    mana: 49,
    nivel: 1,
    nombre: "Jonás",
    precision: 50,
    precisionArma: 1,
    raza: "elfo oscuro",
    velocidad: 36,
    vida: 87
    },

    {
    agilidad: 23,
    ataque: 17,
    clase: "rogue",
    constitucion: 16,
    destreza: 31,
    evasion: 77,
    experiencia: 0,
    experienciaOtorgada: 50,
    fuerza: 16,
    imagen: "eo-r",
    indice: 3,
    inteligencia: 24,
    mana: 51,
    nivel: 1,
    nombre: "Jonás",
    precision: 62,
    precisionArma: 1,
    raza: "elfo oscuro",
    velocidad: 35,
    vida: 78
    },
    
    {
    agilidad: 24,
    ataque: 17,
    clase: "rogue",
    constitucion: 19,
    destreza: 25,
    evasion: 73,
    experiencia: 0,
    experienciaOtorgada: 50,
    fuerza: 19,
    imagen: "eo-r",
    indice: 4,
    inteligencia: 22,
    mana: 49,
    nivel: 1,
    nombre: "Jonás",
    precision: 50,
    precisionArma: 1,
    raza: "elfo oscuro",
    velocidad: 36,
    vida: 87
    },

    {
    agilidad: 23,
    ataque: 17,
    clase: "rogue",
    constitucion: 16,
    destreza: 31,
    evasion: 77,
    experiencia: 0,
    experienciaOtorgada: 50,
    fuerza: 16,
    imagen: "eo-r",
    indice: 5,
    inteligencia: 24,
    mana: 51,
    nivel: 1,
    nombre: "Jonás",
    precision: 62,
    precisionArma: 1,
    raza: "elfo oscuro",
    velocidad: 35,
    vida: 78
    },
    
    {
    agilidad: 24,
    ataque: 17,
    clase: "rogue",
    constitucion: 19,
    destreza: 25,
    evasion: 73,
    experiencia: 0,
    experienciaOtorgada: 50,
    fuerza: 19,
    imagen: "eo-r",
    indice: 6,
    inteligencia: 22,
    mana: 49,
    nivel: 1,
    nombre: "Jonás",
    precision: 50,
    precisionArma: 1,
    raza: "elfo oscuro",
    velocidad: 36,
    vida: 87
    },

    {
    agilidad: 23,
    ataque: 17,
    clase: "rogue",
    constitucion: 16,
    destreza: 31,
    evasion: 77,
    experiencia: 0,
    experienciaOtorgada: 50,
    fuerza: 16,
    imagen: "eo-r",
    indice: 7,
    inteligencia: 24,
    mana: 51,
    nivel: 1,
    nombre: "Jonás",
    precision: 62,
    precisionArma: 1,
    raza: "elfo oscuro",
    velocidad: 35,
    vida: 78
    },
    
    {
    agilidad: 24,
    ataque: 17,
    clase: "rogue",
    constitucion: 19,
    destreza: 25,
    evasion: 73,
    experiencia: 0,
    experienciaOtorgada: 50,
    fuerza: 19,
    imagen: "eo-r",
    indice: 8,
    inteligencia: 22,
    mana: 49,
    nivel: 1,
    nombre: "Jonás",
    precision: 50,
    precisionArma: 1,
    raza: "elfo oscuro",
    velocidad: 36,
    vida: 87
    },

    {
    agilidad: 23,
    ataque: 17,
    clase: "rogue",
    constitucion: 16,
    destreza: 31,
    evasion: 77,
    experiencia: 0,
    experienciaOtorgada: 50,
    fuerza: 16,
    imagen: "eo-r",
    indice: 9,
    inteligencia: 24,
    mana: 51,
    nivel: 1,
    nombre: "Jonás",
    precision: 62,
    precisionArma: 1,
    raza: "elfo oscuro",
    velocidad: 35,
    vida: 78
    }
]

function mostrarStats( caja, objeto ){
    caja.innerText = `Los stats de ${objeto.nombre} son:

Atributos generales:
- Raza: ${objeto.raza}.
- Clase: ${objeto.clase}.
- Nivel: ${objeto.nivel}.
- Experiencia: ${objeto.experiencia}.
- Precisión del arma: ${objeto.precisionArma}.

Atributos principales:
- Agilidad: ${objeto.agilidad}.
- Constitución: ${objeto.constitucion}.
- Destreza: ${objeto.destreza}.
- Fuerza: ${objeto.fuerza}.
- Inteligencia: ${objeto.inteligencia}.

Atributos derivados:
- Ataque: ${objeto.ataque}.
- Vida: ${objeto.vida}.
- Maná: ${objeto.mana}.
- Precisión: ${objeto.precision}.
- Evasión: ${objeto.evasion}.
- Velocidad: ${objeto.velocidad}.

Personaje número: ${objeto.indice}

`
}

function mostrarPersonajes( caja, arreglo ){
    caja.innerHTML = "";
    arreglo.forEach( item => {
        caja.innerHTML += // html
            `<div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <img id="${item.indice}" class="imgPersonaje" src="../img/${item.imagen}.jpg" alt="Imagen de un ${item.raza} con clase ${item.clase}">
            </div>`
    });

    const imgPool = document.querySelectorAll('.imgPersonaje');
    
    imgPool.forEach( imgEnPool => {
        imgEnPool.addEventListener('click', referencia = listenerPool);
    })

}

function listenerPool( evento ){
    const id = evento.target.id;
    const personajePreSeleccionado = arreglo.filter( item => item.indice === parseInt(id))[0];

    if ( switch1.alt === "activo" ) {
        mostrarStats( statsPersonaje1, personajePreSeleccionado );
    } else {
        mostrarStats( statsPersonaje2, personajePreSeleccionado );
    }

}

const seccion = document.querySelector("#seccion");

seccion.innerHTML = // html
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
            </div>`

const switch1 = document.querySelector("#switch1");
const switch2 = document.querySelector("#switch2");
const statsPersonaje1 = document.querySelector("#statsPersonaje1");
const statsPersonaje2 = document.querySelector("#statsPersonaje2");
const cajaPoolPersonajes = document.querySelector("#cajaPoolPersonajes");

mostrarStats( statsPersonaje1, arreglo[0] );
mostrarStats( statsPersonaje2, arreglo[1] );
mostrarPersonajes( cajaPoolPersonajes, arreglo );


switch1.addEventListener("click", () => {
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

switch2.addEventListener("click", () => {
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