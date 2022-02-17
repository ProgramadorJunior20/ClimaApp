require('dotenv').config()

const { leerInput, inquirerMenu, pausa } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");



const main = async() => {

    const busquedas = new Busquedas();
    let opt = '';
    
    do {
        // Imprimir el Menú
        opt = await inquirerMenu()
        
        switch( opt ) {
            case 1:
                // Mostrar mensaje
                const lugar = await leerInput('Ciudad: ');
                await busquedas.ciudad( lugar ); 

                // Buscar ciudades

                // Seleccionar el lugar

                // Tados clima

                // Mostrar Resultados
                console.log('\nInformacion  de la ciudad\n'.green); // salto de linea
                console.log('Ciudad:', ); 
                console.log('Lat:', ); // Latitud
                console.log('Lng:', ); // Longitud
                console.log('Temperatura:', )
                console.log('Minima:', ); // Temperatura Minima
                console.log('Máxima:', ); // Temperatura Máxima


                
            break;
        }

        // Hace la pausa si el numero es diferente de 0
        if ( opt !== 0 ) await pausa()

    } while (opt !== 0);

}
main();