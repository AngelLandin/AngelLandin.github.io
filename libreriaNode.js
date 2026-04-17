import figlet from 'figlet';
import chalk from 'chalk';

// Generamos un texto gigante
figlet('G O O O O O L ! !', (err, textoGigante) => {
    if (err) {
        console.log('Algo salió mal con el dibujo...');
        return;
    }
    
    // Imprimimos el texto gigante pintado de verde brillante
    console.log(chalk.greenBright.bold(textoGigante));
    
    // Un mensaje extra con diferentes colores
    console.log(chalk.bgBlue.white(' Narrador: ') + chalk.yellow(' ¡Qué golazo al ángulo, papá! ff'));
});