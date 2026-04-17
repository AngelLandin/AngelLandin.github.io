import http from 'http';


const servidor = http.createServer(async (req, res) => {
  console.log('Alguien me mandó una solicitud');
  try{
    const respuesta = await fetch('https://www.theaudiodb.com/api/v1/json/2/search.php?s=blackpink');
    const datos = await respuesta.json();

    const name = datos.artists[0].strArtist;
    const bibio = datos.artists[0].strBiography;

    // 3. Construimos el HTML dinámicamente SIN la etiqueta <img>
    const paginaHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${name} - Mi Servidor</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body style="background-color: #1a1a1a; color: bisque; text-align: center; padding: 40px;">
          
          <h1 class="display-3 fw-bold text-primary mb-5">${name}</h1>
          
          <div class="container">
            <p class="lead" style="text-align: justify; margin: 0 auto; max-width: 800px;">
              ${bibio}
            </p>
          </div>

        </body>
      </html>
    `;

    // 4. Enviamos la página al navegador
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(paginaHTML);

    //res.writeHead(200, { 'Content-Type': 'text/plain' });
    //res.end('GOOOOOOLAZOOOOOOOOOOOOOOOOOOOO DEL AMERICA CONTRA LA FIERA...\n');
  } catch (error) {
    console.error('Error al hacer el fetch:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Tenemos un problema. No pudimos contactar a la API.');
  }
  
});

const puerto = 2000;

servidor.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});


