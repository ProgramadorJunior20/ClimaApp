require('dotenv').config()

const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
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
                const termino = await leerInput('Ciudad: ');
                
                // Buscar ciudades
                const lugares = await busquedas.ciudad( termino ); 
                
                // Seleccionar el lugar
                const id = await listarLugares(lugares);
                if( id === 0) continue;

                const lugarSel = lugares.find( l => l.id === id );

                // Guardar en DB
                busquedas.agregarHistorial( lugarSel.nombre );

                // Tados clima
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng)

                // Mostrar Resultados
                console.clear()
                console.log('\nInformacion  de la ciudad\n'.green); // salto de linea
                console.log( 'Ciudad:', `${lugarSel.nombre}`.green ); 
                console.log( 'Lat:', lugarSel.lat ); // Latitud
                console.log( 'Lng:', lugarSel.lng ); // Longitud
                console.log( 'Temperatura:', clima.temp )
                console.log( 'Minima:', clima.min ); // Temperatura Minima
                console.log( 'Máxima:', clima.max ); // Temperatura Máxima
                console.log( 'Como está el clima:', `${clima.desc}`.green ); // Description
            break;

            case 2:
                
                busquedas.historialCapitalizado.forEach( (lugar, i) => {
                    const idx = `${ i + 1 }.`.green;
                    console.log( `${ idx } ${ lugar }` );
                })

            break;

        }

        // Hace la pausa si el numero es diferente de 0
        if ( opt !== 0 ) await pausa()

    } while (opt !== 0);

}
main();