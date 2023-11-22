const mongoose = require("mongoose");
const Etapa = require("../models/etapa");
const { request, response } = require("express");

const createEtapa = async (req = request, res = response) => {
  const { nombre } = req.body;

  try {
    const etapaExistente = await Etapa.findOne({ nombre });

    if (etapaExistente) {
      return res.status(400).json({ message: "Ya existe una etapa con este nombre" });
    }

    const nuevaEtapa = new Etapa({ nombre });
    await nuevaEtapa.save();

    return res.status(201).json(nuevaEtapa);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor al crear etapa" });
  }
};

const getEtapas = async (req = request, res = response) => {
  try {
    const etapas = await Etapa.find();
    
    if (etapas.length === 0){
      return res.status(404).json({ message: "No hay etapas registradas" });
    }

    return res.status(200).json(etapas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor al obtener etapas" });
  }
};

const getEtapaByID = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "ID de etapa no válido" });
    }

    const etapa = await Etapa.findById(id);

    if (!etapa) {
      return res.status(404).json({ message: "Etapa no encontrada" });
    }

    return res.status(200).json(etapa);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor al obtener etapa por ID" });
  }
};

const updateEtapa = async (req = request, res = response) => {
  const { id } = req.params;
  const { nombre } = req.body;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "ID de etapa no válido" });
    }

    const etapa = await Etapa.findById(id);

    if (!etapa) {
      return res.status(404).json({ message: "Etapa no encontrada" });
    }

    etapa.fechaModificacion = new Date();
    etapa.nombre = nombre || etapa.nombre;

    await etapa.save();

    return res.status(200).json(etapa);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor al actualizar etapa" });
  }
};

const deleteEtapa = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "ID de etapa no válido" });
    }

    const etapa = await Etapa.findByIdAndDelete(id);
    if (!etapa) {
      return res.status(404).json({ message: "Etapa no encontrada" });
    }

    return res.status(200).json({ message: "Etapa eliminada exitosamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor al eliminar etapa" });
  }
};

module.exports = {
  createEtapa,
  getEtapas,
  getEtapaByID,
  updateEtapa,
  deleteEtapa,
};
