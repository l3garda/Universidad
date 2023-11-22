const mongoose = require("mongoose");
const TipoProyecto = require("../models/tipoProyecto");
const { request, response } = require("express");

const createTipoProyecto = async (req = request, res = response) => {
  const { nombre } = req.body;

  try {
    const tipoProyectoExistente = await TipoProyecto.findOne({ nombre });

    if (tipoProyectoExistente) {
      return res.status(400).json({ message: "Ya existe un tipo de proyecto con este nombre" });
    }

    const nuevoTipoProyecto = new TipoProyecto({ nombre });
    await nuevoTipoProyecto.save();

    return res.status(201).json(nuevoTipoProyecto);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor al crear tipo de proyecto" });
  }
};

const getTipoProyectos = async (req = request, res = response) => {
  try {
    const tipoProyectos = await TipoProyecto.find();
    
    if (tipoProyectos.length === 0){
      return res.status(404).json({ message: "No hay tipos de proyecto registrados" });
    }

    return res.status(200).json(tipoProyectos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor al obtener tipos de proyecto" });
  }
};

const getTipoProyectoByID = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "ID de tipo de proyecto no válido" });
    }

    const tipoProyecto = await TipoProyecto.findById(id);

    if (!tipoProyecto) {
      return res.status(404).json({ message: "Tipo de proyecto no encontrado" });
    }

    return res.status(200).json(tipoProyecto);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor al obtener tipo de proyecto por ID" });
  }
};

const updateTipoProyecto = async (req = request, res = response) => {
  const { id } = req.params;
  const { nombre } = req.body;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "ID de tipo de proyecto no válido" });
    }

    const tipoProyecto = await TipoProyecto.findById(id);

    if (!tipoProyecto) {
      return res.status(404).json({ message: "Tipo de proyecto no encontrado" });
    }

    tipoProyecto.fechaModificacion = new Date();
    tipoProyecto.nombre = nombre || tipoProyecto.nombre;

    await tipoProyecto.save();

    return res.status(200).json(tipoProyecto);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor al actualizar tipo de proyecto" });
  }
};

const deleteTipoProyecto  = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "ID de tipo de proyecto no válido" });
    }

    const tipoProyecto = await TipoProyecto.findByIdAndDelete(id);
    if (!tipoProyecto) {
      return res.status(404).json({ message: "Tipo de proyecto no encontrado" });
    } 

    return res.status(200).json({ message: "Tipo de proyecto eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor al eliminar tipo de proyecto" });
  }
};

module.exports = {
  createTipoProyecto,
  getTipoProyectos,
  getTipoProyectoByID,
  updateTipoProyecto,
  deleteTipoProyecto,
};
