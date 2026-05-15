import express from 'express';
//import path from 'path';
//import { fileURLToPath } from 'url';
import mysql from 'mysql2';

const app = express();


/*
const path = require('path');
const_filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(_filename);

app.use(express.static(path.join(__dirname, 'imagenes')));
app.use(express.json());
*/

const connection = mysql.createConnection({
   host: 'my-data-base-angelprojectstec.b.aivencloud.com',
   user:'avnadmin',
   password: 'AVNS_vxARRu_B83eAcRl5LOm',
   database: 'defaultdb',
   port: 21681
});

connection.connect(error => {
   if (error) throw error;
   console.log('Conexión exitosa a la base de datos');
}
);

const consultaSQL = 'SELECT * FROM ofertas_Kueski;';

/*
connection.query(consultaSQL, (error, resultados) => {
    if (error) throw error;
    //res.json(resultados);
    console.log(resultados);
   connection.end();
  });
/*



/* 
app.get('/bienvenida', (req, res) => {
   res.send('Esto no es una página html');
});
*/
/* 
app.get('/otraBienvenida', (req, res) => {
  //res.sendFile('bienvenida.html');
});
*/

// Endpoint para consultar ofertas.
app.get('/ofertas', (req, res) => {
   connection.query(consultaSQL, (error, resultados) =>{
      if (error){
         console.error('Error al ejecutar la consulta SQL:', error);
         res.status(500).json({ error: 'Error al obtener las ofertas' });
      }

      console.log('Ofertas consultadas correctamente');
      res.json(resultados);
   })
});

app.listen(1984, () => {
   console.log('Up and up');
});
