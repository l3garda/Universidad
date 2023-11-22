const mongoose = require("mongoose");
const Cliente = require("../models/cliente");
const { request, response } = require("express");

const createCliente = async (req = request, res = response) => {
  const { nombre, email } = req.body;

  try {
    const clienteExistente = await Cliente.findOne({ email });

    if (clienteExistente) {
      return res.status(400).json({ message: "El cliente con este email ya existe" });
    }

    const nuevoCliente = new Cliente({ nombre, email });
    await nuevoCliente.save(); 

    return res.status(201).json(nuevoCliente);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor al crear cliente" });
  }
};

const getClientes = async (req = request, res = response) => {
  try {
    const clientes = await Cliente.find();

    if (clientes.length === 0){
      return res.status(404).json({ message: "No hay clientes registrados" });
    }

    return res.status(200).json(clientes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor al obtener clientes" });
  }
};

const getClienteByID = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "ID de cliente no válido" });
    }

    const cliente = await Cliente.findById(id);

    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    return res.status(200).json(cliente);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor al obtener cliente por ID" });
  }
};

const updateCliente = async (req = request, res = response) => {
  const { id } = req.params;
  const { nombre, email } = req.body;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "ID de cliente no válido" });
    }

    const cliente = await Cliente.findById(id);

    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    cliente.fechaModificacion = new Date();
    cliente.nombre = nombre || cliente.nombre;
    cliente.email = email || cliente.email;

    await cliente.save();

    return res.status(200).json(cliente);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor al actualizar cliente" });
  }
};

const deleteCliente = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "ID de cliente no válido" });
    }

    const cliente = await Cliente.findByIdAndDelete(id);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    } 

    return res.status(200).json({ message: "Cliente eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor al eliminar cliente" });
  }
};

module.exports = {
  createCliente,
  getClientes,
  getClienteByID,
  updateCliente,
  deleteCliente,
};
