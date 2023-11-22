const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ProyectoSchema = new Schema({
  serial: {
    type: String,
    required: [true, "Serial  requerido"],
    unique: [true, "Serial repetido"],
  },
  titulo: {
    type: String,
    required: [true, "Título requerido"],
  },
  fechaInicio: {
    type: Date,
    required: [true, "Fecha de inicio requerida"]
  },
  valor: {
    type: Number,
    required: [true, "Valor  requerido"],
  },
  cliente: {
    type: Schema.Types.ObjectId,
    ref: "Cliente",
    required: [true, "Cliente requerido"],
  },
  tipoProyecto: {
    type: Schema.Types.ObjectId,
    ref: "TipoProyecto",
    required: [true, "Tipo de proyecto requerido"],
  },
  universidad: {
    type: Schema.Types.ObjectId,
    ref: "Universidad",
    required: [true, "Universidad requerida"],
  },
  etapa:{
    type: Schema.Types.ObjectId,
    ref: "Etapa",
    required: [true, "Etapa requerida"],
  },
  fechaEntrega:{
    type: Date,
    required: [true, "Fecha de entrega requerida"]
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

module.exports = model("Proyecto", ProyectoSchema);
