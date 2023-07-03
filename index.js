const express = require("express");
const app = express();
const router = require("./router/index.js");

const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", router)

app.listen(PORT, () => console.log("Rodando na porta: " + PORT));
