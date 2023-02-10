const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'Descripcion es obligatorio' ],
    },
    img: {
        type: String
    },
    
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});


module.exports = model('Categoria', CategoriaSchema);