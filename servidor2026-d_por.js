import express from 'express';
import mysql from 'mysql2';
//Pendiente nombre de la librería
import NodeCache from 'node-cache';

import path from 'path';
import { fileURLToPath } from 'url';


//stdTTL
const myCache = new NodeCache({ stdTTL: 2026 });

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 

const app = express();


//Completa los datos correctos
const connection = mysql.createConnection({
  host:  "mysql-31efc894-tec-f26e.e.aivencloud.com",
  port: 20902,
  user: "avnadmin",
  password: "AVNS_GJwkU29Bq2KswwA_MOt",
  database: "defaultdb"
});


let datosDB;

function getDonantes() {

  //Pon un nombre a la llave
  const cacheKey = "misDonantes";

  //Si es necesario cambia la consulta
  const consultaSQL = `SELECT * FROM donantes;`;

  //Completa el dato faltante
  const cachedDonantes = myCache.get(cacheKey);

  if (cachedDonantes) {
    console.log("Servido desde el caché");

    //falta el dato a regresar
    return cachedDonantes;
  }

  console.log("Consultando base de datos");


  //Esto lo vimos ayer
  connection.connect(error => {
    if (error) throw error;
    console.log("Conectada");
  });


  connection.query(consultaSQL, (error, resultados) => {
    if (error) throw error;

    console.log(resultados);
    //Faltan datos
    myCache.set(cacheKey, resultados);
    datosDB = resultados;
    //connection.end();

  });

  console.log(datosDB);
  return datosDB;
}

app.get('/storage', (req, res) => {

  //Falta un dato
  res.sendFile(path.join(__dirname, 'localStorage_por.html'));
});

app.get('/obtenerDatos', (req, res) => {

  //Falta llamar una función
  const datos = getDonantes();

  res.json(datos);
});

app.listen(1984, () => {
  console.log('Up and up');
});