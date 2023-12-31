const express = require("express");
const cors = require("cors");
const { dbConecction } = require("../database/config");
const fileUpload = require('express-fileupload');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.paths={
        auth: '/api/auth',
        buscar:'/api/buscar',
        usuarios: '/api/usuarios',
        categorias: '/api/categorias',
        productos: '/api/productos',
        uploads: '/api/uploads'
    }
  
    //Conectar a la base de datos
    this.conectarDB();

    //Middlewares es una funcion que se ejecuta antes de llamar al controlador
    this.middlewares();

    //Rutas de mi aplicación
    this.routes();
  }

  async conectarDB() {
    await dbConecction();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Lectura y parseo del body
    this.app.use(express.json());

    //Directorio publico para servir contenido estático como imagenes, css, js, etc.blico
    this.app.use(express.static("public"));

    //FileUpload - Carga de archivos
    this.app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      createParentPath: true
  }));
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth-routes"));
    this.app.use(this.paths.buscar, require("../routes/buscar-routes"));
    this.app.use(this.paths.usuarios, require("../routes/usuarios-routes"));
    this.app.use(this.paths.categorias, require("../routes/categorias-routes"));
    this.app.use(this.paths.productos, require("../routes/productos-routes"));
    this.app.use(this.paths.uploads, require("../routes/upload-routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server is running on port ", this.port);
    });
  }
}

module.exports = Server;
