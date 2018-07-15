const argv = require('./config/yargs').argv;
const porHacer = require('./por-hacer/por-hacer')

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion)
        console.log(tarea);
        break;

    case 'listar':

        if (!argv.completado && !argv.nocompletado) {
            let listado = porHacer.getListado();
            porHacer.imprimirFormato(listado);
        } else if (argv.completado) {
            let listado = porHacer.getListadoCompleto();
            porHacer.imprimirFormato(listado);
        } else if (argv.nocompletado) {
            let listado = porHacer.getListadoIncompleto();
            porHacer.imprimirFormato(listado);
        } else {
            console.log('Valor no reconocido, debe ser (false/true)');
        }

        break;

    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;

    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);
        console.log(borrado);
        break;

    default:
        console.log('Comando no reconocido');
        break;
}