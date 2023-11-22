const express = require("express");
const dotenv = require("dotenv").config();
const { mongoConnection } = require("./database/configuration");
const cors = require('cors');

const proyectoRoute = require("./routes/proyectoRoute");

const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

mongoConnection();

app.use("/app/v1/proyectos", proyectoRoute);

module.exports = app;
