const mongoose = require("mongoose");
const Universidad = require("../models/universidad");
const { request, response } = require("express");

const createUniversidad = async (req = request, res = response) => {
  const { nombre, direccion, telefono } = req.body;

  try {
    const universidadExistente = await Universidad.findOne({ nombre });

    if (universidadExistente) {
      return res.status(400).json({ message: "Ya existe una universidad con este nombre" });
    }

    const datos = {
      nombre,
      direccion,
      telefono,
    };

    const universidad = new Universidad(datos);
    await universidad.save();

    return res.status(201).json(universidad);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor al crear universidad" });
  }
};

const getUniversidades = async (req = request, res = response) => {
  try {
    const universidades = await Universidad.find();

    if (universidades.length === 0) {
      return res.status(404).json({ message: "No hay universidades registradas" });
    }

    return res.status(200).json(universidades);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor al obtener universidades" });
  }
};

const getUniversidadByID = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "ID de universidad no válido" });
    }

    const universidad = await Universidad.findById(id);

    if (!universidad) {
      return res.status(404).json({ message: "Universidad no encontrada" });
    }

    return res.status(200).json(universidad);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor al obtener universidad por ID" });
  }
};

const updateUniversidad = async (req = request, res = response) => {
  const { id } = req.params;
  const { nombre, direccion, telefono } = req.body;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "ID de universidad no válido" });
    }

    const universidad = await Universidad.findById(id);

    if (!universidad) {
      return res.status(404).json({ message: "Universidad no encontrada" });
    }

    universidad.fechaModificacion = new Date();
    universidad.nombre = nombre || universidad.nombre;
    universidad.direccion = direccion || universidad.direccion;
    universidad.telefono = telefono || universidad.telefono;

    await universidad.save();

    return res.status(200).json(universidad);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor al actualizar universidad" });
  }
};

const deleteUniversidad = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "ID de universidad no válido" });
    }

    const universidad = await Universidad.findByIdAndDelete(id);
    if (!universidad) {
      return res.status(404).json({ message: "Universidad no encontrada" });
    }

    return res.status(200).json({ message: "Universidad eliminada exitosamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor al eliminar universidad" });
  }
};

module.exports = {
  createUniversidad,
  getUniversidades,
  getUniversidadByID,
  updateUniversidad,
  deleteUniversidad,
};
