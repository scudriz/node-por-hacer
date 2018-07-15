const fs = require('fs');
const colors = require('colors');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile(`db/data.json`, data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);

    });

}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }


}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    // filter devuelve un listado con los elementos que cumplen con la condición colocada
    // en este caso se coloca que se devuelvan los que son diferentes a la descripción
    // de esta forma se elimina el que compla con la condición
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (nuevoListado.length === listadoPorHacer.length) {
        return true;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

const getListadoCompleto = () => {
    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.completado === true);
    return nuevoListado;
}


const getListadoIncompleto = () => {
    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.completado === false);
    return nuevoListado;
}

const imprimirFormato = (listado) => {
    for (let tarea of listado) {
        console.log('======== Por Hacer ======='.green);
        console.log(`Descripcion: ${ tarea.descripcion }`);
        console.log(`Completado: ${ tarea.completado }`);
        console.log('==========================\n'.green);
    }
}

module.exports = {
    crear,
    getListado,
    getListadoCompleto,
    getListadoIncompleto,
    actualizar,
    borrar,
    imprimirFormato
}