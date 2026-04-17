import ora from 'ora';
import qrcode from 'qrcode-terminal';
import chalk from 'chalk'; // Reutilizamos chalk que ya lo tienes instalado

// 1. Iniciamos una animación épica
const spinner = ora({
    text: 'Hackeando la base de datos de la NASA...',
    color: 'red',
    spinner: 'material'
}).start();

// 2. Simulamos que toma tiempo con un "setTimeout" (3 segundos)
setTimeout(() => {
    // Detenemos la animación con un mensaje de éxito
    spinner.succeed(chalk.green.bold('¡Acceso concedido! Generando portal...'));
    console.log('\n'); // Un pequeño salto de línea

    // 3. El enlace que queremos convertir en QR (puedes poner lo que quieras)
    const enlaceSecreto = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; 

    // 4. Generamos el QR en la terminal
    qrcode.generate(enlaceSecreto, { small: true }, function (codigo) {
        console.log(codigo);
        console.log(chalk.cyan.bold('📱 ¡Apunta la cámara de tu celular a la pantalla y escanea el código!'));
    });

}, 3000); // 3000 milisegundos = 3 segundos