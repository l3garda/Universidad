const mongoose = require("mongoose");

const mongoConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("Conexión exitosa a la base de datos MongoDB");
  } catch (error) {
    console.error("Error al conectar a la base de datos MongoDB:", error);
    throw new Error("Error al conectar a la base de datos MongoDB");
  }
};

module.exports = { mongoConnection };
