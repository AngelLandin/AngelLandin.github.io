import express from 'express';
import mysql from 'mysql2';

/*
import path from 'path';
import {fileURLToPathj} from 'url';*/

const app = express();
/*
const path = require('path');
const _filname = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filname);*/

const connection = mysql.createConnection({
    host: "mysql-31efc894-tec-f26e.e.aivencloud.com",
    port: 20902,
    user: "avnadmin",
    password: "AVNS_GJwkU29Bq2KswwA_MOt",
    database: "defaultdb"
});

app.post('/api/otro',(req,res)=>{
    console.log("El cuerpo de la peticion:",req.body);
    res.sendStatus(200);
})

const crearTablaSQL = `
  CREATE TABLE IF NOT EXISTS donantes (
      id INT PRIMARY KEY AUTO_INCREMENT,
      nombre VARCHAR(255) NOT NULL
  );
`;

const insertarDonanteSQL = `
  INSERT INTO donantes (nombre) VALUES ('Donante Anónimo');
`;

const consultaSQL = `
  SELECT * FROM donantes;
`;

connection.query(consultaSQL, (error, resultados) => {
    if (error) throw error;
    //res.json(resultados);
    console.log(resultados);
   connection.end();
  });


app.get('/bienvenida', (req, res) => {
   res.send('Esto no es una página html');
});

app.get('/otraBienvenida', (req, res) => {
  res.sendFile('bienvenida.html');
});

app.listen(1984, () => {
   console.log('Up and up');
});