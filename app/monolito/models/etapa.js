const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const EtapaSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "Nombre requerido"],
    unique: true,
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

module.exports = model("Etapa", EtapaSchema);
