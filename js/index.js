// Selecciono la sección que debería incorporar la imagen
const cajaPortada = document.querySelector('#cajaPortada');

// Sorteo la imagen de portada
const sortearPortada = ( arreglo ) => {
    let sorteo = Math.floor(Math.random() * arreglo.length);
    const imagenPortada = arreglo[sorteo];
    return imagenPortada;
}

// Actualizo la imagen de portada
const mostrarPortada = ( constante ) => {
    cajaPortada.innerHTML = //html
        `<img src="img/${constante}.jpg"
        alt="Portada de un elfo oscuro rogue peleando contra un orco bárbaro" class="portada">
        `;
};

// Importo los datos del json y corro las demás funciones
const importarPortada = async () => {

    try {
        // Indico la ruta del json
        const endPoint = 'models/data.json';
        // Intento conectarme con la ruta
        const response  = await fetch(endPoint);
        // Intento levantar la informaicón
        const json = await response.json();
        // Declaro la variable que va a contener el array
        const imagenesPortada = json.imagenesPortada;
        const imagenPortada = sortearPortada(imagenesPortada);
        mostrarPortada(imagenPortada);
    } catch (error) {
        alert("Error");
    }

}

// Corro la función para definir la portada
importarPortada();