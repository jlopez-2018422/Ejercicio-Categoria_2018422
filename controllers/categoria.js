const { response, request } = require('express');

const Categoria = require('../models/categoria');

const getCategorias = async (req = request, res = response) => {

    //condiciones del get
    const query = { estado: true };

    const listaCategorias = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
    ]);

    res.json({
        msg: 'get Api - Controlador Categoria',
        listaCategorias
    });

}

const postCategoria = async (req = request, res = response) => {

    //Desestructuración
    const { nombre, descripcion} = req.body;
    const categoriaGuardadoDB = new Categoria({ nombre, descripcion });

    //Guardar en BD
    await categoriaGuardadoDB.save();

    res.json({
        msg: 'Post Api - Post Categoria',
        categoriaGuardadoDB
    });

}


const putCategoria = async (req = request, res = response) => {

    //Req.params sirve para traer parametros de las rutas
    const { id } = req.params;
    const { _id, img, estado, google, ...resto } = req.body;
    //Los parametros img, estado y google no se modifican, el resto de valores si (nombre, descripcion)

    //Editar al categoria por el id
    const CategoriaEditado = await Categoria.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT editar category',
        CategoriaEditado
    });

}

const deleteCategoria = async(req = request, res = response) => {
    //Req.params sirve para traer parametros de las rutas
    const { id } = req.params;

    //Eliminar fisicamente de la DB
    const categoriaEliminado = await Categoria.findByIdAndDelete( id);

    res.json({
        msg: 'DELETE eliminar category',
        categoriaEliminado
    });
}

module.exports = {
    getCategorias,
    postCategoria,
    putCategoria,
    deleteCategoria
}
