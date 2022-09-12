// llamar funciones al iniciar el documento
document.addEventListener('DOMContentLoaded', function(){
    nuevoJuego();
    crearPalabra();
    desistir();
})
// Variables para canvas
let pantalla = document.querySelector("canvas");
let pincel = pantalla.getContext("2d");

// Menus 
const menuPrincipal = document.querySelector("#menu-principal");
const menuNuevaPalabra = document.querySelector(".boton-palabra")
const main = document.querySelector("#juego");

// Botones
const reiniciar = document.querySelector("#nuevoJuego");
const botonIniciar = document.querySelector("#iniciar-juego");
const botonDesistir = document.querySelector("#desistir")
const volverPalabra = document.querySelector("#volver-agregarPalabra")
const botonNuevaPalabra = document.querySelector("#agregar-palabra")
const nuevaPalabra = document.querySelector("#nuevaPalabra"); 
const resultado = document.querySelector(".resultado")

// mensaje de palabra agregada
const mensajePalabraAgregada = document.querySelector("#maximo-caracteres"); 

// Variable de intentos de html y contadores
let intentos = document.querySelector(".oportunidades");
let oportunidades = 0;

// variables de la palabra
const contenedorPalabra = document.querySelector(".palabra");
let palabras = ["QUESO","ROJO","HABLAR","DESAFIO","GATO","GUIÑO","PERSONA","OCULTO"];
let palabra = randomWord();
let letrasUsadas = [];    
let victoria = false;

// Teclado web
var teclado = document.querySelectorAll(".key");

// Comprobacion de la A a la Z
const isAZ = RegExp('[A-ZÑa-zñ]');


// on clicks funciones
botonIniciar.onclick = iniciarJuego;
botonDesistir.onclick = desistir;
botonNuevaPalabra.onclick = mostrarAgregarPalabra;
volverPalabra.onclick = desistir;
nuevaPalabra.onclick = agregarPalabra;
reiniciar.onclick = reiniciarPartida
// Reiniciar o salir del juego
function reiniciarPartida() {
    nuevoJuego();
    palabra = randomWord();
    contenedorPalabra.innerHTML = "";
    crearPalabra();
    letrasUsadas = [];
    oportunidades = 0;
    intentos.innerHTML = oportunidades + "/6";
    resultado.innerHTML = "";
    victoria = false;
}

// agregar palabra a la lista
function agregarPalabra() {
    let contenido = document.querySelector(".text-area");
    contenidoMayuscula = contenido.value.toUpperCase();
    for (let i = 0; i < contenidoMayuscula.length; i++) {
        if (!isAZ.test(contenidoMayuscula[i])) {
            mostrarError();
            return;
        }
    }
    if (contenidoMayuscula.length > 2 && contenidoMayuscula.length < 10) {
    palabras.push(contenidoMayuscula);
    mostrarCorrecto()
    } else {
        mostrarError()
    }
    contenido.value = ""
}
// Avisar si la palabra se agrego
function mostrarCorrecto() {
    const correcto = document.createElement('P')
    correcto.textContent = "Su palabra se ingreso correctamente";
    correcto.classList.add('correcto');

    mensajePalabraAgregada.appendChild(correcto);
    setTimeout(()=>{
        correcto.remove();
    }, 2000);
}
// Avisar si no se pudo agregar la palabra
function mostrarError() {
    const error = document.createElement('P')
    error.textContent = "La palabra debe tener entre 3 y 9 caracteres y sin caracteres especiales";
    error.classList.add('error');

    mensajePalabraAgregada.appendChild(error);
    setTimeout(()=>{
        error.remove();
    }, 2000);
}
// mostrar el menu agregar palabra
function mostrarAgregarPalabra() {
    menuPrincipal.style.display = "none";
    menuNuevaPalabra.style.display = "flex"
}
// volver al menu principal
function desistir() {
    main.style.display = "none";
    menuNuevaPalabra.style.display = "none";
    menuPrincipal.style.display = "flex";
    reiniciarPartida()
};
// Crear la palabra debajo del horcado
function crearPalabra() {
    for(let i = 0; i < palabra.length; i++) {
        const letra = document.createElement('P');
        letra.setAttribute("id","letra" + i);
        contenedorPalabra.appendChild(letra);
    }
  }
// Cambiar lo dysplay para ocultar y mostrar menus
function iniciarJuego() {
    main.style.display = "inline";
    menuPrincipal.style.display = "none";
}

// Pintar Cuadrados
function pintar(ejeX,ejeY,weight,height,color) {
    pincel.fillStyle = color;
    pincel.fillRect(ejeX,ejeY,weight,height); 
    }
// Pintar Circulos
function dibujarCirculo(x, y, radio, color) {
    pincel.fillStyle = color;
    pincel.beginPath();
    pincel.arc(x, y, radio, 0, 2*3.14);
    pincel.fill();
    }
// Iniciar el canvas
function nuevoJuego() {
if(pantalla.width == 290 & pantalla.height == 350) {
    pincel.clearRect(0,0,290,350);
    pintar(20,340,110,10,"black");
    pintar(70,40,10,350,"black");
    pintar(80,40,120,10,"black");  
    pintar(190,50,10,40,"white");
    }
}
// Errores y conteo de oportunidades
function error() {
    if (oportunidades < 6) {
        oportunidades++
    }
      // 1 error
    if(oportunidades == 1) {
        nuevoJuego();
        dibujarCirculo(195,124,24,"white");
        dibujarCirculo(195,110,28,"black");
        dibujarCirculo(195,110,22,"white");
        dibujarCirculo(185,105,4,"black");
        dibujarCirculo(205,105,4,"black");
        pintar(185,118,20,3,"black");
    }
    if(oportunidades == 2) {
        // 2 error
        pintar(190,140,8,110,"black");
        dibujarCirculo(195,124,24,"white");
        dibujarCirculo(195,110,28,"black");
        // cabeza comun
        dibujarCirculo(195,110,22,"white");
        dibujarCirculo(185,105,4,"black");
        dibujarCirculo(205,105,4,"black");
        pintar(185,118,20,3,"black");
    }
    if(oportunidades == 3){
        // 3 error
        pincel.fillStyle = "black";
        pincel.beginPath();
        pincel.moveTo(190, 244);
        pincel.lineTo(162, 299);
        pincel.lineTo(167, 306);
        pincel.lineTo(197, 251);
        pincel.fill();
    }
    if(oportunidades == 4){
        // 4 error
        pincel.fillStyle = "black";
        pincel.beginPath();
        pincel.moveTo(198, 244);
        pincel.lineTo(229, 299);
        pincel.lineTo(221, 306);
        pincel.lineTo(190, 251);
        pincel.fill(); 
    }

    if(oportunidades == 5) {
        // 5 error
        pincel.fillStyle = "black";
        pincel.beginPath();
        pincel.moveTo(190, 164);
        pincel.lineTo(159, 219);
        pincel.lineTo(167, 226);
        pincel.lineTo(197, 171);
        pincel.fill();
    }
    if(oportunidades == 6) {
        //error 6
        pincel.fillStyle = "black";
        pincel.beginPath();
        pincel.moveTo(198, 164);
        pincel.lineTo(229, 219);
        pincel.lineTo(221, 226);
        pincel.lineTo(190, 171);
        pincel.fill();
        
        // Cabeza final
        dibujarCirculo(195,110,23,"white")
        // cruz izquierda
        pincel.fillStyle = "black";
        pincel.beginPath();
        pincel.moveTo(179, 110);
        pincel.lineTo(191, 98);
        pincel.lineTo(189, 96);
        pincel.lineTo(181, 112);
        pincel.fill();
        pincel.beginPath();
        pincel.moveTo(181, 96);
        pincel.lineTo(189, 112);
        pincel.lineTo(191, 110);
        pincel.lineTo(179, 98);
        pincel.fill();
        // cruz derecha
        pincel.fillStyle = "black";
        pincel.beginPath();
        pincel.moveTo(199, 110);
        pincel.lineTo(211, 98);
        pincel.lineTo(209, 96);
        pincel.lineTo(201, 112);
        pincel.fill();
        pincel.beginPath();
        pincel.moveTo(201, 96);
        pincel.lineTo(209, 112);
        pincel.lineTo(211, 110);
        pincel.lineTo(199, 98);
        pincel.fill();
        dibujarCirculo(195,123,9,"black");
    }
}
// Palabra random
function randomWord() {
    return palabras[Math.floor(Math.random() * (palabras.length))].toUpperCase();
}
// Accion del teclado fisico
document.addEventListener('keydown', function (e){
    let tecla = e.key.toUpperCase();
    teclaFuncion(tecla)   
})
// Accion teclado web on click
for (teclas of teclado){
    teclas.addEventListener('click', function(e) {
        const elemento = e.target.textContent;
        teclaFuncion(elemento);
    })
}
// Accion de las teclas
function teclaFuncion(tecla) {
    let contador = 0;
    if (tecla.length > 1 || !isAZ.test(tecla) || victoria == true){ 
        return;
    }
    for (let i = 0; i < letrasUsadas.length; i++) {
        if (tecla == letrasUsadas[i]) {
            return;
        }
    }
    for (let i = 0; palabra.length > i; i++) {
        if (palabra[i] == tecla && contador == 0) {
            contador++;
            letrasUsadas.push(tecla);
            insertarLetra(tecla);
            break;
        }
    }
    comprobarVictoria();
    if (victoria == true) {
        resultado.innerHTML = "<p>Felicidades ganaste tu palabra era " + palabra + "</p>"
    }
    if (contador == 0) {
        letrasUsadas.push(tecla);
        error();
        arrayLetras(tecla);
        intentos.innerHTML = oportunidades + "/6";
        if (oportunidades == 6) {
            resultado.innerHTML = "<p>Perdiste intentalo la proxima tu palabra era " + palabra + "</p>"
        }
    }
}
// Mostrar letras usadas
function arrayLetras(letra) {
    if (oportunidades == 6) {
        return
    } 
    resultado.innerHTML += " " + letra    
}
// Colocar la letra en el ___
function insertarLetra(letra) {
    if (oportunidades == 6) {
        return
    } else {
    for(let i = 0; i < palabra.length; i++) {
        let letraI = document.querySelector("#letra" + i);
        if (palabra[i] == letra) {
            letraI.innerHTML = palabra[i];
        }
    }}
}
// Comprobar la victoria
function comprobarVictoria() {
    victoria = true
    let palabrasVacias = 0;
    for(let i = 0; i < palabra.length; i++) {
        let letraI = document.querySelector("#letra" + i);
        if (letraI.textContent == "") {
            palabrasVacias++;
        }
    }
    if (palabrasVacias > 0) {
        victoria = false;
    }
    return victoria
}



