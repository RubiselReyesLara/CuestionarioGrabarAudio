document.getElementById('btn-enviar').addEventListener('click', envio);

function envio(){
    const f = new FormData();
    f.append('h','ingrid');

    fetch('upload.php',{
        method: 'post',
        body: f
    }).then(r => r.json()).then(data => console.log(data));
}