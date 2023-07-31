const router = require("./router/index.js");
const express = require("express");
const expressEjsLayouts = require("express-ejs-layouts");

const PORT = 3000;
const app = express();

app.use(expressEjsLayouts);
app.set("view engine", "ejs");
app.set("layout", "./layouts/index")
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"))

app.use("/", router)

app.listen(PORT, () => console.log("Rodando na porta: " + PORT));
