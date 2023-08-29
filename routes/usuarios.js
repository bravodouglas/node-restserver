const { Router } = require("express");
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosPath,
  usuariosDelete,
} = require("../controllers/usuarios.controllers");

const router = Router();

router.get("/", usuariosGet);
router.put("/:id", usuariosPut);
router.post("/", usuariosPost);
router.patch("/", usuariosPath);
router.delete("/", usuariosDelete);

module.exports = router;
