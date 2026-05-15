import express from 'express';
import mysql from 'mysql2';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración para usar __dirname con ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware fundamental para que req.body funcione en tus POST
app.use(express.json());

// Conexión a la base de datos
// (Recuerda cambiar/rotar esta contraseña en Aiven cuando termines tu reto por seguridad)
const connection = mysql.createConnection({
    host: "my-data-base-angelprojectstec.b.aivencloud.com",
    port: 21681,
    user: "avnadmin",
    password: "AVNS_vxARRu_B83eAcRl5LOm", 
    database: "defaultdb"
});

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

// Ejecutamos las consultas SQL de forma anidada (una después de otra)
connection.query(crearTablaSQL, (errorCrear) => {
    if (errorCrear) throw errorCrear;
    console.log("1. Tabla 'donantes' verificada o creada con éxito.");

    connection.query(insertarDonanteSQL, (errorInsertar) => {
        if (errorInsertar) throw errorInsertar;
        console.log("2. Donante insertado correctamente.");

        connection.query(consultaSQL, (errorConsulta, resultados) => {
            if (errorConsulta) throw errorConsulta;
            console.log("3. Resultados actuales en la base de datos:", resultados);
            
          
        });
    });
});

// --- Rutas de Express ---

app.post('/api/otro', (req, res) => {
    console.log("El cuerpo de la peticion:", req.body);
    res.sendStatus(200);
});

app.get('/bienvenida', (req, res) => {
    res.send('Esto no es una página html');
});

app.get('/api/donantes', (req, res) => {
    const consultaSQL = `SELECT * FROM donantes;`;
    
    connection.query(consultaSQL, (error, resultados) => {
        if (error) {
            res.status(500).json({ error: 'Hubo un error al consultar la base de datos' });
            return;
        }
        
        res.json(resultados);
    });
});

app.get('/otraBienvenida', (req, res) => {
    // Usamos la ruta absoluta para evitar el error de "path must be absolute"
    res.sendFile(path.join(__dirname, 'bienvenida.html'));
});

// --- Iniciar Servidor ---
app.listen(1984, () => {
    console.log('Up and up en el puerto 1984');
});