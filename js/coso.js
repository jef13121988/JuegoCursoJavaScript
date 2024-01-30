const switch1 = document.querySelector("#switch1");
const switch2 = document.querySelector("#switch2");

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