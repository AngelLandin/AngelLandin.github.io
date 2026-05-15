import mysql from 'mysql2';

const connection = mysql.createConnection({
   host: 'my-data-base-angelprojectstec.b.aivencloud.com',
   user: 'avnadmin',
   password: 'AVNS_vxARRu_B83eAcRl5LOm',
   database: 'defaultdb',
   port: 21681,
   multipleStatements: true // Esto permite ejecutar varios comandos SQL a la vez
});

connection.connect(error => {
   if (error) throw error;
   console.log('Conectado. Creando tabla...');

   const sql = `
       CREATE TABLE IF NOT EXISTS ofertas_Kueski (
           id INT AUTO_INCREMENT PRIMARY KEY,
           titulo VARCHAR(150) NOT NULL,
           descripcion TEXT,
           tasa_interes DECIMAL(5,2),
           monto_maximo DECIMAL(10,2),
           plazos_meses INT
       );

       INSERT INTO ofertas_Kueski (titulo, descripcion, tasa_interes, monto_maximo, plazos_meses) VALUES
       ('Kueski Pay Básico', 'Compra ahora y paga en quincenas sin intereses.', 0.00, 5000.00, 2),
       ('Préstamo Personal Express', 'Crédito rápido con aprobación en minutos y tasa fija.', 15.50, 10000.00, 6);
   `;

   connection.query(sql, (error, resultados) => {
       if (error) throw error;
       console.log('¡Tabla creada y ofertas insertadas con éxito!');
       connection.end();
   });
});