const express = require("express");
const cors = require("cors");
const { dbConecction } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.usuariosPath = "/api/usuarios";

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
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/usuarios-routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server is running on port ", this.port);
    });
  }
}

module.exports = Server;
