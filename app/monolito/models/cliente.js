const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ClienteSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "Nombre de requerido"],
    minlength: 1,
  },
  email: {
    type: String,
    required: [true, "Email requerido"],
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

module.exports = model("Cliente", ClienteSchema);
