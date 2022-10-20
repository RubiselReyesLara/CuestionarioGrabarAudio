import {Recorder} from './recorder.js';

let indexPregunta = 0;
let grabacion;
let entrada; 
let audioContext;
let gumStream;
let blobAudio = null;
let temporizador;

let id_usuario = 'usuario';
let barraTemporizador = null;
let porcentaje;

let grabar;
let detener;
let enviar;

let btn_eliminar;

cargarControles();

function cargarControles(){
    if(indexPregunta < 3){

    grabar = document.getElementById('btn-grabar' + indexPregunta);
    detener = document.getElementById('btn-detener' + indexPregunta);
    enviar = document.getElementById('btn-enviar'+ indexPregunta);

    grabar.addEventListener('click', grabarAudio);
    detener.addEventListener('click', detenerGrabacion);
    enviar.addEventListener('click', guardarAudio);

    barraTemporizador = document.getElementById("barra-progreso" + indexPregunta);
    porcentaje = document.getElementById('porcentaje'+indexPregunta);
    barraTemporizador.style.width = '0%';

    grabar.disabled = false;

    } else {

        document.getElementById('mensajeFinal').innerHTML = 
        `Se completo el cuestionario. Usted fue el usuario #${id_usuario}`;

    }
}

function grabarAudio(){
    grabar.disabled = true;
    detener.disabled = false;

    encenderBarraProgreso();
    navigator.mediaDevices.getUserMedia({
        audio: true, video: false
    }).then(
        (stream)=>{
            audioContext = new AudioContext();
            gumStream = stream;

            entrada = audioContext.createMediaStreamSource(stream);

            grabacion = new Recorder(entrada, {
                numChannels: 1
            });

            grabacion.record();
            console.log('comenzo...');

            temporizador = setTimeout(() => {
                detenerGrabacion();
            }, 61000);

        });

}

function detenerGrabacion(){
    detener.disabled = true;
    enviar.disabled = false;


    grabacion.stop();
    gumStream.getAudioTracks()[0].stop();
    grabacion.exportWAV(mostrarAudio);
    segundosBarraProgreso = 0;
    clearInterval(intervalo);
    clearTimeout(temporizador);
}

function mostrarAudio(blob){
    blobAudio = blob;
    let url = URL.createObjectURL(blob);
    let audio = document.createElement('audio');

    audio.controls = true;
    audio.src = url;

    btn_eliminar = document.createElement('button');
    btn_eliminar.setAttribute('id', 'eliminar' + indexPregunta);
    btn_eliminar.addEventListener ("click", eliminar);
    btn_eliminar.innerHTML = 'X';

    const div_audio = document.getElementById('audioResultado' + indexPregunta);

    div_audio.append(btn_eliminar);
    div_audio.append(audio);
}

function guardarAudio(){
    if(confirm('¿Esta seguro de guardar la respuesta de la pregunta ' + (indexPregunta + 1) + '?')){
        grabar.disabled = true;
        detener.disabled = true;
        enviar.disabled = true;
        btn_eliminar.disabled = true;

        if(typeof blobAudio != null){
        const datos = new FormData();
        datos.append('audio_data',blobAudio, indexPregunta);
        datos.append('usuario', id_usuario);
        
            fetch('subir.php',{
                    method: 'POST',
                    body: datos
            }).then(r => r.text()).then(data => {
                console.log(data);
                id_usuario = data;
                    });
        } else {
            alert('Ingrese su respuesta...');
        }
        indexPregunta++;
        cargarControles();
    }
}

function eliminar(){
    grabar.disabled = false;
    detener.disabled = true;
    enviar.disabled = true;

    barraTemporizador.style.width = '0%';
    segundosBarraProgreso = 0;

    porcentaje.innerHTML = '0%';

    const boton = document.getElementById('eliminar' + indexPregunta);
    document.getElementById('audioResultado' + indexPregunta).innerHTML = '';
    blobAudio = null;
}

let intervalo = null;
let segundosBarraProgreso = 0;


function encenderBarraProgreso() {
    let width = 0;
    const porcentaje = document.getElementById('porcentaje'+indexPregunta);
    intervalo = setInterval(avanzarProgreso, 1000);

    function avanzarProgreso(){
        if(width < 99){
        width += 3.33;
        segundosBarraProgreso++;
        porcentaje.innerHTML = segundosBarraProgreso + 's';
        barraTemporizador.style.width = width + "%";
        } else {
            porcentaje.innerHTML = '100%';
            barraTemporizador.style.width = "100%";
            clearInterval(intervalo);
        }
    }

}