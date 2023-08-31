const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
// const { generarJWT } = require("../helpers/generar-jwt");
const Usuario = require("../models/usuario-models");

const usuariosGet = async (req = request, res = response) => {
  // const { q, nombre = "NO NAME", apikey, page = 1, limit } = req.query;
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };
  // const usuarios = await Usuario.find(query)
  //   .limit(Number(limite))
  //   .skip(Number(desde));

  // const total = await Usuario.countDocuments(query);

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).limit(Number(limite)).skip(Number(desde)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

const usuariosPost = async (req, res) => {
  const { nombre, correo, password, rol } = req.body;

  const usuario = new Usuario({ nombre, correo, password, rol });

  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();

  usuario.password = bcryptjs.hashSync(password, salt);

  //Guardar en la base de datos
  await usuario.save();
  res.json({
    usuario,
  });
};

const usuariosPut = async (req, res) => {
  const { id } = req.params;

  const { _id, password, google, correo, ...resto } = req.body;
  //TODO validar contra base de datos

  if (password) {
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();

    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);
  res.json({
    usuario,
  });
};

const usuariosDelete = async (req, res) => {
  const { id } = req.params;

  //Fisicamente lo borramos
  // const usuario = await Usuario.findByIdAndDelete(id);

  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.json({
    usuario,
  });
};

const usuariosPath = (req, res) => {
  res.json({
    msg: "Path API - controlador",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPath,
  usuariosDelete,
};
