const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT, esAdminRole } = require("../middlewares");
const {
  crearProducto,
  obtenerProducto,
  obtenerProductos,
  actualizarProducto,
  borrarProducto,
} = require("../controllers/productos.controllers");
const {
  existeCategoriaPorId,
  existeProductoPorId,
} = require("../helpers/db-validators");

const router = Router();

//Obtener todas las categorias-publico
router.get("/", obtenerProductos);

// //Obtener una categoria por id-publico
router.get(
  "/:id",
  [
    check("id", "No es un id de Mongo valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  obtenerProducto
);

//Crear categoria - privado - cualquier persona con un token valido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es un id de Mongo valido").isMongoId(),
    check("categoria").custom(existeCategoriaPorId),
    validarCampos,
  ],
  crearProducto
);

//Actualizar -privado - cualquier con token valido
router.put(
  "/:id",
  [validarJWT, check("id").custom(existeProductoPorId), validarCampos],
  actualizarProducto
);

//Borrar una categoria - Admin
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un id de Mongo valido").isMongoId(),
    validarCampos,
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  borrarProducto
);

module.exports = router;
