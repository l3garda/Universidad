const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UniversidadSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "Nombre requerido"],
    minlength: 1,
  },
  direccion: {
    type: String,
    required: [true, "Dirección requerida"]
  },
  telefono: {
    type: String,
    unique: true,
    required: [true, "Teléfono requerido"]
  },
  fechaCreacion: {
    type: Date,
    default: new Date(),
  },
  fechaModificacion: {
    type: Date,
    default: new Date(),
  },
});

module.exports = model("Universidad", UniversidadSchema);
