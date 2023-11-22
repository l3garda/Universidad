const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const TipoProyectoSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "Nombre requerido"],
    minlength: 1,
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

module.exports = model("TipoProyecto", TipoProyectoSchema);
