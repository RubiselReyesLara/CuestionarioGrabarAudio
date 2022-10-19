document.getElementById('btn-grabar').addEventListener('click', grabarAudio);
document.getElementById('btn-enviar').addEventListener('click', enviarAudio);


let BLOB;

function grabarAudio(){
    BLOB = null;
    const GRABADOR = navigator.mediaDevices.getUserMedia({
        audio: true });

    const TRAMA_AUDIO = new Array();
    GRABADOR.then(stream => {
        const GRABACION = new MediaRecorder(stream);

        GRABACION.ondataavailable = ELEMENTO => {


            TRAMA_AUDIO.push(ELEMENTO.data);

            if(GRABACION.state == 'inactive') {
                
                BLOB = new Blob(TRAMA_AUDIO, {
                    type: 'audio/wav'
                });

                const AUDIO = document.getElementById('audioResultado');
                const AUDIO_CONTENEDOR_PRICIPAL = document.createElement('audio');
                AUDIO_CONTENEDOR_PRICIPAL.setAttribute('controls', 'controls');
                AUDIO.append(AUDIO_CONTENEDOR_PRICIPAL);

                const ELIMINAR = document.createElement('button');
                ELIMINAR.setAttribute('id', 'eliminar');
                ELIMINAR.setAttribute('onclick', 'eliminadf()');
                ELIMINAR.innerHTML = 'X';
                AUDIO.append(ELIMINAR);


                AUDIO_CONTENEDOR_PRICIPAL.innerHTML = '<source id="source" src="' + URL.createObjectURL(BLOB) + '" type="video/webm"/>'
            }
        }

        GRABACION.start(100);
        setTimeout(()=>{
            GRABACION.stop();
        }, 5000);

    });
}

var BASE64_MARKER = ';base64,';
function convertDataURIToBinary(dataURI) {
    var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    var base64 = dataURI.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));

    for(i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
    }
    return array;
}


function enviarAudio(){
    const f = new FormData();
    f.append('audio', BLOB);
    f.append('name', "id");

    fetch('subir.php',{
           method: 'post',
        body: f
    }).then(r => r.text()).then(data => console.log(data));
}

function eliminadf(){
    const boton = document.getElementById('eliminar');
    document.getElementById('audioResultado').innerHTML = '';
}
