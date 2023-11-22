const express = require("express");
const dotenv = require("dotenv").config();
const { mongoConnection } = require("./database/configuration");
const cors = require('cors');

const clienteRoute = require("./routes/clienteRoute");
const etapaRoute = require("./routes/etapaRoute");
const tipoProyectoRoute = require("./routes/tipoProyectoRoute");
const universidadRoute = require("./routes/universidadRoute");

const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors());

mongoConnection();

app.use("/app/v1/clientes", clienteRoute);
app.use("/app/v1/etapas", etapaRoute);
app.use("/app/v1/tipoproyectos", tipoProyectoRoute);
app.use("/app/v1/universidades", universidadRoute);

module.exports = app;
