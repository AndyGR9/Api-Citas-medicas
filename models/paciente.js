const { Schema, model } = require('mongoose');

const SchemaPaciente = new Schema({
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

    peso_presion: [{
        peso: {
            type: String,
            required:true
        },
        presion: {
            type: String,
            required:true
        }
    }],
    

    edad: {
        type: String,
        required: [true, 'El campo edad es requerido']
    },

    altura: {
        type: String,
        required: [true, 'El campo altura es requerido']
    },

    enfermedades: [{
        tipo: {
            type: String,
            required: true
        }
    }],

    tipoSangre: {
        type: String,
        required: [true, 'El campo tipoSangre es requerido']
    },

    alergias: [{
        medicamento: {
            type: String, 
            required: true
        }
    }],


    contactoEmergencia: [{
        nombre: {
            type: String,
            required: true
        },
        apellidos: {
            type: String,
            required: true
        },
        relacionFamiliar: {
            type: String,
            required: true
        },
        telefono: {
            type: String,
            required: true
        },
        direccion: {
            type: String,
            required: true
        }
    }],

    estado: {
        type: Boolean,
        default: true
    },

});


module.exports = model('pacientes', SchemaPaciente);