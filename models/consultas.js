const { Schema, model } = require('mongoose');

const SchemaConsulta = new Schema({
    nombre: {
        type: String,
        required: [true, 'El campo nombre es requerido']
    },

    apellidos: {
        type: String,
        required: [true, 'El campo apellidos es requerido']
    },

    cedula: {
        type: String,
        required: [true, 'El campo cedula es requerido']
    },

    edad: {
        type: String,
        required: [true, 'El campo edad es requerido']
    },

    detallesPaciente: [{
        presion: {
            type: String,
            required: true
        },
        peso: {
            type: String,
            required: true
        },
        altura: {
            type: String,
            required: true
        },
        sintomas: {
            type: String,
            required: true
        }
    }],

    diagnostico: [{
        diagnostico: {
            type: String,
            required: false,
            default: null
        },
        medicamentos: {
            type: String,
            required: false,
            default: null
        }
    }],

    examenes: [{
        tipo: {
            type: String,
            required: false,
            default: null
        },
        caracteristica: [{
            type: Object,
            required: false,
            default: null
        }]
    }]


});


module.exports = model('consultaMedica', SchemaConsulta);