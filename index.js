require("dotenv").config();

const path = require("path");
const express = require("express");
const expressEjsLayouts = require("express-ejs-layouts");
const session = require("express-session");

const PORT = 3000;
const app = express();

const tarefaController = require("./controllers/tarefaController");
const usuarioController = require("./controllers/usuarioController");

function verificarUsuario(req, res, next) {
    if (req.originalUrl === "/login" || req.originalUrl === "/cadastro") {
        app.set("layout", "./layouts/login");

        res.locals.layoutVariables = {
            url: process.env.URL,
            img: "/img/",
            style: "/stylesheets/",
            title: "Autenticação",
        };

        next();
    } else if (req?.session?.user) {
        app.set("layout", "./layouts/index");

        res.locals.layoutVariables = {
            url: process.env.URL,
            img: "/img/",
            style: "/stylesheets/",
            title: "Lista de Tarefas",
            user: req.session.user,
        };

        next();
    } else res.redirect("/login");
}

app.use(session({ secret: process.env.SECRET }));
app.use(expressEjsLayouts);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(verificarUsuario);

// Tela inicial
app.get("/", (_req, res) => res.render("startView"));

// Formulário de login
app.get("/login", (_req, res) => res.render("loginView"));

// Formulário de cadastro
app.get("/cadastro", (_req, res) => res.render("cadastroView"));

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
