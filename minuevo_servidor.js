import http from 'http';
import url from 'url';


const servidor = http.createServer((req, res) => {

    //console.log(req);
    const urlProcesada = url.parse(req.url, true);
    //console.log(urlProcesada);
    const queryParams = urlProcesada.query;
    console.log(queryParams.x);

    console.log('Petición revibida: ' + req.method + ' ' + req.url);

    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });

    if (queryParams.x === '1'){
        res.end(`Respuesta A: Has enviado el valor x = ${queryParams.x}. ¡Primera opción activada!`); 
    } else if (queryParams.x === '2') {
        res.end(`Respuesta B: Has enviado el valor x = ${queryParams.x}. ¡Segunda opción activada!`); 
    } else {
        res.end(`Valor de x no reconocido: ${queryParams.x}. Por favor, envía x=1 o x=2.`);
    }

    console.log("Alguien me mandó una solicitud");
    res.end('Quiero la libertad de esculpir y cincelar mi propio rostro, de detener la hemorragia con cenizas, de crear mis propios dioses a partir de mis entrañas...\n');

});

const puerto = 3000;

servidor.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});
