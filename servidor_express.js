import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración para usar __dirname con ES Modules (import)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const puerto = 2500;

// =====================================================================
// OPINIÓN SOBRE EXPRESS (Requisito del Ejercicio 9):
// Express me parece una herramienta increíblemente eficiente. 
// Elimina todo el código repetitivo que requiere el módulo 'http' nativo.
// Por ejemplo, ya no tengo que configurar manualmente los encabezados 
// (res.writeHead) ni preocuparme por convertir objetos a texto con 
// JSON.stringify(); Express lo hace automáticamente con res.json().
// Además, su sistema de enrutamiento hace que el código sea muy fácil 
// de leer y mantener.
// Además simplifica el trabajo con los archivos estáticos.
// =====================================================================

// Middleware para servir archivos estáticos (imágenes, CSS)
// ¡Esto soluciona el problema de la imagen rota en tu equipo.html!
app.use(express.static(path.join(__dirname, 'public')));

// --- Rutas HTML ---
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'bienvenida.html'));
});

app.get('/movimientos', (req, res) => {
    res.sendFile(path.join(__dirname, 'movimientos.html'));
});

app.get('/perfil', (req, res) => {
    res.sendFile(path.join(__dirname, 'perfil.html'));
});

app.get('/equipo', (req, res) => {
    res.sendFile(path.join(__dirname, 'equipo.html'));
});

app.get('/opinion', (req, res) => {
    res.sendFile(path.join(__dirname, 'opinion.html'));
});

app.get('/arbol', (req, res) => {
    res.sendFile(path.join(__dirname, 'arbol.html'));
});

// --- Rutas de API (JSON) ---
app.get(['/api/usuarios', '/usuarios'], (req, res) => {
    const listaUsuarios = [
        { "nombre": "Punk", "saldo": "0" },
        { "nombre": "Anarky", "saldo": "1000" }
    ];
    // Express hace el JSON.stringify() y pone el Content-Type automáticamente
    res.json(listaUsuarios);
});

app.get('/api/movimientos', (req, res) => {
    const historial = [
        { "movimiento": "Deposito", "cantidad": 500 },
        { "movimiento": "Pago Kueski", "cantidad": -250 }
    ];
    res.json(historial);
});


// --- Rutas de la API de Kueski Pay (Simuladas) ---
app.get('/user/:id', (req, res) => {
    res.json({ mensaje: "Información del cliente obtenida" });
});

app.get('/user/profiles', (req, res) => {
    res.json({ saldo: 0, cashback: 0 });
});

app.post('/v1/orders', (req, res) => {
    const response = {
        "order_id": "ord_8984jd93kd",
        "status": "CREATED",
        "checkout_url": "https://pay.kueski.com/checkout/ord_8984jd93kd",
        "expires_at": "2026-04-23T18:00:00Z"
    };
    res.status(201).json(response);
});

app.get('/v1/orders/:order_id', (req, res) => {
    const response = {
        "order_id": req.params.order_id,
        "amount": 2500.00,
        "currency": "MXN",
        "status": "APPROVED",
        "customer_info": { "email": "cliente@email.com" },
        "created_at": "2026-04-23T17:30:00Z",
        "approved_at": "2026-04-23T17:35:12Z"
    };
    res.json(response);
});

app.post('/v1/orders/:order_id/cancel', (req, res) => {
    const response = {
        "order_id": req.params.order_id,
        "status": "CANCELED",
        "message": "La orden fue cancelada exitosamente."
    };
    res.json(response);
});

app.get('/v1/payment-terms', (req, res) => {
    const response = {
        "available_terms": [
            { "quinces": 4, "interest_rate": "0%" },
            { "quinces": 6, "interest_rate": "5.5%" }
        ]
    };
    res.json(response);
});


// --- Manejo del Error 404 ---
// app.use al final captura cualquier ruta que no haya hecho "match" arriba
app.use((req, res) => {
    res.status(404).send('Error 404: Página no encontrada. Es como la sexta Champions League del Barcelona, la buscan cada año pero nunca la encuentran.');
});

// --- Iniciar Servidor ---
app.listen(puerto, () => {
    console.log(`Servidor Express escuchando en http://localhost:${puerto}`);
});