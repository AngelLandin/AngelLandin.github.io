// El módulo "http" sirve para transferir información entre dispositivos conectados a la red.
import http from 'http';
// El módulo "fs" (file system) permite interactuar con el sistema de archivos del disco duro.
import fs from 'fs';


//Esta función deberá mostrar deberá mostrar una página HTML 
function darBienvenida(req, res) {
    fs.readFile('bienvenida.html', 'utf8', (error, data) => {
         if (error) {
         //Escribe qué significa el 500 
        // El 500 significa "Internal Server Error". Ocurre cuando el servidor falla al procesar la solicitud.
          res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Oh no!!!! El servidor falló al cargar el archivo.');
          return;
    }

        //Escribe qué significa el 200
      // El 200 significa "OK". La solicitud fue exitosa.
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
  });
}

//Esta función deberá enviar un json con los datos de los usuarios
function getUsuarios(req, res) {
    //Esto representa un objeto JSON de un usuario
    //Agrega otro usuario
    const listaUsuarios = [
        { "nombre": "Punk", "saldo": "0" },
        { "nombre": "Anarky", "saldo": "1000" }
  ];

    res.writeHead(200, { 'Content-Type': 'application/json' });

    //Escribe qué hace la función stringify y por qué la tenemos que usar
    // La función stringify convierte un objeto JavaScript en texto JSON para poder enviarlo por la red.
    res.end(JSON.stringify(listaUsuarios));
}

function mostrarPerfil(req, res) {
    fs.readFile('perfil.html', 'utf8', (error, data) => {
        if (error) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Oh no!!!!');
            return;
          }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
}

function mostrarMovimientos(req, res) {
    //Construye una página básica movimientos.html
    fs.readFile('movimientos.html', 'utf8', (error, data) => {
      if (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Oh no!!!!');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
}

//Esta función deberá enviar un json con los datos de las movimientos
function getMovimientos(req, res) {
    //Tienes que corregir varias cosas en esta sección
    // Corregido: Ahora envía un JSON con datos de movimientos financieros reales
    const historial = [
        { "movimiento": "Deposito", "cantidad": 500 },
        { "movimiento": "Pago Kueski", "cantidad": -250 }
    ];
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(historial));
}

function manejarRuta404(req, res) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    //Cambia el mensaje por algo más divertido
    res.end('Error 404: Página no encontrada. Es como la sexta Champions League del Barcelona, la buscan cada año pero nunca la encuentran.');
}

function mostrarEquipo(req, res) {
    fs.readFile('equipo.html', 'utf8', (error, data) => {
        if (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error al cargar el equipo.');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
}

function mostrarOpinion(req, res) {
    fs.readFile('opinion.html', 'utf8', (error, data) => {
        if (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error al cargar la opinion.');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
}



// Documentación oficial: https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener
const servidor = http.createServer((req, res) => {
    const url = req.url;

    if (url === '/') {
        darBienvenida(req, res);
    } else if (url === '/api/usuarios') {
        getUsuarios(req, res);
    } else if (url === '/api/movimientos') {
        getMovimientos(req, res); // Corregido el nombre de la función
    } else if (url === '/usuarios') {
        getUsuarios(req, res); // Reutilizamos la API para esta ruta
    } else if (url === '/movimientos') {
        mostrarMovimientos(req, res);
    } else if (url === '/perfil') {
        mostrarPerfil(req, res);
    } else if (url === '/equipo') {
        mostrarEquipo(req, res);
    } else if (url === '/opinion') {
        mostrarOpinion(req, res);
    } else {
        manejarRuta404(req, res);
    }

    //Agrega una ruta /equipo y su función correspondiente para que muestre el equipo del proyecto
      //Haz una página equipo.html correspondiente
      //Escribe el nombre completo y una cualidad que valores en esa persona de tu equipo
      //Trata de agregar una imagen a equipo.html
      //Explica si la puedes ver, en caso negativo ¿qué crees que pase?
      // No, la imagen aparece rota. Esto sucede porque el servidor de Node.js actual (servidor.js) solo tiene rutas definidas con la lógica de if/else para devolver HTML o JSON. No hemos programado ninguna función para leer y servir archivos estáticos con extensiones como .jpg o .png. Por lo tanto, cuando el navegador pide la imagen, el servidor cae en la ruta por defecto y devuelve el error 404.

      //Agrega una ruta /opinion
      //Haz una página opinion.html
      // Lee el siguiente artículo y responde ¿Crees que el colonialismo digital es un riesgo para tu carrera profesionl? ¿Para tu vida persona?
      // Sí. Como estudiante de ITC, existe el riesgo de que el mercado laboral en el Sur Global se reduzca a simplemente consumir APIs y mantener infraestructura controlada por monopolios tecnológicos de Estados Unidos (Google, Microsoft, Amazon), en lugar de innovar y crear soberanía tecnológica local.
      //¿Qué es el freedombox? FreedomBox es un proyecto de software libre que busca descentralizar internet. Permite a las personas tener su propio servidor personal en casa (usualmente en hardware económico) para manejar correos, mensajes y archivos, evitando que los gigantes tecnológicos se adueñen de estos datos.
      // Y también es un riesgo para mi vida personal. Significa que mi privacidad, gustos, código y datos personales están almacenados en servidores extranjeros, regidos por leyes que no me protegen, convirtiéndome en el producto que estas empresas monetizan y utilizan para entrenar sus propios modelos.
      //https://www.aljazeera.com/opinions/2019/3/13/digital-colonialism-is-threatening-the-global-south
});

const puerto = 2500;
servidor.listen(puerto, () => {
    console.log(`Servidor escuchando en http://localhost:${puerto}`);
});




// GET: Obtener informacion de un cliente en especifico
// /user/{id-user}
function getUser(req, res) {}

// GET: Obtener saldo de KueskiPay y cashback acumulado (FR-002, FR-009)
// /user/profiles
function getProfile(req, res) {}

// POST: Crear una orden de pago (Checkout) en Kueski Pay
// /v1/orders
// URL inventada para simular la creación de una orden en Kueski Pay
function createKueskiOrder(req, res) {
    const response = {
      "order_id": "ord_8984jd93kd",
      "status": "CREATED",
      "checkout_url": "https://pay.kueski.com/checkout/ord_8984jd93kd",
      "expires_at": "2026-04-23T18:00:00Z"
    };
    
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
}

// GET: Consultar el estado de una orden en Kueski Pay
// /v1/orders/{order_id}
function getKueskiOrderStatus(req, res) {
    const response = {
      "order_id": "ord_8984jd93kd",
      "amount": 2500.00,
      "currency": "MXN",
      "status": "APPROVED",
      "customer_info": {
        "email": "cliente@email.com"
      },
      "created_at": "2026-04-23T17:30:00Z",
      "approved_at": "2026-04-23T17:35:12Z"
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
}

// POST: Cancelar una orden de pago existente en Kueski Pay
// /v1/orders/{order_id}/cancel
function cancelKueskiOrder(req, res) {
    const response = {
      "order_id": "ord_8984jd93kd",
      "status": "CANCELED",
      "message": "La orden fue cancelada exitosamente."
    };
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
}

// GET: Obtener las opciones de quincenas disponibles para un usuario
// /v1/payment-terms
function getKueskiPaymentTerms(req, res) {
    const response = {
      "available_terms": [
        { "quinces": 4, "interest_rate": "0%" },
        { "quinces": 6, "interest_rate": "5.5%" }
      ]
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
}