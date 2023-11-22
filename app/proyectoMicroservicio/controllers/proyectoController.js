const mongoose = require("mongoose");
const Proyecto = require("../models/proyecto");
const Cliente = require("../models/cliente");
const TipoProyecto = require("../models/tipoProyecto");
const Universidad = require("../models/universidad");
const Etapa = require("../models/etapa");
const { request, response } = require("express");

const createProyecto = async (req = request, res = response) => {
  const {
    serial,
    cliente,
    tipoProyecto,
    universidad,
    etapa,
    ...data
  } = req.body;

  try {
    const proyectoBD = await Proyecto.findOne({ serial });
    const clienteBD = await Cliente.findById(cliente._id);
    const tipoProyectoBD = await TipoProyecto.findById(tipoProyecto._id);
    const universidadBD = await Universidad.findById(universidad._id);
    const etapaBD = await Etapa.findById(etapa._id);

    if (proyectoBD) {
      return res
        .status(400)
        .json({ message: `El proyecto con serial ${serial} ya existe` });
    }

    if (!clienteBD || !tipoProyectoBD || !universidadBD || !etapaBD) {
      return res
        .status(400)
        .json({ message: "Alguno de los datos relacionados no fue encontrado" });
    }

    const proyecto = new Proyecto(req.body);
    await proyecto.save();

    return res.status(201).json(proyecto);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getProyectos = async (req = request, res = response) => {
  try {
    const proyectos = await Proyecto.find()
      .populate("cliente", "nombre email")
      .populate("tipoProyecto", "nombre")
      .populate("universidad", "nombre")
      .populate("etapa", "nombre");

    return res.status(200).json(proyectos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getProyectoByID = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "ID no válido" });
    }

    const proyecto = await Proyecto.findById(id)
      .populate("cliente", "nombre email")
      .populate("tipoProyecto", "nombre")
      .populate("universidad", "nombre")
      .populate("etapa", "nombre");

    if (!proyecto) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    return res.status(200).json(proyecto);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const updateProyecto = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "ID no válido" });
    }

    const proyecto = await Proyecto.findById(id);

    if (!proyecto) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    if (
      req.body.cliente &&
      !(await Cliente.findById(req.body.cliente._id)) ||
      req.body.tipoProyecto &&
      !(await TipoProyecto.findById(req.body.tipoProyecto._id)) ||
      req.body.universidad &&
      !(await Universidad.findById(req.body.universidad._id)) ||
      req.body.etapa &&
      !(await Etapa.findById(req.body.etapa._id))
    ) {
      return res.status(400).json({ message: "Alguno de los datos relacionados no fue encontrado" });
    }

    proyecto.fechaModificacion = new Date();
    proyecto.serial = req.body.serial || proyecto.serial;
    // ... (actualización similar para otros campos)

    await proyecto.save();

    return res.status(200).json(proyecto);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const deleteProyecto = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "ID no válido" });
    }

    const proyecto = await Proyecto.findByIdAndDelete(id);

    if (!proyecto) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    return res.status(200).json({ message: "Proyecto eliminado con éxito" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProyecto,
  getProyectos,
  getProyectoByID,
  updateProyecto,
  deleteProyecto,
};
