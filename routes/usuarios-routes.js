const { Router } = require("express");
const { check } = require("express-validator");

const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosPath,
  usuariosDelete,
} = require("../controllers/usuarios.controllers");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
} = require("../helpers/db-validators");

const router = Router();

router.get("/", usuariosGet);
router.put(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRoleValido),
  ],
  validarCampos,
  usuariosPut
);
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe ser de 6 caracteres").isLength({
      min: 6,
    }),
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom(emailExiste),
    // check("rol", "El rol no es valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPost
);
router.patch("/", usuariosPath);
router.delete(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
  ],
  validarCampos,
  usuariosDelete
);

module.exports = router;
