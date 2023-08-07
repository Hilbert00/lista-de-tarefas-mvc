const express = require("express");
const expressEjsLayouts = require("express-ejs-layouts");

const PORT = 3000;
const app = express();

const tarefaController = require("./controllers/tarefaController");
const usuarioController = require("./controllers/usuarioController");

app.use(expressEjsLayouts);
app.set("view engine", "ejs");
app.set("layout", "./layouts/index");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Tela inicial
app.get("/", (_req, res) => res.render("startView"));

// Formulário de login
app.get("/login", (_req, res) => {
    app.set("layout", "./layouts/login");
    res.render("loginView");
});

// Formulário de cadastro
app.get("/cadastro", (_req, res) => {
    app.set("layout", "./layouts/login");
    res.render("cadastroView");
});

// Login do usuário
app.post("/login", usuarioController.autenticarUsuario);

// Cadastro do usuário
app.post("/cadastro", usuarioController.cadastrarUsuario);

// Visualizar tarefas
app.get("/tarefas", tarefaController.getTarefas);

// Visualizar tarefa
app.get("/tarefa", tarefaController.getTarefa);

// Publicar tarefa
app.post("/tarefa", tarefaController.addTarefa);

// Atualizar tarefa
app.post("/tarefa/update", tarefaController.updateTarefa);

// Excluir tarefa
app.post("/tarefa/delete", tarefaController.deleteTarefa);

app.listen(PORT, () => console.log("Rodando na porta: " + PORT));
