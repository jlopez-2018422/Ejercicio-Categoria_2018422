// Configuracion del proyecto 

const express = require('express')
const cors = require('cors');
const { dbConection } = require('../database/config');



class Server {
    constructor(){
        this.app = express();
        // variable que se llame puerto
        this.port = process.env.PORT;
        this.categoriasPath = '/api/categorias';


        this.conectarDB();

         // Middlewares
         this.middlewares();

          this.routes();
    }

    async conectarDB(){
        await dbConection();
    }

    middlewares(){
        this.app.use( cors() );

        this.app.use( express.json() );

        //Directorio publico
        this.app.use(  express.static('public') );

    }

    routes(){
    
        this.app.use( this.categoriasPath,require('../routes/categoria') );
     }

    listen(){
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port);
        } )
    }
}

// importar la clase server, al index tengo que declarar
module.exports = Server;